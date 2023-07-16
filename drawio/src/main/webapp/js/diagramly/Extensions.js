/**
 * Handles paste from Lucidchart
 * 
 * TODO: Move to dynamic loading minimized plugin.
 */
//This covers version 52 of Lucidchart ("BCUVersion": 52 or "BackwardsCompatibilityStateVersion": 52)
LucidImporter = {};
(function()
{
	// Global import transformation
	var defaultFontSize = '13';
	var defaultLucidFont = 'Liberation Sans';
	var scale = 0.75;
	var dx = 0;
	var dy = 0;
	
	var arcSize = 6;
	var edgeStyle = 'html=1;jettySize=18;';
	var vertexStyle = 'html=1;overflow=block;blockSpacing=1;whiteSpace=wrap;';
	var labelStyle = 'text;html=1;resizable=0;labelBackgroundColor=default;align=center;verticalAlign=middle;';
	var containerStyle = 'container=1;pointerEvents=0;collapsible=0;recursiveResize=0;';
	var groupStyle = 'group;dropTarget=0;pointerEvents=0;';
	
	var c = 'verticalLabelPosition=bottom;verticalAlign=top;fillColor=#036897;strokeColor=#ffffff';
	var s = 'shape=mxgraph.';
	var ss = 'strokeColor=none;shape=mxgraph.';
	var ssAzure = 'verticalLabelPosition=bottom;verticalAlign=top;' + ss;
	var cs = 'mxCompositeShape';
	var azur19 = 'image;aspect=fixed;html=1;points=[];align=center;verticalAlign=top;image=img/lib/mscae/';
	var gcpIcon = 'html=1;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none;shape=mxgraph.gcp2.';
	var kupIcon = 'html=1;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none;shape=mxgraph.kubernetes.icon;prIcon=';
	
	//Instead of doing a massive code refactoring, thees ugly global variables are used
	var isLastLblHTML = false;
	var gFontFamilyStyle = '';
	
	//stencils to rotate counter clockwise 90 degrees
	var rccw = [
		'AEUSBBlock', 
		'AGSCutandpasteBlock', 
		'iOSDeviceiPadLandscape', 
		'iOSDeviceiPadProLandscape'
	];
	
	//stencils to rotate clockwise 180 degrees
	var rcw2 = [
		'fpDoor'
	];
	
	var edgeStyleMap = {
			'None': 'none;',
			'Arrow': 'block;xyzFill=1;',
			'Hollow Arrow': 'block;xyzFill=0;',
			'Open Arrow': 'open;',
			'CFN ERD Zero Or More Arrow': 'ERzeroToMany;xyzSize=10;',
			'CFN ERD One Or More Arrow': 'ERoneToMany;xyzSize=10;',
			'CFN ERD Many Arrow': 'ERmany;xyzSize=10;',
			'CFN ERD Exactly One Arrow': 'ERmandOne;xyzSize=10;',
			'CFN ERD Zero Or One Arrow': 'ERzeroToOne;xyzSize=10;',
			'CFN ERD One Arrow': 'ERone;xyzSize=16;',
			'Generalization': 'block;xyzFill=0;xyzSize=12;',
			'Big Open Arrow': 'open;xyzSize=10;',
			'Asynch1': 'openAsync;flipV=1;xyzSize=10;',
			'Asynch2': 'openAsync;xyzSize=10;',
			'Aggregation': 'diamond;xyzFill=0;xyzSize=16;',
			'Composition': 'diamond;xyzFill=1;xyzSize=16;',
			'BlockEnd': 'box;xyzFill=0;xyzSize=16;',
			'Measure': 'ERone;xyzSize=10;',
			'CircleOpen': 'oval;xyzFill=0;xyzSize=16;',
			'CircleClosed': 'oval;xyzFill=1;xyzSize=16;',
			'BlockEndFill': 'box;xyzFill=1;xyzSize=16;',
			'Nesting': 'circlePlus;xyzSize=7;xyzFill=0;',
			'BPMN Conditional': 'diamond;xyzFill=0;',
			'BPMN Default': 'dash;'
	};

	var styleMap = {
//Standard
			'DefaultTextBlockNew': 'strokeColor=none;fillColor=none',
			'DefaultTextBlock': 'strokeColor=none;fillColor=none',
			'DefaultSquareBlock': '',
			'RectangleBlock': '',
			'DefaultNoteBlock': 'shape=note;size=15',
			'DefaultNoteBlockV2': 'shape=note;size=15',
			'HotspotBlock': 'strokeColor=none;fillColor=none',
			'ImageSearchBlock2': 'shape=image',
			'UserImage2Block': 'shape=image',
			'ExtShapeBoxBlock': '',
			'DefaultStickyNoteBlock': 'shadow=1',
//Flowchart
			'ProcessBlock': '',
			'DecisionBlock': 'rhombus',
			'TerminatorBlock': 'rounded=1;arcSize=50',
			'PredefinedProcessBlock': 'shape=process',
			'DocumentBlock': 'shape=document;boundedLbl=1',
			'MultiDocumentBlock': s + 'flowchart.multi-document',
			'ManualInputBlock': 'shape=manualInput;size=15',
			'PreparationBlock': 'shape=hexagon;perimeter=hexagonPerimeter2',
			'DataBlock': 'shape=parallelogram;perimeter=parallelogramPerimeter;anchorPointDirection=0',
			'DataBlockNew': 'shape=parallelogram;perimeter=parallelogramPerimeter;anchorPointDirection=0',
			'DatabaseBlock': 'shape=cylinder3;size=4;anchorPointDirection=0;boundedLbl=1;',
			'DirectAccessStorageBlock': 'shape=cylinder3;direction=south;size=10;anchorPointDirection=0;boundedLbl=1;',
			'InternalStorageBlock': cs,
			'PaperTapeBlock': 'shape=tape;size=0.2',
			'ManualOperationBlockNew': 'shape=trapezoid;perimeter=trapezoidPerimeter;anchorPointDirection=0;flipV=1',
			'DelayBlock': 'shape=delay',
			'StoredDataBlock': 'shape=cylinder3;boundedLbl=1;size=15;lid=0;direction=south;',
			'MergeBlock': 'triangle;direction=south;anchorPointDirection=0',
			'ConnectorBlock': 'ellipse',
			'OrBlock': s + 'flowchart.summing_function',
			'SummingJunctionBlock': s + 'flowchart.or',
			'DisplayBlock': 'shape=display',
			'OffPageLinkBlock': 'shape=offPageConnector',
			'BraceNoteBlock': cs,
			'NoteBlock': cs,
//Containers
			'AdvancedSwimLaneBlock': cs,
			'AdvancedSwimLaneBlockRotated': cs,
			'RectangleContainerBlock': containerStyle,
			'DiamondContainerBlock':  'shape=rhombus;' + containerStyle,
			'RoundedRectangleContainerBlock': 'rounded=1;absoluteArcSize=1;arcSize=24;' + containerStyle,
			'CircleContainerBlock': 'ellipse;' + containerStyle,
			'PillContainerBlock': 'shape=mxgraph.flowchart.terminator;' + containerStyle,
			'BraceBlock': cs,
			'BracketBlock': cs,
			'BraceBlockRotated': cs,
			'BracketBlockRotated': cs,
//Geometric shapes
			'IsoscelesTriangleBlock': 'shape=mxgraph.basic.acute_triangle;dx=0.5;anchorPointDirection=0',
			'RightTriangleBlock': s + 'basic.orthogonal_triangle',
			'PentagonBlock': s + 'basic.pentagon',
			'HexagonBlock': 'shape=hexagon;perimeter=hexagonPerimeter2',
			'OctagonBlock': s + 'basic.octagon2;dx=15;',
			'CrossBlock': 'shape=cross;size=0.6',
			'CloudBlock': 'ellipse;shape=cloud',
			'HeartBlock': s + 'basic.heart',
			'RightArrowBlock': cs,
			'DoubleArrowBlock': cs,
			'CalloutBlock': s + 'basic.rectangular_callout',
			'CalloutSquareBlock': cs,
			'ShapeCircleBlock': 'ellipse',
			'ShapePolyStarBlock': s + 'basic.star',
			'ShapeDiamondBlock': 'rhombus',
//Misc
			'UI2HotspotBlock' : 'opacity=50;strokeColor=none',
//Android Devices
			'AndroidDevice' : cs,
//Android Dialogs
			'AndroidAlertDialog' : cs,
			'AndroidDateDialog' : cs,
			'AndroidTimeDialog' : cs,
//Android Blocks
			'AndroidListItems' : cs,
			'AndroidTabs' : cs,
			'AndroidProgressBar' : cs,
			'AndroidImageBlock' : cs,
			'AndroidTextBlock' : cs,
			'AndroidActionBar' : cs,
//			'AndroidBrowserBar' NA
//Android Inputs
			'AndroidButton' : cs,
			'AndroidTextBox' : cs,
			'AndroidRadioButton' : cs,
			'AndroidCheckBox' : cs,
			'AndroidToggle' : cs,
			'AndroidSlider' : cs,
//Android Icons (not working properly, needs specific code)
			'AndroidIconCheck': s + 'ios7.misc.check',
//			'AndroidIconBack' NA
			'AndroidIconCancel' : s + 'atlassian.x',
			'AndroidIconCollapse': s + 'ios7.misc.up',
			'AndroidIconExpand': s + 'ios7.misc.down',
//			'AndroidIconForward' NA
			'AndroidIconNext': s + 'ios7.misc.right',
			'AndroidIconPrevious': s + 'ios7.misc.left',
			'AndroidIconRefresh' : + 'ios7.icons.repeat',
			'AndroidIconInformation': s + 'ios7.icons.info',
//			'AndroidIconHelp' NA
			'AndroidIconSearch': s + 'ios7.icons.looking_glass',
			'AndroidIconSettings': s + 'ios7.icons.volume;direction=south',
//			'AndroidIconDislike' NA
//			'AndroidIconLike' NA
//			'AndroidIconDelete' NA
//			'AndroidIconCopy' NA
//			'AndroidIconCut' NA
//			'AndroidIconPaste' NA
			'AndroidIconTrash': s + 'ios7.icons.trashcan',
			'AndroidIconEmail': s + 'mockup.misc.mail2',
			'AndroidIconNew': s + 'ios7.misc.flagged', 
//			'AndroidIconImage' NA
//			'AndroidIconUndo' NA
//			'AndroidIconSharing' NA
//			'AndroidIconDownload' NA
//			'AndroidIconError' NA
//			'AndroidIconWarning' NA
//iOS mockups
			'iOSDeviceiPhoneSE': s + 'ios7.misc.iphone',
			'iOSDeviceiPhone6s': s + 'ios7.misc.iphone',
			'iOSDeviceiPhone6sPlus': s + 'ios7.misc.iphone',
			'iOSDeviceiPadPortrait': s + 'ios7.misc.ipad7inch',
			'iOSDeviceiPadLandscape': s + 'ios7.misc.ipad7inch',
			'iOSDeviceiPadProPortrait': s + 'ios7.misc.ipad7inch',
			'iOSDeviceiPadProLandscape': s + 'ios7.misc.ipad10inch',
//iOS UI components
			'iOSButton': 'fillColor=none;strokeColor=none;',
			'iOSSegmentedControl' : cs, //TODO
			'iOSStepper': s + 'ios7.misc.adjust',
			'iOSToggle': s + 'ios7ui.onOffButton;buttonState=on;strokeColor2=#aaaaaa;fillColor2=#ffffff',
			'iOSSlider': cs,
			'iOSProgressBar': cs,
			'iOSPageControls': cs,
			'iOSStatusBar' : cs, 
			'iOSSearchBar' : cs,
			'iOSNavBar' : cs,
			'iOSTabs' : cs,
			'iOSUniversalKeyboard': s + 'ios.iKeybLett',
			'iOSDatePicker' : cs,
			'iOSTimePicker' : cs,
			'iOSCountdownPicker' : cs,
			'iOSBasicCell' : cs,
			'iOSSubtitleCell' : cs,
			'iOSRightDetailCell' : cs,
			'iOSLeftDetailCell' : cs,
			'iOSTableGroupedSectionBreak' : cs,
			'iOSTablePlainHeaderFooter' : cs,
//Mind Map
			'MindMapBlock' : '',
			'MindMapStadiumBlock' : 'arcSize=50',
			'MindMapCloud' : 'shape=cloud',
			'MindMapCircle' : 'ellipse',
			'MindMapIsoscelesTriangleBlock' : 'shape=triangle;direction=north',
			'MindMapDiamondBlock' : 'shape=rhombus',
			'MindMapPentagonBlock' : s + 'basic.pentagon',
			'MindMapHexagonBlock' : 'shape=hexagon;perimeter=hexagonPerimeter2',
			'MindMapOctagonBlock' : s + 'basic.octagon2;dx=10;',
			'MindMapCrossBlock' : s + 'basic.cross2;dx=20',
//Entity Relationship
			'ERDEntityBlock' : cs,
			'ERDEntityBlock2' : cs,
			'ERDEntityBlock3' : cs,
			'ERDEntityBlock4' : cs,
//UML Class Diagram
			'UMLClassBlock': cs,
			'UMLActiveClassBlock': 'shape=process',
			'UMLMultiplicityBlock' : cs,
//			'UMLPackageBlock': 'shape=folder;tabPosition=left',
			'UMLPackageBlock': '',
			'UMLConstraintBlock' : cs,
			'UMLNoteBlock': 'shape=note;size=15',
			'UMLNoteBlockV2': 'shape=note;size=15',
			'UMLTextBlock': cs,
//UML Use Case
			'UMLActorBlock': 'shape=umlActor;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;whiteSpace=nowrap',
			'UMLUseCaseBlock': 'ellipse',
			'UMLCircleContainerBlock': 'ellipse;' + containerStyle,
			'UMLRectangleContainerBlock': containerStyle,
//UML State/Activity			
			'UMLOptionLoopBlock' : s + 'sysml.package2;xSize=90;overflow=fill',
			'UMLAlternativeBlock2' : s + 'sysml.package2;xSize=90;overflow=fill',
			'UMLStartBlock' : 'ellipse;fillColor=#000000',
			'UMLStateBlock' : cs,
			'UMLDecisionBlock' : 'shape=rhombus;',
			'UMLHForkJoinBlock' : 'fillColor=#000000',
			'UMLVForkJoinBlock' : 'fillColor=#000000',
			'UMLFlowFinalBlock' : s + 'flowchart.or',
			'UMLHistoryStateBlock' : 'ellipse',
			'UMLEndBlock' : s + 'bpmn.shape;outline=end;symbol=terminate;strokeColor=#000000;fillColor=#ffffff',
			'UMLObjectBlock' : '',
			'UMLSendSignalBlock' : s + 'sysml.sendSigAct',
			'UMLReceiveSignalBlock' : s + 'sysml.accEvent;flipH=1',
			'UMLAcceptTimeEventActionBlock' : s + 'sysml.timeEvent',
//			'UMLInterruptingEdgeBlock' NA
			'UMLOffPageLinkBlock' : s + 'sysml.sendSigAct;direction=south',
//			'UMLExpansionNodeBlock' NA
			'UMLMultiLanePoolBlock' : cs,
			'UMLMultiLanePoolRotatedBlock' : cs,
			'UMLMultidimensionalSwimlane' : cs,
//UML Sequence
			'UMLActivationBlock' : '',
			'UMLDeletionBlock' : s + 'sysml.x;strokeWidth=4',
//			'UMLAlternativeBlock' NA
			'UMLSeqEntityBlock' : s + 'electrical.radio.microphone_1;direction=north',
//			'UMLBoundaryBlock' NA
//			'UMLControlBlock'NA
//UML Component
			'UMLComponentBlock' : 'shape=component;align=left;spacingLeft=36',
			'UMLComponentBlockV2' : 'shape=component;align=left;spacingLeft=36',
			'UMLNodeBlock' : 'shape=cube;size=20;flipH=1;verticalAlign=top;spacingTop=22;spacingLeft=5',
			'UMLNodeBlockV2' : 'shape=cube;size=20;flipH=1;verticalAlign=top;spacingTop=22;spacingLeft=5',
			'UMLComponentInterfaceBlock' : 'ellipse',
			'UMLComponentInterfaceBlockV2' : 'ellipse',
			'UMLComponentBoxBlock' : cs,
			'UMLComponentBoxBlockV2' : cs,
			'UMLAssemblyConnectorBlock': cs,
			'UMLAssemblyConnectorBlockV2': cs,
			'UMLProvidedInterfaceBlock' : cs,
			'UMLProvidedInterfaceBlockV2' :cs,
			'UMLRequiredInterfaceBlock' : 'shape=requires;direction=north',
			'UMLRequiredInterfaceBlockV2' : 'shape=requires;direction=north',
			'UMLSwimLaneBlockV2': cs,
			'UMLSwimLaneBlock': 'swimlane;startSize=25;dropTarget=0;fontStyle=0' + containerStyle,
//UML Deployment
//UML Entity Relationship
			'UMLEntityBlock' : '',
			'UMLWeakEntityBlock' : 'shape=ext;double=1',
			'UMLAttributeBlock' : 'ellipse',
			'UMLMultivaluedAttributeBlock' : 'shape=doubleEllipse',
			'UMLRelationshipBlock' : 'shape=rhombus',
			'UMLWeakRelationshipBlock' : 'shape=rhombus;double=1',
//BPMN 2.0
			'BPMNActivity' : cs,
			'BPMNEvent' : cs,
			'BPMNChoreography' : cs,
			'BPMNConversation' : cs,
			'BPMNGateway' : cs,
			'BPMNData' : cs,
			'BPMNDataStore' : 'shape=datastore', 
			'BPMNAdvancedPoolBlock' : cs,
			'BPMNAdvancedPoolBlockRotated' : cs,
			'BPMNBlackPool' : cs,
			'BPMNTextAnnotation' : cs,
//Data Flow
			'DFDExternalEntityBlock' : cs,
			'DFDExternalEntityBlock2' : '',
			'YDMDFDProcessBlock' : 'ellipse',
			'YDMDFDDataStoreBlock' : 'shape=partialRectangle;right=0;left=0',
			'GSDFDProcessBlock' : cs,
			'GSDFDProcessBlock2' : 'rounded=1;arcSize=10;',
			'GSDFDDataStoreBlock' : cs,
			'GSDFDDataStoreBlock2' : 'shape=partialRectangle;right=0',
//Org Chart
			'OrgBlock' : cs,
//Tables
			'DefaultTableBlock' : cs,
//Value Stream Mapping			
//Processes
			'VSMCustomerSupplierBlock' : s + 'lean_mapping.outside_sources',
			'VSMDedicatedProcessBlock' : cs,
			'VSMSharedProcessBlock' : cs,
			'VSMWorkcellBlock' : cs,
			'VSMDatacellBlock' : cs,
//Materials
			'VSMInventoryBlock' : cs,
			'VSMSupermarketBlock' : cs,
			'VSMPhysicalPullBlock' : s + 'lean_mapping.physical_pull;direction=south',
			'VSMFIFOLaneBlock' : cs,
			'VSMSafetyBufferStockBlock' : cs,
//Shipments
			'VSMExternalShipmentAirplaneBlock' : s + 'lean_mapping.airplane_7',
			'VSMExternalShipmentForkliftBlock' : s + 'lean_mapping.move_by_forklift',
			'VSMExternalShipmentTruckBlock' : s + 'lean_mapping.truck_shipment;align=left;',
			'VSMExternalShipmentBoatBlock' : s + 'lean_mapping.boat_shipment;verticalAlign=bottom;',
//Information
			'VSMProductionControlBlock' : cs,
			'VSMOtherInformationBlock' : '',
//			'VSMHeijyunkaBoxBlock' NA
			'VSMSequencedPullBallBlock' : s + 'lean_mapping.sequenced_pull_ball',
			'VSMMRPERPBlock' : s + 'lean_mapping.mrp_erp;whiteSpace=wrap',
			'VSMLoadLevelingBlock' : s + 'lean_mapping.load_leveling',
			'VSMGoSeeBlock' : s + 'lean_mapping.go_see_production_scheduling;flipH=1',
			'VSMGoSeeProductionBlock' : cs,
			'VSMVerbalInfoBlock' : s + 'lean_mapping.verbal',
//Value Stream Mapping
			'VSMKaizenBurstBlock' : s + 'lean_mapping.kaizen_lightening_burst',
			'VSMOperatorBlock' : s + 'lean_mapping.operator;flipV=1',
			'VSMTimelineBlock' : cs, //TODO Timeline shape
			'VSMQualityProblemBlock' : s + 'lean_mapping.quality_problem',
//Kanban
			'VSMProductionKanbanSingleBlock' : 'shape=card;size=18;flipH=1;',
			'VSMProductionKanbanBatchBlock' : cs,
			'VSMWithdrawalKanbanBlock' : s + 'lean_mapping.withdrawal_kanban',
//			'VSMWithdrawalKanbanBatchBlock' NA
			'VSMSignalKanbanBlock' : 'shape=triangle;direction=south;anchorPointDirection=0',
			'VSMKanbanPostBlock' : s + 'lean_mapping.kanban_post',
//Arrows
			'VSMShipmentArrow': 'shape=singleArrow;arrowWidth=0.5;arrowSize=0.13',
			'VSMPushArrow' : s + 'lean_mapping.push_arrow',
			'VSMElectronicInformationArrow' : cs,
//EC2
			'AWSElasticComputeCloudBlock2' : cs,
//			'AWSElasticComputeCloudBlock2' : ss + 'aws3.ec2;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSInstanceBlock2' : ss + 'aws3.instance',
			'AWSInstancesBlock2' : ss + 'aws3.instances;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAMIBlock2' : ss + 'aws3.ami;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDBonInstanceBlock2' : ss + 'aws3.db_on_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSInstanceCloudWatchBlock2' : ss + 'aws3.instance_with_cloudwatch;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			//'AmazonCloudWatch2017' : ss + 'aws3.instance_with_cloudwatch;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSElasticIPBlock2' : ss + 'aws3.elastic_ip;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSHDFSClusterBlock2' : ss + 'aws3.hdfs_cluster;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAutoScalingBlock2' : ss + 'aws3.auto_scaling;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSEC2OptimizedInstance2' : ss + 'aws3.optimized_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonEC2(Spotinstance)' : ss + 'aws3.spot_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonECR' : ss + 'aws3.ecr;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonECS' : ss + 'aws3.ecs;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSLambda2' : ss + 'aws3.lambda;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSElasticLoadBalancing' : ss + 'aws3.elastic_load_balancing;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//Networking
			'AWSElasticLoadBlock2' : ss + 'aws3.classic_load_balancer;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDirectConnectBlock3' : ss + 'aws3.direct_connect;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSElasticNetworkBlock2' : ss + 'aws3.elastic_network_interface;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRoute53Block2' : cs,
			'AWSHostedZoneBlock2' : ss + 'aws3.hosted_zone;fontColor=#ffffff;fontStyle=1',
			'AWSRouteTableBlock2' : ss + 'aws3.route_table;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSVPCBlock2' : ss + 'aws3.vpc;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSVPNConnectionBlock2' : ss + 'aws3.vpn_connection;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSVPNGatewayBlock2' : ss + 'aws3.vpn_gateway;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSCustomerGatewayBlock2' : ss + 'aws3.customer_gateway;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSCustomerGatewayBlock3' : ss + 'aws3.customer_gateway;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSInternetGatewayBlock2' : ss + 'aws3.internet_gateway;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRouterBlock2' : ss + 'aws3.router;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRouterBlock3' : ss + 'aws3.router;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonVPC(endpoints)' : ss + 'aws3.endpoints;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonVPC(flowlogs)' : ss + 'aws3.flow_logs;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonVPC(VPCNATgateway)' : ss + 'aws3.vpc_nat_gateway;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSVPCPeering3' : ss + 'aws3.vpc_peering;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			
//S3
			'AWSSimpleStorageBlock2' : ss + 'aws3.s3;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSBucketBlock2' : ss + 'aws3.bucket;fontStyle=1;fontColor=#ffffff',
			'AWSBuckethWithObjectsBlock2' : ss + 'aws3.bucket_with_objects;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSObjectBlock2' : ss + 'aws3.object;fontStyle=1;fontColor=#ffffff',
			'AWSImportExportBlock2' : ss + 'aws3.import_export;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSStorageGatewayBlock2' : ss + 'aws3.storage_gateway;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSElasticBlockStorageBlock2' : ss + 'aws3.volume;fontStyle=1;fontColor=#ffffff',
			'AWSVolumeBlock3' : ss + 'aws3.volume;fontStyle=1;fontColor=#ffffff',
			'AWSSnapshotBlock2' : ss + 'aws3.snapshot;fontStyle=1;fontColor=#ffffff',
			'AWSGlacierArchiveBlock3' : ss + 'aws3.archive;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSGlacierVaultBlock3' : ss + 'aws3.vault;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonEFS' : ss + 'aws3.efs;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSGlacierBlock2' : ss + 'aws3.glacier;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSImportExportSnowball' : ss + 'aws3.snowball;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSStorageGatewayCachedVolumn2' : ss + 'aws3.cached_volume;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSStorageGatewayNon-CachedVolumn2' : ss + 'aws3.non_cached_volume;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSStorageGatewayVirtualTapeLibrary2' : ss + 'aws3.virtual_tape_library;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//Content Delivery
			'AWSCloudFrontBlock2' : ss + 'aws3.cloudfront;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDownloadDistBlock2' : ss + 'aws3.download_distribution;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSStreamingBlock2' : ss + 'aws3.streaming_distribution;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSEdgeLocationBlock2' : ss + 'aws3.edge_location;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//Database
			'AWSItemBlock2' : ss + 'aws3.item;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSItemsBlock2' : ss + 'aws3.items;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAttributeBlock2' : ss + 'aws3.attribute;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAttributesBlock2' : ss + 'aws3.attributes;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRDBSBlock2' : cs,
			'AWSRDSInstanceBlock2' : ss + 'aws3.rds_db_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRDSStandbyBlock2' : ss + 'aws3.rds_db_instance_standby_multi_az;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRDSInstanceReadBlock2' : ss + 'aws3.rds_db_instance_read_replica;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSOracleDBBlock2' : ss + 'aws3.oracle_db_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSMySQLDBBlock2' : ss + 'aws3.mysql_db_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDynamoDBBlock2' : ss + 'aws3.dynamo_db;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSSimpleDatabaseBlock3' : ss + 'aws2.database.simpledb;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSSimpleDatabaseDomainBlock3' : ss + 'aws2.database.simpledb_domain;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSTableBlock2' : ss + 'aws3.table;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRedShiftBlock3' : ss + 'aws3.redshift;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSElastiCacheNodeBlock2' : ss + 'aws3.cache_node;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSElastiCacheBlock2' : ss + 'aws3.elasticache;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDynamoDBGlobalSecondaryIndexes2' : ss + 'aws3.global_secondary_index;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonElastiCacheMemcache2' : ss + 'aws3.memcached;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonElastiCacheRedis2' : ss + 'aws3.redis;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRDSMSSQLInstance2' : ss + 'aws3.ms_sql_instance_2;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSMSSQLDBBlock3' : ss + 'aws3.ms_sql_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRDSMySQLDBInstance2' : ss + 'aws3.mysql_db_instance_2;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRDSOracleDBInstance2' : ss + 'aws3.oracle_db_instance_2;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRDSReplicasetswithPIOP2' : ss + 'aws3.piop;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRDSPostgreSQL2' : ss + 'aws3.postgre_sql_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRDSMasterSQL2' : ss + 'aws3.sql_master;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRDSSlaveSQL2' : ss + 'aws3.sql_slave;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRedshift(densecomputenode)' : ss + 'aws3.dense_compute_node;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRedshift(densestoragenode)' : ss + 'aws3.dense_storage_node;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSDatabaseMigrationService' : ss + 'aws3.database_migration_service;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//Security Identity
			'AWSACM' : ss + 'aws3.certificate_manager;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonInspector' : ss + 'aws3.inspector;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSCloudHSM' : ss + 'aws3.cloudhsm;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDirectoryService2' : ss + 'aws3.directory_service;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSKMS' : ss + 'aws3.kms;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSWAF' : ss + 'aws3.waf;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSACM(certificate-manager)' : ss + 'aws3.certificate_manager_2;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//App Services
			'AWSSESBlock2' : ss + 'aws3.ses;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSEmailBlock2' : ss + 'aws3.email;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSSNSBlock2' : ss + 'aws3.sns;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSSQSBlock3' : ss + 'aws3.sqs;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSQueueBlock2' : ss + 'aws3.queue;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSMessageBlock2' : ss + 'aws3.message;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDeciderBlock2' : ss + 'aws3.decider;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSSWFBlock2' : ss + 'aws3.swf;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSWorkerBlock2' : ss + 'aws3.worker;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSCloudSearchBlock2' : ss + 'aws3.cloudsearch;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSCloudSearchMetadataBlock3' : ss + 'aws3.search_documents;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSElasticTranscoder3' : ss + 'aws3.elastic_transcoder;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonAPIGateway' : ss + 'aws3.api_gateway;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAppStream2' : ss + 'aws3.appstream;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//Deployment
			'AWSCloudFormationBlock2' : ss + 'aws3.cloudformation;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDataPipelineBlock3' : ss + 'aws3.data_pipeline;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDataPipelineBlock2' : ss + 'aws3.data_pipeline;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSTemplageBlock2' : ss + 'aws3.template;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSStackBlock2' : ss + 'aws3.stack_aws_cloudformation;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSBeanStockBlock2' : ss + 'aws3.elastic_beanstalk;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSApplicationBlock2' : ss + 'aws3.application;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSBeanstalkDeploymentBlock3' : ss + 'aws3.deployment;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSIAMBlock3' : ss + 'aws3.iam;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSIAMSTSBlock3' : ss + 'aws3.sts;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSIAMAddonBlock2' : ss + 'aws3.add_on;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSCloudWatchBlock3' : ss + 'aws3.cloudwatch;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSCloudWatchAlarmBlock2' : ss + 'aws3.alarm;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSIAMSecurityTokenService2' : ss + 'aws3.sts_2;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSIAMDataEncryptionKey2' : ss + 'aws3.data_encryption_key;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSIAMEncryptedData2' : ss + 'aws3.encrypted_data;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIAM(long-termsecuritycredential)' : ss + 'aws3.long_term_security_credential;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSIAMMFAToken2' : ss + 'aws3.mfa_token;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSIAMPermissions2' : ss + 'aws3.permissions_2;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSIAMRoles2' : ss + 'aws3.role;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIAM(temporarysecuritycredential)' : ss + 'aws3.long_term_security_credential;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSCloudTrail2' : ss + 'aws3.cloudtrail;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSConfig2' : ss + 'aws3.config;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSOpsWorksBlock3' : ss + 'aws3.opsworks;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSServiceCatalog' : ss + 'aws3.service_catalog;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSTrustedAdvisor2' : ss + 'aws3.trusted_advisor;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSOpsWorksApps2' : ss + 'aws3.apps;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSOpsWorksDeployments2' : ss + 'aws3.deployments;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSOpsWorksInstances2' : ss + 'aws3.instances_2;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSOpsWorksLayers2' : ss + 'aws3.layers;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSOpsWorksMonitoring2' : ss + 'aws3.monitoring;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSOpsWorksPermissions2' : ss + 'aws3.permissions;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSOpsWorksResources2' : ss + 'aws3.resources;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSOpsWorksStack2' : ss + 'aws3.stack_aws_opsworks;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//On-Demand
			'AWSMechanicalTurkBlock3' : ss + 'aws3.mechanical_turk;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSHumanITBlock2' : ss + 'aws3.human_intelligence_tasks_hit;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAssignmentTaskBlock2' : ss + 'aws3.requester;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSWorkersBlock2' : ss + 'aws3.users;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRequesterBlock2' : ss + 'aws3.assignment_task;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//SDKs
			'AWSAndroidBlock3': ss + 'aws3.android;fillColor=#96BF3D;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSiOSBlock3' : ss + 'aws3.android;fillColor=#CFCFCF;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSJavaBlock3' : ss + 'aws3.android;fillColor=#EE472A;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSJavaScript' : ss + 'aws3.android;fillColor=#205E00;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSNetBlock3' : ss + 'aws3.android;fillColor=#115193;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSNodeJSBlock3' : ss + 'aws3.android;fillColor=#8CC64F;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSPHPBlock3' : ss + 'aws3.android;fillColor=#5A69A4;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSPythonBlock3' : ss + 'aws3.android;fillColor=#FFD44F;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSRubyBlock3' : ss + 'aws3.android;fillColor=#AE1F23;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSXamarin' : ss + 'aws3.android;fillColor=#4090D7;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSCLIBlock3' : ss + 'aws3.cli;fillColor=#444444;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSEclipseToolkitBlock3' : ss + 'aws3.toolkit_for_eclipse;fillColor=#342074;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSVisualStudioToolkitBlock3' : ss + 'aws3.toolkit_for_visual_studio;fillColor=#53B1CB;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSWindowsPowershellToolkitBlock3' : ss + 'aws3.toolkit_for_windows_powershell;fillColor=#737373;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//Analytics
			'AWSAmazonElasticsearchService' : ss + 'aws3.elasticsearch_service;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSElasticMapReduceBlock2' : ss + 'aws3.emr;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSClusterBlock2' : ss + 'aws3.emr_cluster;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSEMREngine2' : ss + 'aws3.emr_engine;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSEMRMapRM3Engine2' : ss + 'aws3.emr_engine_mapr_m3;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSEMRMapRM5Engine2' : ss + 'aws3.emr_engine_mapr_m5;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSEMRMapRM7Engine2' : ss + 'aws3.emr_engine_mapr_m7;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSKinesis2' : ss + 'aws3.kinesis;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonKinesis(AmazonKinesisAnalytics)' : ss + 'aws3.kinesis;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSKinesisEnabledApp2' : ss + 'aws3.kinesis_enabled_app;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonKinesis(AmazonKinesisFirehose)' : ss + 'aws3.kinesis_firehose;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonKinesis(AmazonKinesisStreams)' : ss + 'aws3.kinesis_streams;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonMachineLearning' : ss + 'aws3.machine_learning;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonQuickSight' : ss + 'aws3.quicksight;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//Mobile Services
			'AWSCognito2' : ss + 'aws3.cognito;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSMobileAnalytics2' : ss + 'aws3.mobile_analytics;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSDeviceFarm' : ss + 'aws3.device_farm;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSMobileHub' : ss + 'aws3.mobile_hub;gradientColor=#AD688A;gradientDirection=east;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSTopicBlock2' : ss + 'aws3.topic_2;fontStyle=1;fontColor=#ffffff;verticalAlign=top;spacingTop=-5',
			'AWSEmailNotificationBlock2' : ss + 'aws3.email_notification;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSHTTPNotificationBlock2' : ss + 'aws3.http_notification;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//Developer Tools
			'AWSAWSCodeCommit' : ss + 'aws3.codecommit;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSCodeDeploy2' : ss + 'aws3.codedeploy;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSCodePipeline' : ss + 'aws3.codepipeline;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//Enterprise Application
			'AWSWorkDocs2' : ss + 'aws3.workdocs;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonWorkMail' : ss + 'aws3.workmail;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonWorkSpaces2' : ss + 'aws3.workspaces;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//Internet of Things
			'AWSAWSIoT' : ss + 'aws3.aws_iot;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(action)' : ss + 'aws3.action;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(actuator)' : ss + 'aws3.actuator;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(certificate)' : ss + 'aws3.certificate;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(desiredstate)' : ss + 'aws3.desired_state;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(hardwareboard)' : ss + 'aws3.hardware_board;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(HTTP2protocol)' : ss + 'aws3.http_2_protocol;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(HTTPprotocol)' : ss + 'aws3.http_protocol;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(MQTTprotocol)' : ss + 'aws3.mqtt_protocol;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(policy)' : ss + 'aws3.policy;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(reportedstate)' : ss + 'aws3.reported_state;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(rule)' : ss + 'aws3.rule;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(sensor)' : ss + 'aws3.sensor;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(servo)' : ss + 'aws3.servo;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(shadow)' : ss + 'aws3.shadow;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(simulator)' : ss + 'aws3.simulator;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingbank)' : ss + 'aws3.bank;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingbicycle)' : ss + 'aws3.bicycle;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingcamera)' : ss + 'aws3.camera;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingcar)' : ss + 'aws3.car;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingcart)' : ss + 'aws3.cart;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingcoffeepot)' : ss + 'aws3.coffee_pot;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingdoorlock)' : ss + 'aws3.door_lock;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingfactory)' : ss + 'aws3.factory;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thinggeneric)' : ss + 'aws3.generic;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thinghouse)' : ss + 'aws3.house;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thinglightbulb)' : ss + 'aws3.lightbulb;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingmedicalemergency)' : ss + 'aws3.medical_emergency;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingpoliceemergency)' : ss + 'aws3.police_emergency;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingthermostat)' : ss + 'aws3.thermostat;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingtravel)' : ss + 'aws3.travel;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingutility)' : ss + 'aws3.utility;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(thingwindfarm)' : ss + 'aws3.windfarm;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAWSIoT(topic)' : ss + 'aws3.topic;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			
//AWS General			
			'AWSCloudBlock2' : ss + 'aws3.cloud;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSVPCloudBlock3' : ss + 'aws3.virtual_private_cloud;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSUserBlock2' : ss + 'aws3.user;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSUsersBlock2' : ss + 'aws3.users;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSClientBlock2' : ss + 'aws3.management_console;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSMobileClientBlock2' : ss + 'aws3.mobile_client;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSGenericDatabaseBlock3' : ss + 'aws3.generic_database;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDiskBlock3' : ss + 'aws3.disk;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSTapeStorageBlock3' : ss + 'aws3.tape_storage;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSMediaBlock2' : ss + 'aws3.multimedia;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSDataCenterBlock2' : ss + 'aws3.corporate_data_center;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSServerBlock2' : ss + 'aws3.traditional_server;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSInternetBlock2' : ss + 'aws2.non-service_specific.internet;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSForumsBlock3' : ss + 'aws3.forums;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSManagementBlock2' : ss + 'aws3.management_console;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonElasticCacheNode2' : ss + 'aws3.cache_node;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRedshiftDW1Cluster2' : ss + 'aws3.dense_compute_node;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRedshiftDW2Cluster2' : ss + 'aws3.dense_storage_node;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRedshiftSSDFamilyCluster2' : ss + 'aws3.dense_storage_node;verticalLabelPosition=bottom;align=center;verticalAlign=top',
			'AWSAmazonRoute53RouteTable2' : ss + 'aws3.route_table;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//			'AWSExampleIAMBlock2' NA
			'AWSSubnetBlock2' : ss + 'aws3.permissions;verticalLabelPosition=bottom;align=center;verticalAlign=top',
//AWS Containers
			'AWSRoundedRectangleContainerBlock2' : cs,
			'AWSRoundedRectangleContainerBlock' : cs,
//Azure Cloud
			'ACAccessControlBlock' : ssAzure + 'azure.access_control',
			'ACAPIAppsBlock' : ssAzure + 'mscae.cloud.api_app',
			'ACAPIManagementBlock' : ssAzure + 'mscae.cloud.api_management',
			'ACAppInsightsBlock' : ssAzure + 'mscae.cloud.application_insights',
			'ACAppServicesBlock' : ssAzure + 'mscae.cloud.app_service',
			'ACAutoscalingBlock' : ssAzure + 'azure.autoscale',
			'ACAzureActiveDirectoryBlock' : ssAzure + 'azure.azure_active_directory',
			'ACAzurealertBlock' : ssAzure + 'azure.azure_alert',
			'ACAzureAutomationBlock' : ssAzure + 'azure.automation',
			'ACAzureBatchBlock' : ssAzure + 'mscae.cloud.azure_batch',
			'ACAzureRedisBlock' : ssAzure + 'azure.azure_cache',
			'ACAzureFilesBlock' : ssAzure + 'mscae.cloud.azure_files_service',
			'ACAzureloadbalancerBlock' : ssAzure + 'mscae.cloud.azure_automatic_load_balancer',
			'ACAzureMarketplaceBlock' : ssAzure + 'azure.azure_marketplace',
			'ACAzureRightManagementRMSBlock' : ssAzure + 'mscae.cloud.azure_rights_management_rms',
			'ACAzureSDKBlock' : ssAzure + 'azure.azure_sdk',
			'ACAzureSearchBlock' : ssAzure + 'mscae.cloud.azure_search',
			'ACAzureSQLdatabaseBlock' : ssAzure + 'azure.sql_database_sql_azure',
			'ACAzuresubscriptionBlock' : ssAzure + 'azure.azure_subscription',
			'ACAzureWebsitesBlock' : ssAzure + 'azure.azure_website',
			'ACBackupServiceBlock' : ssAzure + 'azure.backup_service',
			'ACBitbucketcodesourceBlock' : ssAzure + 'azure.bitbucket_code_source',
			'ACBizTalkServicesBlock' : ssAzure + 'azure.biztalk_services',
			'ACCloudServiceBlock' : ssAzure + 'azure.cloud_service',
			'ACCodePlexBlock' : ssAzure + 'azure.codeplex_code_source',
//			'ACComputeBlock' NA
			'ACContentDeliveryNetworkBlock' : ssAzure + 'azure.content_delivery_network',
			'ACDataFactoryBlock' : ssAzure + 'mscae.cloud.data_factory',
//			'ACDataservicesBlock' NA
			'ACDocumentDBBlock' : ssAzure + 'mscae.cloud.documentdb',
			'ACDropboxcodesourceBlock' : ssAzure + 'azure.dropbox_code_source',
			'ACEventsHubBlock' : ssAzure + 'mscae.cloud.event_hubs',
			'ACExpressRouteBlock' : ssAzure + 'azure.express_route',
			'ACGitHubBlock' : ssAzure + 'azure.github_code',
			'ACGitrepositoryBlock' : ssAzure + 'azure.git_repository',
			'ACHDInsightBlock' : ssAzure + 'mscae.cloud.hdinsight',
			'ACHealthmonitoringBlock' : ssAzure + 'azure.health_monitoring',
			'ACHealthyBlock' : ssAzure + 'azure.healthy',
			'ACHybridConnectionBlock' : ssAzure + 'mscae.cloud.hybrid_connections',
			'ACBizTalkhybridconnectionBlock' : ssAzure + 'mscae.cloud.hybrid_connection_manager',
			'ACKeyVaultBlock' : ssAzure + 'mscae.cloud.key_vault',
			'ACLogicAppBlock' : ssAzure + 'mscae.cloud.logic_app',
			'ACMachineLearningBlock' : ssAzure + 'mscae.cloud.machine_learning',
			'ACMediaServicesBlock' : ssAzure + 'azure.media_service',
			'ACMicrosoftaccountBlock' : ssAzure + 'mscae.cloud.microsoft_account',
			'ACMicrosoftAzureBlock' : ssAzure + 'mscae.cloud.microsoft_azure',
			'ACMobileEngagementBlock' : ssAzure + 'mscae.cloud.mobile_engagement',
			'ACMobileServicesBlock' : ssAzure + 'mscae.cloud.mobile_app',
			'ACMultiFactorAuthBlock' : ssAzure + 'azure.multi_factor_authentication',
			'ACMySQLdatabaseBlock' : ssAzure + 'azure.mysql_database',
			'ACNotificationHubsBlock' : ssAzure + 'azure.notification_hub',
			'ACNotificationtopicBlock' : ssAzure + 'azure.notification_topic',
			'ACOperationalInsightsBlock' : ssAzure + 'mscae.cloud.operational_insights',
			'ACOSimageBlock' : ssAzure + 'azure.operating_system_image',
			'ACRemoteAppBlock' : ssAzure + 'mscae.cloud.remoteapp',
			'ACrpdRemotingfileBlock' : ssAzure + 'azure.rdp_remoting_file',
			'ACSchedulerBlock' : ssAzure + 'azure.scheduler',
			'ACServiceBusBlock' : ssAzure + 'azure.service_bus',
			'ACServiceBusQueueBlock' : ssAzure + 'azure.service_bus_queues',
			'ACServiceBusRelayBlock' : ssAzure + 'azure.service_bus_relay',
			'ACServiceBusTopicBlock' : ssAzure + 'azure.service_bus_topics_and_subscriptions',
			'ACServiceEndpointBlock' : ssAzure + 'mscae.cloud.service_endpoint',
			'ACServicepackageBlock' : ssAzure + 'mscae.cloud.service_package',
			'ACSiteRecoveryBlock' : ssAzure + 'azure.hyper_v_recovery_manager',
			'ACSQLdatabasegenericBlock' : ssAzure + 'azure.sql_database',
//			'ACSQLDatabasePremiumBlock' NA
			'ACSQLdatasyncBlock' : ssAzure + 'azure.sql_datasync',
			'ACSQLreportingdeprecatedBlock' : ssAzure + 'azure.sql_reporting',
			'ACStartuptaskBlock' : ssAzure + 'azure.startup_task',
			'ACStorageAzureBlock' : ssAzure + 'mscae.cloud.azure_storage',
			'ACStorageblobBlock' : ssAzure + 'azure.storage_blob',
			'ACStoragequeueBlock' : ssAzure + 'azure.storage_queue',
			'ACStoragetableBlock' : ssAzure + 'azure.storage_table',
			'ACStorSimpleBlock' : ssAzure + 'azure.storsimple',
			'ACStreamAnalyticsBlock' : ssAzure + 'mscae.cloud.stream_analytics',
			'ACTrafficManagerBlock' : ssAzure + 'azure.traffic_manager',
			'ACAlienBlock' : ssAzure + 'azure.unidentified_code_object',
			'ACVHDBlock' : ssAzure + 'azure.vhd',
			'ACVHDdatadiskBlock' : ssAzure + 'azure.vhd_data_disk',
			'ACVirtualmachineBlock' : ssAzure + 'azure.virtual_machine',
			'ACVirtualmachinecontainerBlock' : ssAzure + 'mscae.cloud.virtual_machine_container',
			'ACVirtualnetworkBlock' : ssAzure + 'azure.virtual_network',
			'ACVisualStudioOnlineBlock' : ssAzure + 'azure.visual_studio_online',
			'ACVMsymbolonlyBlock' : ssAzure + 'azure.virtual_machine_feature',
			'ACWebJobsBlock' : ssAzure + 'mscae.cloud.webjobs',
			'ACWebroleBlock' : ssAzure + 'azure.web_role',
			'ACWebrolesBlock' : ssAzure + 'azure.web_roles',
			'ACWorkaccountBlock' : ssAzure + 'mscae.cloud.work_account',
			'ACWorkerroleBlock' : ssAzure + 'azure.worker_role',
			'ACWorkerrolesBlock' : ssAzure + 'azure.worker_roles',
			'ADNSBlock' : ssAzure + 'mscae.cloud.azure_dns',
//			'AGatewayBlock' NA
			'ACLoadBalancerBlock' : ssAzure + 'mscae.cloud.azure_load_balancer_feature',
			'ACResourceGroupBlock' : ssAzure + 'mscae.cloud.resource_group',
			'ACVPNGatewayBlock' : ssAzure + 'mscae.cloud.vpn_gateway',
//Azure Enterprise
			'AEActiveDirectoryFSPBlock' : ssAzure + 'mscae.enterprise.d',
			'AEADFSBlock' : ssAzure + 'mscae.enterprise.ad_fs',
			'AEAndroidPhoneBlock' : ssAzure + 'mscae.enterprise.android_phone',
			'AEappblankfortextBlock' : ssAzure + 'mscae.enterprise.application_blank',
			'AEAppGenericBlock' : ssAzure + 'mscae.enterprise.app_generic',
			'AEAppserverBlock' : ssAzure + 'mscae.enterprise.application_server',
			'AEBackuplocalBlock' : ssAzure + 'mscae.enterprise.backup_local',
			'AEBackuponlineBlock' : ssAzure + 'mscae.enterprise.backup_online',
			'AECalendarBlock' : ssAzure + 'mscae.general.calendar',
			'AECertificateBlock' : ssAzure + 'azure.certificate',
			'AEClientAppBlock' : ssAzure + 'mscae.enterprise.client_application',
			'AECloudBlock' : ssAzure + 'mscae.enterprise.internet',
			'AEClusterserverBlock' : ssAzure + 'mscae.enterprise.cluster_server',
			'AECodefileBlock' : ssAzure + 'azure.code_file',
			'AEConnectorsBlock' : ssAzure + 'mscae.enterprise.connectors',
			'AEDatabasegenericBlock' : ssAzure + 'mscae.enterprise.database_generic',
			'AEDatabaseserverBlock' : ssAzure + 'mscae.enterprise.database_server',
			'AEDatabasesyncBlock' : ssAzure + 'mscae.enterprise.database_synchronization',
			'AEDeviceBlock' : ssAzure + 'mscae.enterprise.device',
			'AEDirectaccessBlock' : ssAzure + 'mscae.enterprise.direct_access_feature',
			'AEDocumentBlock' : ssAzure + 'mscae.enterprise.document',
			'AEDomaincontrollerBlock' : ssAzure + 'mscae.enterprise.domain_controller',
			'AEEnterpriseBuildingBlock' : ssAzure + 'azure.enterprise',
			'AEFilegeneralBlock' : ssAzure + 'azure.file',
			'AEFilterBlock' : ssAzure + 'mscae.enterprise.filter',
			'AEFirewallBlock' : ssAzure + 'mscae.enterprise.firewall',
			'AEFolderBlock' : ssAzure + 'mscae.enterprise.folder',
			'AEGatewayBlock' : ssAzure + 'mscae.enterprise.gateway',
			'AEGenericcodeBlock' : ssAzure + 'azure.code_file',
			'AEGraphBlock' : ssAzure + 'mscae.general.graph',
			'AEHealthmonitoringBlock' : ssAzure + 'azure.health_monitoring',
			'AEHealthyBlock' : ssAzure + 'azure.healthy',
			'AEImportgenericBlock' : ssAzure + 'mscae.enterprise.import_generic',
			'AEInternetBlock' : ssAzure + 'mscae.enterprise.internet',
			'AEKeyboardBlock' : ssAzure + 'mscae.enterprise.keyboard',
			'AEKeypermissionsBlock' : ssAzure + 'mscae.enterprise.key_permissions',
			'AELaptopcomputerBlock' : ssAzure + 'azure.laptop',
			'AELoadbalancerBlock' : ssAzure + 'azure.load_balancer_generic',
			'AELoadTestingBlock' : ssAzure + 'mscae.enterprise.load_testing',
			'AELockprotectedBlock' : ssAzure + 'mscae.enterprise.lock',
			'AELockunprotectedBlock' : ssAzure + 'mscae.enterprise.lock_unlocked',
			'AEMaintenanceBlock' : ssAzure + 'mscae.enterprise.maintenance',
			'AEManagementconsoleBlock' : ssAzure + 'mscae.enterprise.management_console',
			'AEMessageBlock' : ssAzure + 'azure.message',
			'AEMonitorBlock' : ssAzure + 'azure.computer',
			'AEMonitorrunningappsBlock' : ssAzure + 'mscae.enterprise.monitor_running_apps',
			'AEMouseBlock' : ssAzure + 'mscae.enterprise.mouse',
			'AENetworkcardBlock' : ssAzure + 'mscae.enterprise.network_card',
			'AENotallowedBlock' : ssAzure + 'mscae.general.not_allowed',
			'AEPerformanceBlock' : ssAzure + 'mscae.enterprise.performance',
			'AEPerformancemonitorBlock' : ssAzure + 'mscae.enterprise.performance_monitor',
			'AEPhoneBlock' : ssAzure + 'azure.mobile',
			'AEPlugandplayBlock' : ssAzure + 'mscae.enterprise.plug_and_play',
			'AEPowershellscriptfileBlock' : ssAzure + 'azure.powershell_file',
			'AEProtocolstackBlock' : ssAzure + 'mscae.enterprise.protocol_stack',
			'AEQueuegeneralBlock' : ssAzure + 'azure.queue_generic',
			'AERMSconnectorBlock' : ssAzure + 'mscae.enterprise.rms_connector',
			'AERouterBlock' : ssAzure + 'mscae.enterprise.router',
			'AEScriptfileBlock' : ssAzure + 'azure.script_file',
			'AESecurevirtualmachineBlock' : ssAzure + 'mscae.enterprise.secure_virtual_machine',
			'AEServerbladeBlock' : ssAzure + 'azure.server',
			'AEServerdirectoryBlock' : ssAzure + 'mscae.enterprise.server_directory',
			'AEServerfarmBlock' : ssAzure + 'mscae.enterprise.server_farm',
			'AEServergenericBlock' : ssAzure + 'mscae.enterprise.server_generic',
			'AEServerrackBlock' : ssAzure + 'azure.server_rack',
			'AESettingsBlock' : ssAzure + 'mscae.enterprise.settings',
			'AESharedfolderBlock' : ssAzure + 'mscae.enterprise.shared_folder',
			'AESmartcardBlock' : ssAzure + 'mscae.enterprise.smartcard',
			'AEStorageBlock' : ssAzure + 'mscae.enterprise.storage',
			'AETableBlock' : ssAzure + 'mscae.enterprise.table',
			'AETabletBlock' : ssAzure + 'azure.tablet',
			'AEToolBlock' : ssAzure + 'mscae.enterprise.tool',
			'AETunnelBlock' : ssAzure + 'mscae.general.tunnel',
			'AEUnhealthyBlock' : ssAzure + 'mscae.enterprise.unhealthy',
			'AEUSBBlock' : ssAzure + 'mscae.enterprise.usb',
			'AEUserBlock' : ssAzure + 'azure.user',
			'AEVideoBlock' : ssAzure + 'mscae.general.video',
			'AEVirtualmachineBlock' : ssAzure + 'azure.virtual_machine_feature',
			'AEWebBlock' : ssAzure + 'mscae.enterprise.web',
			'AEWebserverBlock' : ssAzure + 'mscae.enterprise.web_server',
			'AEWindowsserverBlock' : ssAzure + 'mscae.enterprise.windows_server',
			'AEWirelessconnectionBlock' : ssAzure + 'mscae.enterprise.wireless_connection',
			'AEWorkstationclientBlock' : ssAzure + 'mscae.enterprise.workstation_client',
			'AEXMLwebserviceBlock' : ssAzure + 'mscae.enterprise.xml_web_service',
			'AGSAudioBlock' : ssAzure + 'mscae.general.audio',
			'AGSBugBlock' : ssAzure + 'mscae.general.bug',
			'AGSCablesettopTVboxBlock' : ssAzure + 'mscae.general.cable_settop_tv_box',
			'AGSCalendarBlock' : ssAzure + 'mscae.general.calendar',
			'AGSChartBlock' : ssAzure + 'mscae.general.chart',
			'AGSCheckmarkSuccessBlock' : ssAzure + 'mscae.general.checkmark',
			'AGSContinousCycleCircleBlock' : ssAzure + 'mscae.general.continuous_cycle',
			'AGSCrossoutFailureBlock' : ssAzure + 'mscae.general.crossout',
			'AGSCutandpasteBlock' : ssAzure + 'mscae.general.cut_and_paste',
			'AGSFolderBlock' : ssAzure + 'mscae.enterprise.folder',
			'AGSGamecontrollerBlock' : ssAzure + 'mscae.general.game_controller',
			'AGSGearsBlock' : ssAzure + 'mscae.general.gears',
			'AGSGraphBlock' : ssAzure + 'mscae.general.graph',
			'AGSLikeBlock' : ssAzure + 'mscae.general.like',
			'AGSNotallowedBlock' : ssAzure + 'mscae.general.not_allowed',
			'AGSSliderbarhorizontalBlock' : ssAzure + 'mscae.general.slider_bar_horizontal',
			'AGSSliderbarvertBlock' : ssAzure + 'mscae.general.slider_bar_vertical',
			'AGSTasklistorBacklogBlock' : ssAzure + 'mscae.general.task_list',
			'AGSTasksBlock' : ssAzure + 'mscae.general.tasks',
			'AGSTunnelBlock' : ssAzure + 'mscae.general.tunnel',
			'AGSUserBlock' : ssAzure + 'azure.user',
			'AGSVideoBlock' : ssAzure + 'mscae.general.video',
// Azure VMS			
			'AVMActiveDirectoryVMBlock' : 'shape=mxgraph.mscae.vm.active_directory;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMActiveDirectoryVMmultiBlock' : 'shape=mxgraph.mscae.vm.active_directory_multi;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMAppServerVMBlock' : 'shape=mxgraph.mscae.vm.application_server;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMAppServerVMmultiBlock' : 'shape=mxgraph.mscae.vm.application_server_multi;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMDatabaseServerVMBlock' : 'shape=mxgraph.mscae.vm.database_server;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMDatabaseServerVMmultiBlock' : 'shape=mxgraph.mscae.vm.database_server_multi;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMDirectoryServerVMBlock' : 'shape=mxgraph.mscae.vm.directory_server;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMDirectoryServerVMmultiBlock' : 'shape=mxgraph.mscae.vm.directory_server_multi;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMDomainServerVMBlock' : 'shape=mxgraph.mscae.vm.domain_server;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMDomainServerVMmultiBlock' : 'shape=mxgraph.mscae.vm.domain_server_multi;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMFileServerVMBlock' : 'shape=mxgraph.mscae.vm.file_server;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMFileServerVMmultiBlock' : 'shape=mxgraph.mscae.vm.file_server_multi;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMWebServerVMBlock' : 'shape=mxgraph.mscae.vm.web_server;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMWebServerVMmultiBlock' : 'shape=mxgraph.mscae.vm.web_server_multi;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMWindowsServerVMBlock' : 'shape=mxgraph.mscae.vm.windows_server;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
			'AVMWindowsServerVMmultiBlock' : 'shape=mxgraph.mscae.vm.windows_server_multi;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=none',
// Azure 2019
			'AccessReviewAzure2019': azur19 + 'Access_Review.svg',
			'ActiveDirectoryConnectHealthAzure2019': azur19 + 'Active_Directory_Health_Monitoring.svg',
			'ActiveDirectoryAzure2019': azur19 + 'Active_Directory.svg',
			'ActiveDirectoryAzure2019_': azur19 + 'ActiveDirectory.svg',
			'ActiveDirectoryDomainAzure2019': azur19 + 'ActiveDirectoryDomain.svg',
			'AddressSpaceAzure2019': azur19 + 'Address_Space.svg',
			'AddTeamMemberAzure2019': azur19 + 'AddTeamMember.svg',
			'ADFSAzure2019': azur19 + 'ADFS.svg',
			'AdvisorAzure2019': azur19 + 'Advisor.svg',
			'AlienAzure2019': azur19 + 'Alien.svg',
			'AlienSadAzure2019': azur19 + 'AlienSad.svg',
			'AnalysisServicesAzure2019': azur19 + 'Analysis_Services.svg',
			'APIManagementServicesAzure2019': azur19 + 'API_Management.svg',
			'APIAzure2019': azur19 + 'API.svg',
			'APIDefinitionAzure2019': azur19 + 'APIDefinition.svg',
			'AppConfigurationAzure2019': azur19 + 'App_Configuration.svg',
			'AppRegistrationsAzure2019': azur19 + 'App_Registrations.svg',
			'AppServiceAPIAppsAzure2019': azur19 + 'App_Service_API_Apps.svg',
			'AppServiceFrontendAzure2019': azur19 + 'App_Service_Frontend.svg',
			'PublicIPAddressesAzure2019': azur19 + 'App_Service_IPAddress.svg',
			'AzureAppServiceMobileAzure2019': azur19 + 'App_Service_Mobile_App.svg',
			'AppServiceWorkerPoolsAzure2019': azur19 + 'App_Service_Worker_Pools.svg',
			'AppServiceAzure2019': azur19 + 'App_Service.svg',
			'AppServicesAzure2019': azur19 + 'App_Services.svg',
			'AppServiceEnvironmentsAzure2019': azur19 + 'App_Services.svg',
			'ApplicationGatewayAzure2019': azur19 + 'Application_Gateway.svg',
			'ApplicationInsightsAzure2019': azur19 + 'Application_Insights.svg',
			'ApplicationSecurityGroupsAzure2019': azur19 + 'Application_Security_Groups.svg',
			'AppServiceConnectivityAzure2019': azur19 + 'AppServiceConnectivity.svg',
			'AppServiceEnvironmentAzure2019': azur19 + 'AppServiceEnvironment.svg',
			'ArchiveStorageAzure2019': azur19 + 'Archive_Storage.svg',
			'ARMExplorerAzure2019': azur19 + 'ARMExplorer.svg',
			'AuditingAzure2019': azur19 + 'Auditing.svg',
			'AuditingServerAzure2019': azur19 + 'AuditingServer.svg',
			'AutoBackupAzure2019': azur19 + 'AutoBackup.svg',
			'AutomationAccountsAzure2019': azur19 + 'Automation.svg',
			'AvatarAzure2019': azur19 + 'Avatar.svg',
			'AvatarDefaultAzure2019': azur19 + 'AvatarDefault.svg',
			'AvatarUnknownAzure2019': azur19 + 'AvatarUnknown.svg',
			'Azure API for FHIRAzure2019': azur19 + 'Azure API for FHIR.svg',
			'AzureADB2CAzure2019': azur19 + 'Azure_AD_B2C.svg',
			'AzureADDomainServicesAzure2019': azur19 + 'Azure_AD_Domain_Services.svg',
			'AzureADIdentityProtectionAzure2019': azur19 + 'Azure_AD_Identity_Protection.svg',
			'AzureADPrivilegedIdentityManagementAzure2019': azur19 + 'Azure_AD_Privileged_Identity_Management.svg',
			'AzureAPIforFHIRAzure2019': azur19 + 'Azure_API_for_FHIR.svg',
			'AzureArtifactsAzure2019': azur19 + 'Azure_Artifacts.svg',
			'AzureBoardsAzure2019': azur19 + 'Azure_Boards.svg',
			'AzureCacheforRedisAzure2019': azur19 + 'Azure_Cache_for_Redis.svg',
			'AzureDataExplorerClustersAzure2019': azur19 + 'Azure_Data_Explorer_Clusters.svg',
			'AzureDatabaseforMariaDBServersAzure2019': azur19 + 'Azure_Database_for_MariaDB_servers.svg',
			'AzureDatabaseforMySQLServersAzure2019': azur19 + 'Azure_Database_for_MySQL_servers.svg',
			'AzureDatabaseforPostgreSQLServersAzure2019': azur19 + 'Azure_Database_for_PostgreSQL_servers.svg',
			'AzureDatabaseMigrationServicesAzure2019': azur19 + 'Azure_Database_Migration_Services.svg',
			'AzureDevOpsAzure2019': azur19 + 'Azure_DevOps.svg',
			'AzureDigitalTwinsAzure2019': azur19 + 'Azure_Digital_Twins.svg',
			'AzureFirewallAzure2019': azur19 + 'Azure_Firewall.svg',
			'AzureHomeAzure2019': azur19 + 'Azure_Home.svg',
			'AzureIoTHubSecurityAzure2019': azur19 + 'Azure_IoT_Hub_Security.svg',
			'AzureIoTHubAzure2019': azur19 + 'Azure_IoT_Hub.svg',
			'AzureMapsAzure2019': azur19 + 'Azure_Maps.svg',
			'AzureMediaPlayerAzure2019': azur19 + 'Azure_Media_Player.svg',
			'AzureNetAppfilesAzure2019': azur19 + 'Azure_NetApp_files.svg',
			'AzurePipelinesAzure2019': azur19 + 'Azure_Pipelines.svg',
			'AzureReposAzure2019': azur19 + 'Azure_Repos.svg',
			'AzureSentinelAzure2019': azur19 + 'Azure_Sentinel.svg',
			'AzureSphereAzure2019': azur19 + 'Azure_Sphere.svg',
			'AzureTestPlansAzure2019': azur19 + 'Azure_Test_Plans.svg',
			'AzureFXTEdgeFilerAzure2019': azur19 + 'AzureFXTEdgeFiler.svg',
			'BacklogAzure2019': azur19 + 'Backlog.svg',
			'RecoveryServicesVaultsAzure2019': azur19 + 'Backup.svg',
			'BatchAccountsAzure2019': azur19 + 'Batch_Accounts.svg',
			'BatchAIAzure2019': azur19 + 'Batch_AI.svg',
			'BatchTaskAzure2019': azur19 + 'Batch_Task.svg',
			'BatchTaskVMAzure2019': azur19 + 'Batch_TaskVM.svg',
			'BatchAzure2019': azur19 + 'Batch.svg',
			'BillingHubAzure2019': azur19 + 'BillingHub.svg',
			'BizTalkServicesHybridConnectionsAzure2019': azur19 + 'BizTalk_Services_Hybrid_Connections.svg',
			'BizTalkServicesAzure2019': azur19 + 'BizTalk_Services.svg',
			'BlobStorageAzure2019': azur19 + 'BlobBlock.svg',
			'BlobPageAzure2019': azur19 + 'BlobPage.svg',
			'BlockchainAzure2019': azur19 + 'Blockchain.svg',
			'BlogStorageAzure2019': azur19 + 'Blog_Storage.svg',
			'BlueprintsAzure2019': azur19 + 'Blueprints.svg',
			'BookAzure2019': azur19 + 'Book.svg',
			'BotServicesAzure2019': azur19 + 'Bot_Services.svg',
			'BranchAzure2019': azur19 + 'Branch.svg',
			'BrowserAzure2019': azur19 + 'Browser.svg',
			'BugAzure2019': azur19 + 'Bug.svg',
			'BuildingBlocksAzure2019': azur19 + 'Building_Blocks.svg',
			'BuildsAzure2019': azur19 + 'Builds.svg',
			'AzureCacheplusRedisAzure2019': azur19 + 'Cache_including_Redis.svg',
			'AzureCacheRedisAzure2019': azur19 + 'Cache_Redis_Product.svg',
			'CalendarAzure2019': azur19 + 'Calendar.svg',
			'CDNrocketAzure2019': azur19 + 'CDNrocket.svg',
			'CertificateAzure2019': azur19 + 'Certificate.svg',
			'AppServiceCertificatesAzure2019': azur19 + 'Certificate.svg',
			'MetricsAzure2019': azur19 + 'Chart.svg',
			'CheckAzure2019': azur19 + 'Check.svg',
			'CitrixVirtualDesktopsEssentialsAzure2019': azur19 + 'Citrix_Virtual_Desktops_Essentials.svg',
			'ReservedIPAddressesClassicAzure2019': azur19 + 'ClassicIPAddress.svg',
			'ClassicStorageAzure2019': azur19 + 'ClassicStorage.svg',
			'ClientAppsAzure2019': azur19 + 'Client_Apps.svg',
			'RecentAzure2019': azur19 + 'Clock.svg',
			'CycleCloudAzure2019': azur19 + 'Cloud_Cycle.svg',
			'CloudServicesAzure2019': azur19 + 'Cloud_Service.svg',
			'CloudServicesClassicAzure2019': azur19 + 'Cloud_Services_Classic.svg',
			'CloudSimpleNodesAzure2019': azur19 + 'CloudSimple_Nodes.svg',
			'CloudSimpleServicesAzure2019': azur19 + 'CloudSimple_Services.svg',
			'CloudSimpleVirtualMachinesAzure2019': azur19 + 'CloudSimple_Virtual_Machines.svg',
			'CodeAzure2019': azur19 + 'Code.svg',
			'CognitiveServicesComputerVisionAzure2019': azur19 + 'Cognitive_Services_Computer_Vision.svg',
			'CognitiveServicesemotionAzure2019': azur19 + 'Cognitive_Services_emotion.svg',
			'CognitiveServicesfaceAzure2019': azur19 + 'Cognitive_Services_face.svg',
			'CognitiveServicesluisAzure2019': azur19 + 'Cognitive_Services_luis.svg',
			'CognitiveServicesrecommendationsAzure2019': azur19 + 'Cognitive_Services_recommendations.svg',
			'CognitiveServicesSpeechAzure2019': azur19 + 'Cognitive_Services_Speech.svg',
			'CognitiveServicestextanalyticsAzure2019': azur19 + 'Cognitive_Services_textanalytics.svg',
			'CognitiveServicesweblanguagemodelAzure2019': azur19 + 'Cognitive_Services_web_language_model.svg',
			'CognitiveServicesAzure2019': azur19 + 'Cognitive_Services.svg',
			'CommitsAzure2019': azur19 + 'Commits.svg',
			'ConnectionAzure2019': azur19 + 'Connection.svg',
			'ConnectionsAzure2019': azur19 + 'Connections.svg',
			'ContactInfoAzure2019': azur19 + 'ContactInfo.svg',
			'ContainerInstancesAzure2019': azur19 + 'Container_Instances.svg',
			'ContainerRegistriesAzure2019': azur19 + 'Container_Registries.svg',
			'ContainerServiceAzure2019': azur19 + 'Container_Service.svg',
			'CDNProfilesAzure2019': azur19 + 'Content_Delivery_Network.svg',
			'ContentProtectionAzure2019': azur19 + 'Content_Protection.svg',
			'ContentManagementSystemAzure2019': azur19 + 'ContentManagementSystem.svg',
			'ContinuousExportAzure2019': azur19 + 'ContinuousExport.svg',
			'ControllersAzure2019': azur19 + 'Controllers.svg',
			'ControlsAzure2019': azur19 + 'Controls.svg',
			'ControlsHorizontalAzure2019': azur19 + 'ControlsHorizontal.svg',
			'AzureCosmosDBAzure2019': azur19 + 'CosmosDB.svg',
			'CounterAzure2019': azur19 + 'Counter.svg',
			'CubesAzure2019': azur19 + 'Cubes.svg',
			'CustomDomainAzure2019': azur19 + 'CustomDomain.svg',
			'AppServiceDomainsAzure2019': azur19 + 'CustomDomain.svg',
			'CustomerLockboxAzure2019': azur19 + 'Customer_Lockbox.svg',
			'CustomerInsightsAzure2019': azur19 + 'CustomerInsights.svg',
			'DataBoxEdgeDataBoxGatewayAzure2019': azur19 + 'Data_Box_Edge_Data_Box_Gateway.svg',
			'DataBoxAzure2019': azur19 + 'Data_Box.svg',
			'ImportExportJobsAzure2019': azur19 + 'Data_Box.svg',
			'AzureDataCatalogAzure2019': azur19 + 'Data_Catalog.svg',
			'DataFactoriesAzure2019': azur19 + 'Data_Factory.svg',
			'DataLakeAnalyticsAzure2019': azur19 + 'Data_Lake_Analytics.svg',
			'DataLakeStorageAzure2019': azur19 + 'Data_Lake_Storage.svg',
			'DataLakeStoreGen1Azure2019': azur19 + 'Data_Lake_Store.svg',
			'DataLakeAzure2019': azur19 + 'Data_Lake.svg',
			'DataWarehouseAzure2019': azur19 + 'Data_Warehouse.svg',
			'AzureDatabaseGenericAzure2019': azur19 + 'Database_General.svg',
			'DatabaseRestoreAzure2019': azur19 + 'DatabaseRestore.svg',
			'AzureDatabricksAzure2019': azur19 + 'Databricks.svg',
			'dataExportAzure2019': azur19 + 'dataExport.svg',
			'dataRetentionAzure2019': azur19 + 'dataRetention.svg',
			'DataServicescategoryrollupAzure2019': azur19 + 'DataServices_category_rollup.svg',
			'DCOSAzure2019': azur19 + 'DC_OS.svg',
			'DDOSProtectionPlansAzure2019': azur19 + 'DDOS_Protection_Plans.svg',
			'DedicatedEventHubAzure2019': azur19 + 'Dedicated_Event_Hub.svg',
			'DevConsoleAzure2019': azur19 + 'DevConsole.svg',
			'DeveloperToolsAzure2019': azur19 + 'Developer_Tools.svg',
			'DeviceComplianceAzure2019': azur19 + 'Device_Compliance.svg',
			'DeviceConfigAzure2019': azur19 + 'Device_Config.svg',
			'DeviceProvisioningServicesAzure2019': azur19 + 'Device_Provisioning_Services.svg',
			'DevicesGroupsAzure2019': azur19 + 'Devices_Groups.svg',
			'AzureDevTestLabsAzure2019': azur19 + 'DevTest_Labs.svg',
			'DirectorySyncAzure2019': azur19 + 'DirectorySync.svg',
			'DiscardAzure2019': azur19 + 'Discard.svg',
			'DisksAzure2019': azur19 + 'Discs.svg',
			'DNSPrivateZonesAzure2019': azur19 + 'DNS_Private_Zones.svg',
			'DNSZonesAzure2019': azur19 + 'DNS.svg',
			'DockerAzure2019': azur19 + 'Docker.svg',
			'DocumentDBAzure2019': azur19 + 'DocumentDB.svg',
			'DownloadAzure2019': azur19 + 'Download.svg',
			'EBooksAzure2019': azur19 + 'eBooks.svg',
			'EducationAzure2019': azur19 + 'Education.svg',
			'ElasticDatabasePoolsAzure2019': azur19 + 'Elastic_Database_Pools.svg',
			'ElasticJobAgentsAzure2019': azur19 + 'Elastic_Job_Agents.svg',
			'EnrollmentAzure2019': azur19 + 'Enrollment.svg',
			'EnterpriseApplicationsAzure2019': azur19 + 'Enterprise_Applications.svg',
			'EventGridTopicsAzure2019': azur19 + 'Event_Grid_Topics.svg',
			'EventGridDomainsAzure2019': azur19 + 'Event_Grid.svg',
			'EventGridSubscriptionsAzure2019': azur19 + 'Event_Grid.svg',
			'EventHubClustersAzure2019': azur19 + 'Event_Hub_Clusters.svg',
			'EventHubsAzure2019': azur19 + 'Event_Hubs.svg',
			'EventLogAzure2019': azur19 + 'EventLog.svg',
			'ExchangeOnPremisesAccessAzure2019': azur19 + 'Exchange_On_premises_Access.svg',
			'ExpressRouteCircuitsAzure2019': azur19 + 'Express_Route.svg',
			'ExtensionsAzure2019': azur19 + 'Extensions.svg',
			'FavoriteAzure2019': azur19 + 'Favorite.svg',
			'FileAzure2019': azur19 + 'File.svg',
			'FilesAzure2019': azur19 + 'Files.svg',
			'FolderAzure2019': azur19 + 'Folder.svg',
			'FolderBlankAzure2019': azur19 + 'FolderBlank.svg',
			'FolderCubeAzure2019': azur19 + 'FolderCube.svg',
			'FolderWebsiteAzure2019': azur19 + 'FolderWebsite.svg',
			'ForPlacementOnlyAzure2019': azur19 + 'ForPlacementOnly.svg',
			'FreeServicesAzure2019': azur19 + 'Free_Services.svg',
			'FrontDoorsAzure2019': azur19 + 'Front_Doors.svg',
			'FtpAzure2019': azur19 + 'Ftp.svg',
			'FunctionAppsAzure2019': azur19 + 'Functions.svg',
			'GalleryManagementAzure2019': azur19 + 'GalleryManagement.svg',
			'GatewayAzure2019': azur19 + 'Gateway.svg',
			'Gear2Azure2019': azur19 + 'Gear_2.svg',
			'GearAzure2019': azur19 + 'Gear.svg',
			'GearAlternate2Azure2019': azur19 + 'GearAlternate_2.svg',
			'GearAlternateAzure2019': azur19 + 'GearAlternate.svg',
			'GeneralStorageAzure2019': azur19 + 'General_Storage.svg',
			'GenomicsAccountsAzure2019': azur19 + 'Genomics_Accounts.svg',
			'GeoReplicationPremiumAzure2019': azur19 + 'GeoReplicationPremium.svg',
			'GeoReplicationStandardAzure2019': azur19 + 'GeoReplicationStandard.svg',
			'GetMoreLicenseAzure2019': azur19 + 'GetMoreLicense.svg',
			'GetStartedAzure2019': azur19 + 'GetStarted.svg',
			'GiftAzure2019': azur19 + 'Gift.svg',
			'GlobeAzure2019': azur19 + 'Globe.svg',
			'GlobeErrorAzure2019': azur19 + 'GlobeError.svg',
			'GlobeSuccessAzure2019': azur19 + 'GlobeSuccess.svg',
			'GlobeWarningAzure2019': azur19 + 'GlobeWarning.svg',
			'GoAzure2019': azur19 + 'Go.svg',
			'GreatScottAzure2019': azur19 + 'GreatScott.svg',
			'GridAzure2019': azur19 + 'Grid.svg',
			'AllResourcesAzure2019': azur19 + 'Grid3x3.svg',
			'GuestAssignmentsAzure2019': azur19 + 'Guest_Assignments.svg',
			'Guide2Azure2019': azur19 + 'Guide_2.svg',
			'GuideAzure2019': azur19 + 'Guide.svg',
			'HammerAzure2019': azur19 + 'Hammer.svg',
			'HDInsightAzure2019': azur19 + 'HDInsight.svg',
			'HDInsightClustersAzure2019': azur19 + 'HDInsightClusters.svg',
			'HealthErrorBadgeAzure2019': azur19 + 'HealthErrorBadge.svg',
			'HealthWarningBadgeAzure2019': azur19 + 'HealthWarningBadge.svg',
			'HeartAzure2019': azur19 + 'Heart.svg',
			'HeartPulseAzure2019': azur19 + 'HeartPulse.svg',
			'HomeAzure2019': azur19 + 'Home.svg',
			'HybridConnectionEndpointAzure2019': azur19 + 'HybridConnectionEndpoint.svg',
			'IdentityGovernanceAzure2019': azur19 + 'Identity_Governance.svg',
			'ImageDefinitionsAzure2019': azur19 + 'Image_Definitions.svg',
			'ImageVersionsAzure2019': azur19 + 'Image_Versions.svg',
			'ImageAzure2019': azur19 + 'Image.svg',
			'InboundNATAzure2019': azur19 + 'InboundNAT.svg',
			'InboundRuleAzure2019': azur19 + 'InboundRule.svg',
			'InformationAzure2019': azur19 + 'Info_2.svg',
			'WhatsNewAzure2019': azur19 + 'Info.svg',
			'AzureTimeSeriesInsightsEventsSourcesAzure2019': azur19 + 'Input.svg',
			'InputOutputAzure2019': azur19 + 'InputOutput.svg',
			'InstallVisualStudioAzure2019': azur19 + 'InstallVisualStudio.svg',
			'IntegrationAccountsAzure2019': azur19 + 'Integration_Accounts.svg',
			'IntegrationServiceEnvironmentsAzure2019': azur19 + 'Integration_Service_Environments.svg',
			'IntuneAppProtectionAzure2019': azur19 + 'Intune_App_Protection.svg',
			'IntuneAzure2019': azur19 + 'Intune_App_Protection.svg',
			'IOTedgeAzure2019': azur19 + 'IOT_edge.svg',
			'JobAzure2019': azur19 + 'Job.svg',
			'JourneyHubAzure2019': azur19 + 'JourneyHub.svg',
			'KeyVaultsAzure2019': azur19 + 'Key_Vaults.svg',
			'SubscriptionsAzure2019': azur19 + 'Key.svg',
			'KeyboardShortcutsAzure2019': azur19 + 'KeyboardShortcuts.svg',
			'KeyVaultAzure2019': azur19 + 'KeyVault.svg',
			'KubernetesServicesAzure2019': azur19 + 'Kubernetes_Services.svg',
			'KubernetesAzure2019': azur19 + 'Kubernetes.svg',
			'KuduKnifeAzure2019': azur19 + 'KuduKnife.svg',
			'LaunchPortalAzure2019': azur19 + 'LaunchPortal.svg',
			'LoadBalancersAzure2019': azur19 + 'Load_Balancer_feature.svg',
			'LoadTestAzure2019': azur19 + 'LoadTest.svg',
			'LocalNetworkGatewaysAzure2019': azur19 + 'Local_Network_Gateways.svg',
			'LocalNetworkAzure2019': azur19 + 'LocalNetwork.svg',
			'LocationAzure2019': azur19 + 'Location.svg',
			'LogAnalyticsWorkspacesAzure2019': azur19 + 'Log_Analytics_Workspaces.svg',
			'ActivityLogAzure2019': azur19 + 'Log.svg',
			'DiagnosticSettingsAzure2019': azur19 + 'LogDiagnostics.svg',
			'LogicAppsCustomConnectorAzure2019': azur19 + 'Logic_Apps_Custom_Connector.svg',
			'LogicAppsAzure2019': azur19 + 'Logic_Apps.svg',
			'LogStreamingAzure2019': azur19 + 'LogStreaming.svg',
			'MachineLearningServiceWorkspacesAzure2019': azur19 + 'Machine_Learning_Service_Workspaces.svg',
			'MachineLearningStudioWebServicePlansAzure2019': azur19 + 'Machine_Learning_Studio_Web_Service_Plans.svg',
			'MachineLearningStudioWebServicesAzure2019': azur19 + 'Machine_Learning_Studio_Web_Services.svg',
			'MachineLearningStudioWorkspacesAzure2019': azur19 + 'Machine_Learning_Studio_Workspaces.svg',
			'MachineLearningAzure2019': azur19 + 'Machine_Learning.svg',
			'MachineLearningServicePlansAzure2019': azur19 + 'MachineLearningServicePlans.svg',
			'MachineLearningWebServicesAzure2019': azur19 + 'MachineLearningWebServices.svg',
			'MachineLearningWorkspacesAzure2019': azur19 + 'MachineLearningWorkspaces.svg',
			'ManagedApplicationsAzure2019': azur19 + 'Managed_Applications.svg',
			'ManagedDatabasesAzure2019': azur19 + 'Managed_Databases.svg',
			'ManagedDesktopAzure2019': azur19 + 'Managed_Desktop.svg',
			'ManagedIdentitiesAzure2019': azur19 + 'Managed_Identities.svg',
			'ManagedApplicationsAzure2019_': azur19 + 'ManagedApplications.svg',
			'ManagementGroupsAzure2019': azur19 + 'Management_Groups.svg',
			'ManagementPortalAzure2019': azur19 + 'Management_Portal.svg',
			'ManagePortalAzure2019': azur19 + 'ManagePortal.svg',
			'DiskSnapshotsAzure2019': azur19 + 'MD_snapshot.svg',
			'MediaEncodingAzure2019': azur19 + 'Media_Encoding.svg',
			'MediaOnDemandAzure2019': azur19 + 'Media_On_Demand.svg',
			'MediaServicesAzure2019': azur19 + 'Media_Services.svg',
			'AzureMediaServicesAzure2019': azur19 + 'Media_Services.svg',
			'MediaFileAzure2019': azur19 + 'MediaFile.svg',
			'MigrationProjectsAzure2019': azur19 + 'Migration_Projects.svg',
			'AzureMobileEngagementAzure2019': azur19 + 'Mobile_Engagement.svg',
			'ModuleAzure2019': azur19 + 'Module.svg',
			'MonitorAzure2019': azur19 + 'Monitor.svg',
			'MonitoringAzure2019': azur19 + 'Monitoring.svg',
			'MultiFactorAuthenticationAzure2019': azur19 + 'Multi_Factor_Authentication.svg',
			'MySQLClearDBdatabaseAzure2019': azur19 + 'MySQL_ClearDB_database.svg',
			'NetworkSecurityGroupsClassicAzure2019': azur19 + 'Network_Security_Groups_Classic.svg',
			'NetworkWatcherAzure2019': azur19 + 'Network_watcher.svg',
			'NetworkInterfacesAzure2019': azur19 + 'NetworkInterfaceCard.svg',
			'NewAzure2019': azur19 + 'New.svg',
			'NextBillAzure2019': azur19 + 'NextBill.svg',
			'NonAzureMachineAzure2019': azur19 + 'Non_Azure_Machine.svg',
			'NotificationHubsAzure2019': azur19 + 'Notification_Hubs.svg',
			'NotificationHubNamespacesAzure2019': azur19 + 'Notification_Hubs.svg',
			'AlertsAzure2019': azur19 + 'Notification.svg',
			'NSGAzure2019': azur19 + 'NSG.svg',
			'OfferAzure2019': azur19 + 'Offer.svg',
			'OnPremisesDataGatewaysAzure2019': azur19 + 'On_Premises_Data_Gateways.svg',
			'OnPremiseSetupAzure2019': azur19 + 'OnPremiseSetup.svg',
			'AzureOpenShiftAzure2019': azur19 + 'OpenShift.svg',
			'OperationsManagementSuiteAzure2019': azur19 + 'Operations_Management_Suite.svg',
			'OSImagesClassicAzure2019': azur19 + 'OS_Images_Classic.svg',
			'OutboundNATAzure2019': azur19 + 'OutboundNAT.svg',
			'OutboundRuleAzure2019': azur19 + 'OutboundRule.svg',
			'OutputAzure2019': azur19 + 'Output.svg',
			'overageCostsAzure2019': azur19 + 'overageCosts.svg',
			'PausedAzure2019': azur19 + 'Paused.svg',
			'PeeringsAzure2019': azur19 + 'Peerings.svg',
			'PendingAzure2019': azur19 + 'Pending.svg',
			'UserIconAzure2019': azur19 + 'Person.svg',
			'PersonWithFriendAzure2019': azur19 + 'PersonWithFriend.svg',
			'PhoneAzure2019': azur19 + 'Phone.svg',
			'PluralsightAzure2019': azur19 + 'PluralSight_mono.svg',
			'PolicyAzure2019': azur19 + 'Policy.svg',
			'PortalCurrentAzure2019': azur19 + 'PortalCurrent.svg',
			'PostponeAzure2019': azur19 + 'Postpone.svg',
			'PowerAzure2019': azur19 + 'Power.svg',
			'PowershellAzure2019': azur19 + 'Powershell.svg',
			'PowerUp2Azure2019': azur19 + 'PowerUp_2.svg',
			'PowerUpAzure2019': azur19 + 'PowerUp.svg',
			'PreviewRightAzure2019': azur19 + 'PreviewRight.svg',
			'ProbeAzure2019': azur19 + 'Probe.svg',
			'ProcessExplorerAzure2019': azur19 + 'ProcessExplorer.svg',
			'ProductionReadyDBAzure2019': azur19 + 'ProductionReadyDB.svg',
			'PublishAzure2019': azur19 + 'Publish.svg',
			'PullRequestAzure2019': azur19 + 'PullRequest.svg',
			'QSDiagnosticsAzure2019': azur19 + 'QSDiagnostics.svg',
			'QSFileAzure2019': azur19 + 'QSFile.svg',
			'QSMailAzure2019': azur19 + 'QSMail.svg',
			'QSWarningAzure2019': azur19 + 'QSWarning.svg',
			'QueuedAzure2019': azur19 + 'Queued.svg',
			'QueuesStorageAzure2019': azur19 + 'Queues_Storage.svg',
			'QuickStartCenterAzure2019': azur19 + 'Quick_Start_Center.svg',
			'QuickstartAzure2019': azur19 + 'Quickstart.svg',
			'QuotaAzure2019': azur19 + 'Quota.svg',
			'RainAzure2019': azur19 + 'Rain.svg',
			'RDMAAzure2019': azur19 + 'RDMA.svg',
			'RecommendationAzure2019': azur19 + 'Recommendation.svg',
			'RemoteAppAzure2019': azur19 + 'RemoteApp.svg',
			'ReservationsAzure2019': azur19 + 'Reservations.svg',
			'ResourceExplorerAzure2019': azur19 + 'Resource_Explorer.svg',
			'ResourceGraphExplorerAzure2019': azur19 + 'Resource_Graph_Explorer.svg',
			'ResourceGroupsAzure2019': azur19 + 'Resource_Groups.svg',
			'ResourceDefaultAzure2019': azur19 + 'ResourceDefault.svg',
			'ResourceGroupAzure2019': azur19 + 'ResourceGroup.svg',
			'ResourceLinkedAzure2019': azur19 + 'ResourceLinked.svg',
			'ResourceProviderAzure2019': azur19 + 'ResourceProvider.svg',
			'ResourceRoleAzure2019': azur19 + 'ResourceRole.svg',
			'RouteFiltersAzure2019': azur19 + 'Route_Filter.svg',
			'RuleAzure2019': azur19 + 'Rule.svg',
			'RunbooksAzure2019': azur19 + 'Runbooks.svg',
			'RunbookSourceAzure2019': azur19 + 'RunbookSource.svg',
			'SAPHANAonAzureAzure2019': azur19 + 'SAP_HANA_on_Azure.svg',
			'ScaleAzure2019': azur19 + 'Scale.svg',
			'ScaleAltAzure2019': azur19 + 'ScaleAlt.svg',
			'SchedulerJobAzure2019': azur19 + 'SchedulerJob.svg',
			'SchedulerJobCollectionsAzure2019': azur19 + 'SchedulerJobCollection.svg',
			'SDKAzure2019': azur19 + 'SDK.svg',
			'SearchAzure2019': azur19 + 'Search.svg',
			'AzureSearchAzure2019': azur19 + 'Search.svg',
			'SearchGridAzure2019': azur19 + 'SearchGrid.svg',
			'SecurityBaselinesAzure2019': azur19 + 'Security_Baselines.svg',
			'ConditionalAccessAzure2019': azur19 + 'Security_Center.svg',
			'SecurityCenterAzure2019': azur19 + 'Security_Center.svg',
			'SendGridAccountsAzure2019': azur19 + 'SendGrid_Accounts.svg',
			'ServerAzure2019': azur19 + 'Server.svg',
			'ServerFarmAzure2019': azur19 + 'ServerFarm.svg',
			'ServerProxyAzure2019': azur19 + 'ServerProxy.svg',
			'serversAndMobileDevicesAzure2019': azur19 + 'serversAndMobileDevices.svg',
			'ServiceBusQueuesAzure2019': azur19 + 'Service_Bus_Queues.svg',
			'AzureServiceBusRelaysAzure2019': azur19 + 'Service_Bus_Relay.svg',
			'ServiceBusTopicsAzure2019': azur19 + 'Service_Bus_Topics.svg',
			'AzureServiceBusAzure2019': azur19 + 'Service_Bus.svg',
			'ServiceCatalogManagedApplicationDefinitionsAzure2019': azur19 + 'Service_Catalog_Managed_Application_Definitions.svg',
			'ServiceEndpointPoliciesAzure2019': azur19 + 'Service_Endpoint_Policies.svg',
			'ServiceFabricClustersAzure2019': azur19 + 'Service_Fabric.svg',
			'ServiceHealthAzure2019': azur19 + 'ServiceHealth.svg',
			'SharedDashboardAzure2019': azur19 + 'Shared_Dashboard.svg',
			'SharedImageGalleriesAzure2019': azur19 + 'Shared_Image_Galleries.svg',
			'ShieldFirewallAzure2019': azur19 + 'ShieldFirewall.svg',
			'SignalRAzure2019': azur19 + 'SignalR.svg',
			'SiteRecoveryAzure2019': azur19 + 'Site_Recovery.svg',
			'SoftwareasaServiceSaaSAzure2019': azur19 + 'Software_as_a_Service.svg',
			'SoftwareUpdateAzure2019': azur19 + 'Software_Update.svg',
			'SolutionsAzure2019': azur19 + 'Solutions.svg',
			'SpatialAnchorAzure2019': azur19 + 'Spatial_Anchor.svg',
			'SQLDatabasesAzure2019': azur19 + 'SQL_Database_generic.svg',
			'AzureSQLDataWarehouseAzure2019': azur19 + 'SQL_DataWarehouse.svg',
			'SQLManagedInstancesAzure2019': azur19 + 'SQL_Managed_Instances.svg',
			'SQLServersAzure2019': azur19 + 'SQL_Servers.svg',
			'SQLStretchDatabaseAzure2019': azur19 + 'SQL_Stretch_Database.svg',
			'SQLServerStretchDatabasesAzure2019': azur19 + 'dep/SQL_Server_Stretch_DB.svg',
			'SQLQueryPerformanceCheckAzure2019': azur19 + 'SQLQueryPerformanceCheck.svg',
			'SSDAzure2019': azur19 + 'SSD.svg',
			'StackOverflowAzure2019': azur19 + 'StackOverflow.svg',
			'StorageAccountsAzure2019': azur19 + 'Storage_Accounts.svg',
			'StorageExplorerAzure2019': azur19 + 'Storage_Explorer.svg',
			'StorageSyncServicesAzure2019': azur19 + 'Storage_sync_service.svg',
			'StorageAzure2019': azur19 + 'Storage.svg',
			'StorageAzureFilesAzure2019': azur19 + 'StorageAzureFiles.svg',
			'StorageContainerAzure2019': azur19 + 'StorageContainer.svg',
			'StorageQueueAzure2019': azur19 + 'StorageQueue.svg',
			'StorageReplicaAzure2019': azur19 + 'StorageReplica.svg',
			'MarketplaceAzure2019': azur19 + 'Store_Marketplace.svg',
			'StorSimpleDataManagersAzure2019': azur19 + 'StorSimple_Data_Managers.svg',
			'AzureStorSimpleDeviceManagersAzure2019': azur19 + 'StorSimple.svg',
			'StorSimpleDeviceManagersAzure2019': azur19 + 'StorSimple.svg',
			'StreamAnalyticsJobsAzure2019': azur19 + 'Stream_Analytics.svg',
			'SubnetAzure2019': azur19 + 'Subnet.svg',
			'HelpSupportAzure2019': azur19 + 'Support_2.svg',
			'SupportRequestsAzure2019': azur19 + 'Support_Requests.svg',
			'SupportAzure2019': azur19 + 'Support.svg',
			'TableStorageAzure2019': azur19 + 'Table_Storage.svg',
			'TagAzure2019': azur19 + 'Tag.svg',
			'TagsAzure2019': azur19 + 'Tags.svg',
			'TaskAzure2019': azur19 + 'Task.svg',
			'TasksAzure2019': azur19 + 'Tasks.svg',
			'TasksPolychromaticAzure2019': azur19 + 'TasksPolychromatic.svg',
			'TaskVMAzure2019': azur19 + 'TaskVM.svg',
			'TaxAzure2019': azur19 + 'Tax.svg',
			'TeamProjectAzure2019': azur19 + 'TeamProject.svg',
			'TemplatesAzure2019': azur19 + 'Templates.svg',
			'TenantStatusAzure2019': azur19 + 'Tenant_Status.svg',
			'TFSVCRepositoryAzure2019': azur19 + 'TFSVCRepository.svg',
			'AzureTimeSeriesInsightsEnvironmentsAzure2019': azur19 + 'Time_Series_Insights_environments.svg',
			'TimeSeriesInsightsAzure2019': azur19 + 'TimeSeriesInsights.svg',
			'ToolboxAzure2019': azur19 + 'Toolbox.svg',
			'ToolsAzure2019': azur19 + 'Tools.svg',
			'TrafficManagerProfilesAzure2019': azur19 + 'Traffic_Manager.svg',
			'TrafficManagerDisabledAzure2019': azur19 + 'TrafficManagerDisabled.svg',
			'TrafficManagerEnabledAzure2019': azur19 + 'TrafficManagerEnabled.svg',
			'TwoUserIconAzure2019': azur19 + 'Two_User_Icon.svg',
			'UnidentifiedFeatureObjectAzure2019': azur19 + 'Unidentified_Feature_Object.svg',
			'UserHealthIconAzure2019': azur19 + 'User_Health_Icon.svg',
			'UserPrivacyAzure2019': azur19 + 'User_Privacy.svg',
			'UserResourceAzure2019': azur19 + 'User_Resource.svg',
			'RouteTablesAzure2019': azur19 + 'UserDefinedRoute.svg',
			'VariablesAzure2019': azur19 + 'Variables.svg',
			'VersionsAzure2019': azur19 + 'Versions.svg',
			'VirtualClustersAzure2019': azur19 + 'Virtual_Clusters.svg',
			'VirtualDatacenterAzure2019': azur19 + 'Virtual_Datacenter.svg',
			'VMClassicAzure2019': azur19 + 'Virtual_Machine_2.svg',
			'VMAzure2019': azur19 + 'Virtual_Machine.svg',
			'AvailabilitySetsAzure2019': azur19 + 'Virtual_Machines_Availability_Set.svg',
			'VirtualMachinesLinuxAzure2019': azur19 + 'Virtual_Machines_Linux.svg',
			'VirtualNetworkClassicAzure2019': azur19 + 'Virtual_Network_Classic.svg',
			'VirtualNetworksAzure2019': azur19 + 'Virtual_Network.svg',
			'VirtualWANsAzure2019': azur19 + 'Virtual_WANs.svg',
			'VirtualMachineLinuxAzure2019': azur19 + 'VirtualMachineLinux.svg',
			'VMWindowsAzure2019': azur19 + 'VirtualMachineWindows.svg',
			'VisualStudioTeamServicesCodePlexsourceAzure2019': azur19 + 'Visual_Studio_Team_Services_CodePlex_source.svg',
			'VMImagesAzure2019': azur19 + 'VM_Images.svg',
			'VMLinuxNonAzureAzure2019': azur19 + 'VM_Linux_Non_Azure.svg',
			'VMLinuxAzure2019': azur19 + 'VM_Linux.svg',
			'VMScaleSetsAzure2019': azur19 + 'VM_Scale_Set.svg',
			'VMWindowsNonAzureAzure2019': azur19 + 'VM_Windows_Non_Azure.svg',
			'VMScaleAzure2019': azur19 + 'VMScale.svg',
			'VirtualNetworkGatewaysAzure2019': azur19 + 'VPN_Gateway.svg',
			'VPNPointToSiteAzure2019': azur19 + 'VPNPointToSite.svg',
			'VPNSiteToSiteAzure2019': azur19 + 'VPNSiteToSite.svg',
			'WebAppFirewallAzure2019': azur19 + 'Web_App_Firewall.svg',
			'WebAppWebJobsAzure2019': azur19 + 'WebApp_WebJobs.svg',
			'UmbracoAzure2019': azur19 + 'WebAppUmbraco.svg',
			'WordPressAzure2019': azur19 + 'WebAppWordPress.svg',
			'WebEnvironmentAzure2019': azur19 + 'WebEnvironment.svg',
			'WebhooksAzure2019': azur19 + 'Webhooks.svg',
			'WebHostingAzure2019': azur19 + 'WebHosting.svg',
			'AppServicePlansAzure2019': azur19 + 'WebHosting.svg',
			'WebNetworkAzure2019': azur19 + 'WebNetwork.svg',
			'WebsitePowerAzure2019': azur19 + 'WebsitePower.svg',
			'WebsiteReplicatorAzure2019': azur19 + 'WebsiteReplicator.svg',
			'WebsiteSettingsAzure2019': azur19 + 'WebsiteSettings.svg',
			'WebsiteStagingAzure2019': azur19 + 'WebsiteStaging.svg',
			'WebSlotsAzure2019': azur19 + 'WebSlots.svg',
			'WebTestAzure2019': azur19 + 'WebTest.svg',
			'Windows10IoTCoreServicesAzure2019': azur19 + 'Windows_10_IoT_Core_Services.svg',
			'WorkflowAzure2019': azur19 + 'Workflow.svg',
			'WrenchAzure2019': azur19 + 'Wrench.svg',
			'XboxControllerAzure2019': azur19 + 'XboxController.svg',
			'HockeyAppAzure2019' : 'shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.mscae.cloud.hockeyapp;fillColor=#0079D6;pointerEvents=1',
			'AppServiceLogicAppAzure2019': azur19 + 'dep/App_Service_Logic_App.svg',
			//'ApplicationGatewayAzure2019': azur19 + 'dep/Application_Gateway.svg',
			'ContentDeliveryNetworkAzure2019': azur19 + 'dep/Content_Delivery_Network.svg',
			//'DataLakeAnalyticsAzure2019': azur19 + 'dep/Data_Lake_Analytics.svg',
			'DataLakeStoreAzure2019': azur19 + 'dep/Data_Lake_Store.svg',
			//'DataLakeAzure2019': azur19 + 'dep/Data_Lake.svg',
			//'DataWarehouseAzure2019': azur19 + 'dep/DataWarehouse.svg',
			'AzureInformationProtectionAzure2019' : 'aspect=fixed;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.mscae.cloud.azure_rights_management_rms;fillColor=#58B4D9;',
			'IoTCentralApplicationsAzure2019' : 'aspect=fixed;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.mscae.cloud.central;fillColor=#0079D6;pointerEvents=1',
			
//Cisco Basic
			'Cisco_cisco_androgenous_person' : s + 'cisco.people.androgenous_person;' + c,
			'Cisco_cisco_atm_switch' : s + 'cisco.switches.atm_switch;' + c,
			'Cisco_cisco_cloud' : s + 'cisco.storage.cloud;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=#036897;fillColor=#ffffff',
			'Cisco_cisco_fileserver' : s + 'cisco.servers.fileserver;' + c,
			'Cisco_cisco_firewall' : s + 'cisco.security.firewall;' + c,
			'Cisco_cisco_generic_building' : s + 'cisco.buildings.generic_building;' + c,
			'Cisco_cisco_laptop' : s + 'cisco.computers_and_peripherals.laptop;' + c,
			'Cisco_cisco_lock' : s + 'cisco.security.lock;' + c,
			'Cisco_cisco_microwebserver' : s + 'cisco.servers.microwebserver;' + c,
			'Cisco_cisco_pc' : s + 'cisco.computers_and_peripherals.pc;' + c,
			'Cisco_cisco_pda' : s + 'cisco.misc.pda;' + c,
			'Cisco_cisco_phone' : s + 'cisco.modems_and_phones.hootphone;' + c,
			'Cisco_cisco_printer' : s + 'cisco.computers_and_peripherals.printer;' + c,
			'Cisco_cisco_relational_database' : s + 'cisco.storage.relational_database;' + c,
			'Cisco_cisco_router' : s + 'cisco.routers.router;' + c,
			'Cisco_cisco_standing_man' : s + 'cisco.people.standing_man;' + c,
			'Cisco_cisco_standing_woman' : s + 'cisco.people.standing_woman;' + c,
			'Cisco_cisco_ups' : s + 'cisco.misc.ups;' + c,
			'Cisco_cisco_wireless_router' : s + 'cisco.routers.wireless_router;' + c,
//Cisco Extended
			'Cisco_cisco_100baset_hub' : s + 'cisco.hubs_and_gateways.100baset_hub;' + c,
			'Cisco_cisco_10700' : s + 'cisco.routers.10700;' + c,
			'Cisco_cisco_10GE_FCoE' : s + 'cisco.controllers_and_modules.10ge_fcoe;' + c,
			'Cisco_cisco_15200' : s + 'cisco.misc.15200;' + c,
			'Cisco_cisco_3174__desktop_' : s + 'cisco.controllers_and_modules.3174_(desktop)_cluster_controller;' + c,
			'Cisco_cisco_3200_mobile_access_router' : s + 'cisco.routers.mobile_access_router;' + c,
			'Cisco_cisco_3x74__floor_' : s + 'cisco.controllers_and_modules.3x74_(floor)_cluster_controller;' + c,
			'Cisco_cisco_6700_series' : s + 'cisco.misc.6700_series;' + c,
			'Cisco_cisco_7500ars__7513_' : s + 'cisco.misc.7500ars_(7513);' + c,
//			'Cisco_cisco_access_gateway' NA
			'Cisco_cisco_accesspoint' : s + 'cisco.misc.access_point;' + c,
			'Cisco_cisco_ace' : s + 'cisco.misc.ace;' + c,
			'Cisco_cisco_ACS' : s + 'cisco.misc.acs;' + c,
			'Cisco_cisco_adm' : s + 'cisco.misc.adm;' + c,
			'Cisco_cisco_antenna' : s + 'cisco.wireless.antenna;' + c,
			'Cisco_cisco_asic_processor' : s + 'cisco.misc.asic_processor;' + c,
			'Cisco_cisco_ASR_1000_Series' : s + 'cisco.misc.asr_1000_series;' + c,
			'Cisco_cisco_ata' : s + 'cisco.misc.ata;' + c,
			'Cisco_cisco_atm_3800' : s + 'cisco.misc.atm_3800;' + c,
			'Cisco_cisco_atm_fast_gigabit_etherswitch' : s + 'cisco.switches.atm_fast_gigabit_etherswitch;' + c,
			'Cisco_cisco_atm_router' : s + 'cisco.routers.atm_router;' + c,
			'Cisco_cisco_atm_tag_switch_router' : s + 'cisco.routers.atm_tag_switch_router;' + c,
			'Cisco_cisco_avs' : s + 'cisco.misc.avs;' + c,
			'Cisco_cisco_AXP' : s + 'cisco.misc.axp;' + c,
//			'Cisco_cisco_bbfw_media' NA
//			'Cisco_cisco_bbfw' NA
			'Cisco_cisco_bbsm' : s + 'cisco.misc.bbsm;' + c,
			'Cisco_cisco_branch_office' : s + 'cisco.buildings.branch_office;' + c,
			'Cisco_cisco_breakout_box' : s + 'cisco.misc.breakout_box;' + c,
			'Cisco_cisco_bridge' : s + 'cisco.misc.bridge;' + c,
			'Cisco_cisco_broadband_router' : s + 'cisco.routers.broadcast_router;' + c,
			'Cisco_cisco_bts_10200' : s + 'cisco.misc.bts_10200;' + c,
			'Cisco_cisco_cable_modem' : s + 'cisco.modems_and_phones.cable_modem;' + c,
			'Cisco_cisco_callmanager' : s + 'cisco.misc.call_manager;' + c,
			'Cisco_cisco_car' : s + 'cisco.misc.car;' + c,
			'Cisco_cisco_carrier_routing_system' : s + 'cisco.misc.carrier_routing_system;' + c,
			'Cisco_cisco_cddi_fddi' : s + 'cisco.misc.cddi_fddi;' + c,
			'Cisco_cisco_cdm' : s + 'cisco.misc.cdm;' + c,
			'Cisco_cisco_cellular_phone' : s + 'cisco.modems_and_phones.cell_phone;' + c,
			'Cisco_cisco_centri_firewall' : s + 'cisco.security.centri_firewall;' + c,
			'Cisco_cisco_cisco_1000' : s + 'cisco.misc.cisco_1000;' + c,
			'Cisco_cisco_cisco_asa_5500' : s + 'cisco.misc.asa_5500;' + c,
			'Cisco_cisco_cisco_ca' : s + 'cisco.misc.cisco_ca;' + c,
			'Cisco_cisco_cisco_file_engine' : s + 'cisco.storage.cisco_file_engine;' + c,
			'Cisco_cisco_cisco_hub' : s + 'cisco.hubs_and_gateways.cisco_hub;' + c,
			'Cisco_cisco_ciscosecurity' : s + 'cisco.security.cisco_security;' + c,
//			'Cisco_cisco_Cisco_telepresence_manager' NA
			'Cisco_cisco_cisco_unified_presence_server' : s + 'cisco.servers.cisco_unified_presence_server;' + c,
			'Cisco_cisco_cisco_unityexpress' : s + 'cisco.misc.cisco_unity_express;' + c,
			'Cisco_cisco_ciscoworks' : s + 'cisco.misc.cisco_works;' + c,
			'Cisco_cisco_class_4_5_switch' : s + 'cisco.switches.class_4_5_switch;' + c,
			'Cisco_cisco_communications_server' : s + 'cisco.servers.communications_server;' + c,
			'Cisco_cisco_contact_center' : s + 'cisco.misc.contact_center;' + c,
			'Cisco_cisco_content_engine__cache_director_' : s + 'cisco.directors.content_engine_(cache_director);' + c,
			'Cisco_cisco_content_service_router' : s + 'cisco.routers.content_service_router;' + c,
			'Cisco_cisco_content_service_switch_1100' : s + 'cisco.switches.content_service_switch_1100;' + c,
			'Cisco_cisco_content_switch_module' : s + 'cisco.controllers_and_modules.content_switch_module;' + c,
			'Cisco_cisco_content_switch' : s + 'cisco.switches.content_switch;' + c,
			'Cisco_cisco_content_transformation_engine__cte_' : s + 'cisco.misc.content_transformation_engine_(cte);' + c,
			'Cisco_cisco_cs_mars' : s + 'cisco.misc.cs-mars;' + c,
			'Cisco_cisco_csm_s' : s + 'cisco.misc.csm-s;' + c,
			'Cisco_cisco_csu_dsu' : s + 'cisco.misc.csu_dsu;' + c,
			'Cisco_cisco_CUBE' : s + 'cisco.misc.cube;' + c,
			'Cisco_cisco_detector' : s + 'cisco.misc.detector;' + c,
			'Cisco_cisco_director_class_fibre_channel_director' : s + 'cisco.directors.director-class_fibre_channel_director;' + c,
			'Cisco_cisco_directory_server' : s + 'cisco.servers.directory_server;' + c,
			'Cisco_cisco_diskette' : s + 'cisco.storage.diskette;' + c,
			'Cisco_cisco_distributed_director' : s + 'cisco.directors.distributed_director;' + c,
			'Cisco_cisco_dot_dot' : s + 'cisco.misc.dot-dot;' + c,
			'Cisco_cisco_dpt' : s + 'cisco.misc.dpt;' + c,
			'Cisco_cisco_dslam' : s + 'cisco.misc.dslam;' + c,
			'Cisco_cisco_dual_mode_ap' : s + 'cisco.misc.dual_mode;' + c,
			'Cisco_cisco_dwdm_filter' : s + 'cisco.misc.dwdm_filter;' + c,
			'Cisco_cisco_end_office' : s + 'cisco.buildings.end_office;' + c,
			'Cisco_cisco_fax' : s + 'cisco.modems_and_phones.fax;' + c,
			'Cisco_cisco_fc_storage' : s + 'cisco.storage.fc_storage;' + c,
			'Cisco_cisco_fddi_ring' : s + 'cisco.misc.fddi_ring;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=#036897;',
			'Cisco_cisco_fibre_channel_disk_subsystem' : s + 'cisco.storage.fibre_channel_disk_subsystem;' + c,
			'Cisco_cisco_fibre_channel_fabric_switch' : s + 'cisco.switches.fibre_channel_fabric_switch;' + c,
			'Cisco_cisco_file_cabinet' : s + 'cisco.storage.file_cabinet;' + c,
			'Cisco_cisco_file_server' : s + 'cisco.servers.file_server;' + c,
			'Cisco_cisco_firewall_service_module__fwsm_' : s + 'cisco.controllers_and_modules.firewall_service_module_(fwsm);' + c,
			'Cisco_cisco_front_end_processor' : s + 'cisco.misc.front_end_processor;' + c,
			'Cisco_cisco_gatekeeper' : s + 'cisco.security.gatekeeper;strokeColor=#036897;',
			'Cisco_cisco_general_applicance' : s + 'cisco.misc.general_appliance;' + c,
			'Cisco_cisco_generic_gateway' : s + 'cisco.hubs_and_gateways.generic_gateway;' + c,
			'Cisco_cisco_generic_processor' : s + 'cisco.misc.generic_processor;' + c,
			'Cisco_cisco_generic_softswitch' : s + 'cisco.switches.generic_softswitch;' + c,
			'Cisco_cisco_gigabit_switch_atm_tag_router' : s + 'cisco.routers.gigabit_switch_atm_tag_router;' + c,
			'Cisco_cisco_government_building' : s + 'cisco.buildings.government_building;' + c,
			'Cisco_cisco_Ground_terminal' : s + 'cisco.wireless.ground_terminal;' + c,
			'Cisco_cisco_guard' : s + 'cisco.security.guard;' + c,
			'Cisco_cisco_handheld' : s + 'cisco.misc.handheld;' + c,
			'Cisco_cisco_hootphone' : s + 'cisco.modems_and_phones.hootphone;' + c,
			'Cisco_cisco_host' : s + 'cisco.servers.host;' + c,
			'Cisco_cisco_hp_mini' : s + 'cisco.misc.hp_mini;' + c,
			'Cisco_cisco_h' : s + 'cisco.misc.h_323;' + c,
			'Cisco_cisco_hub' : s + 'cisco.hubs_and_gateways.hub;' + c,
			'Cisco_cisco_iad_router' : s + 'cisco.routers.iad_router;' + c,
			'Cisco_cisco_ibm_mainframe' : s + 'cisco.computers_and_peripherals.ibm_mainframe;' + c,
			'Cisco_cisco_ibm_mini_as400' : s + 'cisco.computers_and_peripherals.ibm_mini_as400;' + c,
			'Cisco_cisco_ibm_tower' : s + 'cisco.computers_and_peripherals.ibm_tower;' + c,
			'Cisco_cisco_icm' : s + 'cisco.misc.icm;' + c,
			'Cisco_cisco_ics' : s + 'cisco.misc.ics;' + c,
			'Cisco_cisco_intelliswitch_stack' : s + 'cisco.switches.intelliswitch_stack;' + c,
			'Cisco_cisco_ios_firewall' : s + 'cisco.security.ios_firewall;' + c,
			'Cisco_cisco_ios_slb' : s + 'cisco.misc.ios_slb;' + c,
			'Cisco_cisco_ip_communicator' : s + 'cisco.misc.ip_communicator;' + c,
			'Cisco_cisco_ip_dsl' : s + 'cisco.misc.ip_dsl;' + c,
			'Cisco_cisco_ip_phone' : s + 'cisco.modems_and_phones.ip_phone;' + c,
			'Cisco_cisco_ip' : s + 'cisco.misc.ip;' + c,
			'Cisco_cisco_iptc' : s + 'cisco.misc.iptc;' + c,
			'Cisco_cisco_ip_telephony_router' : s + 'cisco.routers.ip_telephony_router;' + c,
			'Cisco_cisco_iptv_content_manager' : s + 'cisco.misc.iptv_content_manager;' + c,
			'Cisco_cisco_iptv_server' : s + 'cisco.servers.iptv_server;' + c,
			'Cisco_cisco_iscsi_router' : s + 'cisco.routers.isci_router;' + c,
			'Cisco_cisco_isdn_switch' : s + 'cisco.switches.isdn_switch;' + c,
			'Cisco_cisco_itp' : s + 'cisco.misc.itp;' + c,
			'Cisco_cisco_jbod' : s + 'cisco.misc.jbod;' + c,
			'Cisco_cisco_key' : s + 'cisco.misc.key;' + c,
			'Cisco_cisco_keys' : s + 'cisco.misc.keys;' + c,
			'Cisco_cisco_lan_to_lan' : s + 'cisco.misc.lan_to_lan;' + c,
			'Cisco_cisco_layer_2_remote_switch' : s + 'cisco.switches.layer_2_remote_switch;' + c,
			'Cisco_cisco_layer_3_switch' : s + 'cisco.switches.layer_3_switch;' + c,
			'Cisco_cisco_lightweight_ap' : s + 'cisco.misc.lightweight_ap;' + c,
			'Cisco_cisco_localdirector' : s + 'cisco.directors.localdirector;' + c,
			'Cisco_cisco_longreach_cpe' : s + 'cisco.misc.longreach_cpe;' + c,
			'Cisco_cisco_macintosh' : s + 'cisco.computers_and_peripherals.macintosh;' + c,
			'Cisco_cisco_mac_woman' : s + 'cisco.people.mac_woman;' + c,
			'Cisco_cisco_man_woman' : s + 'cisco.people.man_woman;' + c,
			'Cisco_cisco_mas_gateway' : s + 'cisco.hubs_and_gateways.mas_gateway;' + c,
			'Cisco_cisco_mau' : s + 'cisco.misc.mau;' + c,
			'Cisco_cisco_mcu' : s + 'cisco.misc.mcu;' + c,
			'Cisco_cisco_mdu' : s + 'cisco.buildings.mdu;' + c,
			'Cisco_cisco_me_1100' : s + 'cisco.misc.me1100;' + c,
			'Cisco_cisco_Mediator' : s + 'cisco.misc.mediator;' + c,
			'Cisco_cisco_meetingplace' : s + 'cisco.misc.meetingplace;' + c,
			'Cisco_cisco_mesh_ap' : s + 'cisco.misc.mesh_ap;' + c,
			'Cisco_cisco_metro_1500' : s + 'cisco.misc.metro_1500;' + c,
			'Cisco_cisco_mgx_8000_multiservice_switch' : s + 'cisco.switches.mgx_8000_multiservice_switch;' + c,
			'Cisco_cisco_microphone' : s + 'cisco.computers_and_peripherals.microphone;' + c,
			'Cisco_cisco_mini_vax' : s + 'cisco.misc.mini_vax;' + c,
			'Cisco_cisco_mobile_access_ip_phone' : s + 'cisco.modems_and_phones.mobile_access_ip_phone;' + c,
			'Cisco_cisco_mobile_access_router' : s + 'cisco.routers.mobile_access_router;' + c,
			'Cisco_cisco_modem' : s + 'cisco.modems_and_phones.modem;' + c,
			'Cisco_cisco_moh_server' : s + 'cisco.servers.moh_server;' + c,
			'Cisco_cisco_MSE' : s + 'cisco.misc.mse;' + c,
			'Cisco_cisco_mulitswitch_device' : s + 'cisco.switches.multiswitch_device;' + c,
			'Cisco_cisco_multi_fabric_server_switch' : s + 'cisco.switches.multi-fabric_server_switch;' + c,
			'Cisco_cisco_multilayer_remote_switch' : s + 'cisco.switches.multilayer_remote_switch;' + c,
			'Cisco_cisco_mux' : s + 'cisco.misc.mux;' + c,
			'Cisco_cisco_MXE' : s + 'cisco.misc.mxe;' + c,
			'Cisco_cisco_nac_appliance' : s + 'cisco.misc.nac_appliance;' + c,
			'Cisco_cisco_NCE' : s + 'cisco.misc.nce;' + c,
			'Cisco_cisco_NCE_router' : s + 'cisco.routers.nce_router;' + c,
			'Cisco_cisco_netflow_router' : s + 'cisco.routers.netflow_router;' + c,
			'Cisco_cisco_netranger' : s + 'cisco.misc.netranger;' + c,
			'Cisco_cisco_netsonar' : s + 'cisco.misc.netsonar;' + c,
			'Cisco_cisco_network_management' : s + 'cisco.misc.network_management;' + c,
			'Cisco_cisco_Nexus_1000' : s + 'cisco.misc.nexus_1000;' + c,
			'Cisco_cisco_Nexus_2000' : s + 'cisco.misc.nexus_2000_fabric_extender;' + c,
			'Cisco_cisco_Nexus_5000' : s + 'cisco.misc.nexus_5000;' + c,
			'Cisco_cisco_Nexus_7000' : s + 'cisco.misc.nexus_7000;' + c,
			'Cisco_cisco_octel' : s + 'cisco.misc.octel;' + c,
			'Cisco_cisco_ons15500' : s + 'cisco.misc.ons15500;' + c,
			'Cisco_cisco_optical_amplifier' : s + 'cisco.misc.optical_amplifier;' + c,
			'Cisco_cisco_optical_services_router' : s + 'cisco.routers.optical_services_router;' + c,
			'Cisco_cisco_optical_transport' : s + 'cisco.misc.optical_transport;' + c,
			'Cisco_cisco_pad' : s + 'cisco.misc.pad_2;' + c,
			'Cisco_cisco_pad_x' : s + 'cisco.misc.pad_1;' + c,
			'Cisco_cisco_page_icon' : s + 'cisco.misc.page_icon;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=#036897;',
			'Cisco_cisco_pbx' : s + 'cisco.misc.pbx;' + c,
			'Cisco_cisco_pbx_switch' : s + 'cisco.switches.pbx_switch;' + c,
			'Cisco_cisco_pc_adapter_card' : s + 'cisco.computers_and_peripherals.pc_adapter_card;' + c,
			'Cisco_cisco_pc_man' : s + 'cisco.people.pc_man;' + c,
			'Cisco_cisco_pc_routercard' : s + 'cisco.computers_and_peripherals.pc_routercard;' + c,
			'Cisco_cisco_pc_software' : s + 'cisco.misc.pc_software;' + c,
			'Cisco_cisco_pc_video' : s + 'cisco.misc.pc_video;' + c,
			'Cisco_cisco_phone_fax' : s + 'cisco.modems_and_phones.phone-fax;' + c,
			'Cisco_cisco_pix_firewall' : s + 'cisco.security.pix_firewall;' + c,
			'Cisco_cisco_pmc' : s + 'cisco.misc.pmc;' + c,
			'Cisco_cisco_programmable_switch' : s + 'cisco.switches.programmable_switch;' + c,
			'Cisco_cisco_protocol_translator' : s + 'cisco.misc.protocol_translator;' + c,
			'Cisco_cisco_pxf' : s + 'cisco.misc.pxf;' + c,
			'Cisco_cisco_radio_tower' : s + 'cisco.wireless.radio_tower;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=#036897',
			'Cisco_cisco_ratemux' : s + 'cisco.misc.ratemux;' + c,
			'Cisco_cisco_repeater' : s + 'cisco.misc.repeater;' + c,
			'Cisco_cisco_RF_modem' : s + 'cisco.modems_and_phones.rf_modem;' + c,
			'Cisco_cisco_router_firewall' : s + 'cisco.security.router_firewall;' + c,
			'Cisco_cisco_routerin_building' : s + 'cisco.routers.router_in_building;' + c,
			'Cisco_cisco_router_with_silicon_switch' : s + 'cisco.routers.router_with_silicon_switch;' + c,
			'Cisco_cisco_route_switch_processor' : s + 'cisco.misc.route_switch_processor;' + c,
			'Cisco_cisco_rpsrps' : s + 'cisco.misc.rpsrps;' + c,
			'Cisco_cisco_running_man' : s + 'cisco.people.running_man;' + c,
			'Cisco_cisco_sattelite_dish' : s + 'cisco.wireless.satellite_dish;' + c,
			'Cisco_cisco_sattelite' : s + 'cisco.wireless.satellite;' + c,
			'Cisco_cisco_scanner' : s + 'cisco.computers_and_peripherals.scanner;' + c,
			'Cisco_cisco_server_switch' : s + 'cisco.switches.server_switch;' + c,
			'Cisco_cisco_server_with_router' : s + 'cisco.servers.server_with_router;' + c,
			'Cisco_cisco_service_control' : s + 'cisco.misc.service_control;' + c,
			'Cisco_cisco_Service_Module' : s + 'cisco.controllers_and_modules.service_module;' + c,
			'Cisco_cisco_Service_router' : s + 'cisco.routers.service_router;' + c,
			'Cisco_cisco_Services' : s + 'cisco.misc.services;' + c,
			'Cisco_cisco_Set_top_box' : s + 'cisco.misc.set_top_box;' + c,
			'Cisco_cisco_simulitlayer_switch' : s + 'cisco.switches.simultilayer_switch;' + c,
			'Cisco_cisco_sip_proxy_werver' : s + 'cisco.servers.sip_proxy_server;' + c,
			'Cisco_cisco_sitting_woman' : s + 'cisco.people.sitting_woman;' + c,
			'Cisco_cisco_small_business' : s + 'cisco.buildings.small_business;' + c,
			'Cisco_cisco_small_hub' : s + 'cisco.hubs_and_gateways.small_hub;' + c,
			'Cisco_cisco_softphone' : s + 'cisco.modems_and_phones.softphone;' + c,
			'Cisco_cisco_softswitch_pgw_mgc' : s + 'cisco.switches.softswitch_pgw_mgc;' + c,
			'Cisco_cisco_software_based_server' : s + 'cisco.servers.software_based_server;' + c,
//			'Cisco_cisco_Space_router' NA
			'Cisco_cisco_speaker' : s + 'cisco.computers_and_peripherals.speaker;' + c,
			'Cisco_cisco_ssc' : s + 'cisco.misc.ssc;' + c,
			'Cisco_cisco_ssl_terminator' : s + 'cisco.misc.ssl_terminator;' + c,
			'Cisco_cisco_standard_host' : s + 'cisco.servers.standard_host;' + c,
			'Cisco_cisco_stb' : s + 'cisco.misc.stb;' + c,
			'Cisco_cisco_storage_router' : s + 'cisco.routers.storage_router;' + c,
			'Cisco_cisco_storage_server' : s + 'cisco.servers.storage_server;' + c,
			'Cisco_cisco_stp' : s + 'cisco.misc.stp;' + c,
			'Cisco_cisco_streamer' : s + 'cisco.misc.streamer;' + c,
			'Cisco_cisco_sun_workstation' : s + 'cisco.computers_and_peripherals.workstation;' + c,
			'Cisco_cisco_supercomputer' : s + 'cisco.computers_and_peripherals.supercomputer;' + c,
			'Cisco_cisco_svx' : s + 'cisco.misc.svx;' + c,
			'Cisco_cisco_system_controller' : s + 'cisco.controllers_and_modules.system_controller;' + c,
			'Cisco_cisco_tablet' : s + 'cisco.computers_and_peripherals.tablet;' + c,
			'Cisco_cisco_tape_array' : s + 'cisco.storage.tape_array;' + c,
			'Cisco_cisco_tdm_router' : s + 'cisco.routers.tdm_router;' + c,
			'Cisco_cisco_telecommuter_house_pc' : s + 'cisco.buildings.telecommuter_house_pc;' + c,
			'Cisco_cisco_telecommuter_house' : s + 'cisco.buildings.telecommuter_house;' + c,
			'Cisco_cisco_telecommuter_icon' : s + 'cisco.misc.telecommuter_icon;' + c,
//			'Cisco_cisco_Telepresence_1000' NA
//			'Cisco_cisco_Telepresence_3000' NA
			'Cisco_cisco_Telepresence_3200' : s + 'cisco.misc.telepresence;' + c,
//			'Cisco_cisco_Telepresence_500' NA
			'Cisco_cisco_terminal' : s + 'cisco.computers_and_peripherals.terminal;' + c,
			'Cisco_cisco_token' : s + 'cisco.misc.token;verticalLabelPosition=bottom;verticalAlign=top;strokeColor=#036897',
			'Cisco_cisco_TP_MCU' : s + 'cisco.misc.tp_mcu;' + c,
			'Cisco_cisco_transpath' : s + 'cisco.misc.transpath;' + c,
			'Cisco_cisco_truck' : s + 'cisco.misc.truck;' + c,
			'Cisco_cisco_turret' : s + 'cisco.misc.turret;' + c,
			'Cisco_cisco_tv' : s + 'cisco.misc.tv;' + c,
			'Cisco_cisco_ubr910' : s + 'cisco.misc.ubr910;' + c,
			'Cisco_cisco_umg_series' : s + 'cisco.misc.umg_series;' + c,
			'Cisco_cisco_unity_server' : s + 'cisco.servers.unity_server;' + c,
			'Cisco_cisco_universal_gateway' : s + 'cisco.hubs_and_gateways.universal_gateway;' + c,
			'Cisco_cisco_university' : s + 'cisco.buildings.university;' + c,
			'Cisco_cisco_upc' : s + 'cisco.computers_and_peripherals.upc;' + c,
			'Cisco_cisco_vault' : s + 'cisco.misc.vault;' + c,
			'Cisco_cisco_video_camera' : s + 'cisco.computers_and_peripherals.video_camera;' + c,
			'Cisco_cisco_vip' : s + 'cisco.misc.vip;' + c,
			'Cisco_cisco_virtual_layer_switch' : s + 'cisco.switches.virtual_layer_switch;' + c,
			'Cisco_cisco_virtual_switch_controller__vsc3000_' : s + 'cisco.controllers_and_modules.virtual_switch_controller_(vsc3000);' + c,
			'Cisco_cisco_voice_atm_switch' : s + 'cisco.switches.voice_atm_switch;' + c,
			'Cisco_cisco_voice_commserver' : s + 'cisco.servers.voice_commserver;' + c,
			'Cisco_cisco_voice_router' : s + 'cisco.routers.voice_router;' + c,
			'Cisco_cisco_voice_switch' : s + 'cisco.switches.voice_switch;' + c,
			'Cisco_cisco_vpn_concentrator' : s + 'cisco.misc.vpn_concentrator;' + c,
			'Cisco_cisco_vpn_gateway' : s + 'cisco.hubs_and_gateways.vpn_gateway;' + c,
			'Cisco_cisco_VSS' : s + 'cisco.misc.vss;' + c,
			'Cisco_cisco_wae' : s + 'cisco.misc.wae;' + c,
			'Cisco_cisco_wavelength_router' : s + 'cisco.routers.wavelength_router;' + c,
			'Cisco_cisco_web_browser' : s + 'cisco.computers_and_peripherals.web_browser;' + c,
			'Cisco_cisco_web_cluster' : s + 'cisco.storage.web_cluster;' + c,
			'Cisco_cisco_wi_fi_tag' : s + 'cisco.wireless.wi-fi_tag;' + c,
			'Cisco_cisco_wireless_bridge' : s + 'cisco.wireless.wireless_bridge;' + c,
			'Cisco_cisco_wireless_location_appliance' : s + 'cisco.wireless.wireless_location_appliance;' + c,
			'Cisco_cisco_wireless' : s + 'cisco.wireless.wireless;' + c,
			'Cisco_cisco_wireless_transport' : s + 'cisco.wireless.wireless_transport;' + c,
			'Cisco_cisco_wism' : s + 'cisco.misc.wism;' + c,
			'Cisco_cisco_wlan_controller' : s + 'cisco.wireless.wlan_controller;' + c,
			'Cisco_cisco_workgroup_director' : s + 'cisco.directors.workgroup_director;' + c,
			'Cisco_cisco_workgroup_switch' : s + 'cisco.switches.workgroup_switch;' + c,
			'Cisco_cisco_workstation' : s + 'cisco.computers_and_peripherals.workstation;' + c,
			'Cisco_cisco_www_server' : s + 'cisco.servers.www_server;' + c,
//Computers and Monitors
			'NET_PC' : s + 'networks.pc;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Virtual-PC' : s + 'networks.virtual_pc;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Terminal' : s + 'networks.terminal;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_DataPipe' : s + 'networks.bus;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_SlateDevice' : s + 'networks.tablet;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;', 
			'NET_TabletDevice' : s + 'networks.tablet;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Laptop' : s + 'networks.laptop;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_PDA' : s + 'networks.mobile;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_CRTMonitor' : s + 'networks.monitor;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_LCDMonitor' : s + 'networks.monitor;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
//Detailed Network Diagrams
//			'NET_ABSwitch' NA
//			'NET_Repeater' NA
//			'NET_DiagnosticDevice' NA
//			'NET_CardReader' NA
//			'NET_PatchPanel' NA
			'NET_RadioTower' : s + 'networks.radio_tower;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
//			'NET_BiometricReader' NA
			'NET_ExternalHardDrive' : s + 'networks.external_storage;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
//			'NET_WebService' NA
//			'NET_FiberOptic' NA
			'NET_SatelliteDish' : s + 'networks.satellite_dish;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Satellite' : s + 'networks.satellite;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
//			'NET_VoIPPhone' NA
//			'NET_PBX' NA
//			'NET_MLPS' NA
//Basic Network Shapes
			'NET_WirelessAccessPoint' : s + 'networks.radio_tower;fillColor=#29AAE1;strokeColor=#29AAE1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_RingNetwork' : cs,
			'NET_Ethernet' : cs,
			'NET_Server' : s + 'networks.server;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
//			'NET_ExternalMediaDrive' NA
			'NET_Mainframe' : s + 'networks.mainframe;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Router' : s + 'networks.wireless_hub;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Switch' : s + 'networks.switch;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Firewall' : s + 'networks.firewall;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_User' : s + 'networks.user_male;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_CommLink' : s + 'networks.comm_link_edge;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_SuperComputer' : s + 'networks.supercomputer;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_VirtualServer' : s + 'networks.virtual_server;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Printer' : s + 'networks.printer;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
//			'NET_Plotter' NA
			'NET_Scanner' : s + 'networks.scanner;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Copier' : s + 'networks.copier;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
//			'NET_FaxMachine' NA
			'NET_MultiFunctionMachine' : s + 'networks.copier;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Projector' : s + 'networks.video_projector;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_ProjectorScreen' : s + 'networks.video_projector_screen;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Bridge' : s + 'networks.router;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Hub' : s + 'networks.hub;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Modem' : s + 'networks.modem;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_Telephone' : s + 'signs.tech.telephone_5;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_CellPhone' : s + 'networks.mobile;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
			'NET_SmartPhone' : s + 'networks.mobile;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
//			'NET_VideoPhone' NA
			'NET_Camera' : s + 'signs.tech.camera_2;fillColor=#29AAE1;strokeColor=#ffffff;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;',
//			'NET_VideoCamera' NA
//Server Racks
			'RackServerRack' : s + 'rackGeneral.container;childLayout=rack;marginLeft=9;marginRight=9;marginTop=21;marginBottom=22;textColor=#000000;numDisp=off' + containerStyle,
			'RackBlank' : s + 'rackGeneral.plate;strokeColor=#666666;labelPosition=left;align=right;spacingRight=15;fillColor=#e8e8e8',
			'RackRaidArray' : s + 'rack.cisco.cisco_carrier_packet_transport_50;labelPosition=left;align=right;spacingRight=15',
			'RackServer' : s + 'rack.oracle.sunfire_x4100;labelPosition=left;align=right;spacingRight=15',
			'RackEthernetSwitch' : s + 'rack.cisco.cisco_nexus_3016_switch;labelPosition=left;align=right;spacingRight=15',
			'RackPatchPanel' : s + 'rack.general.cat5e_rack_mount_patch_panel_24_ports;strokeColor=#666666;labelPosition=left;align=right;spacingRight=15',
			'RackRouter' : s + 'rack.cisco.cisco_asr_1001_router;labelPosition=left;align=right;spacingRight=15',
			'RackMonitor' : s + 'rack.ibm.ibm_1u_flat_panel_console_kit;labelPosition=left;align=right;spacingRight=15',
			'RackKeyboard' : s + 'rack.cisco.cisco_1905_serial_integrated_services_router;labelPosition=left;align=right;spacingRight=15',
			'RackPowerStrip' : s + 'rack.dell.power_strip;labelPosition=left;align=right;spacingRight=15',
			'RackPowerSupply' : s + 'rack.cisco.cisco_web_security_appliance_s170;labelPosition=left;align=right;spacingRight=15',
			'RackBridge' : s + 'rack.cisco.cisco_nexus_5548p_switch;labelPosition=left;align=right;spacingRight=15',
			'RackTapeDrive' : s + 'rack.ibm.ibm_1754_local_console_manager;labelPosition=left;align=right;spacingRight=15',
//Network
			'Image_network_server' : 'image;image=img/lib/clip_art/computers/Server_Tower_128x128.png;flipH=1',
			'Image_network_server_file' : 'image;image=img/lib/clip_art/computers/Server_128x128.png',
			'Image_network_server_net' : 'image;image=img/lib/clip_art/networking/Print_Server_128x128.png',
			'Image_network_server_net_large' : 'image;image=img/lib/clip_art/computers/Server_128x128.png',
			'Image_network_raid' : 'image;image=img/lib/clip_art/computers/Server_Tower_128x128.png;flipH=1',
			'Image_network_raid_large' : 'image;image=img/lib/clip_art/computers/Server_Tower_128x128.png;flipH=1',
			'Image_network_rack_server' : 'image;image=img/lib/clip_art/computers/Server_Rack_128x128.png',
			'Image_network_rack_tape' : 'image;image=img/lib/clip_art/computers/Server_Rack_Partial_128x128.png',
			'Image_network_printer_small' : 'image;image=img/lib/clip_art/computers/Printer_128x128.png;flipH=1',
			'Image_network_printer_large' : 'image;image=img/lib/clip_art/computers/Printer_128x128.png;flipH=1',
			'Image_network_printer_multipurpose' : 'image;image=img/lib/clip_art/computers/Printer_Commercial_128x128.png;flipH=1',
			'Image_network_copier_small' : 'image;image=img/lib/clip_art/computers/Printer_Commercial_128x128.png',
			'Image_network_copier_large' : 'image;image=img/lib/clip_art/computers/Printer_Commercial_128x128.png',
//			'Image_network_printer_largeformat' NA
			'Image_network_router' : 'image;image=img/lib/clip_art/networking/Router_128x128.png',
			'Image_network_router_wireless' : 'image;image=img/lib/clip_art/networking/Wireless_Router_128x128.png',
			'Image_network_ups' : 'image;image=img/lib/clip_art/networking/UPS_128x128.png',
//Electronics
//			'Image_electronics_speakers_2' NA
//			'Image_electronics_scanner_slide' NA
//			'Image_electronics_speakers_2_1' NA
//			'Image_electronics_speakers_5_1' NA
			'Image_electronics_lcd' : 'image;image=img/lib/clip_art/computers/Monitor_128x128.png',
			'Image_electronics_pda' : 'image;image=img/lib/clip_art/telecommunication/Palm_Treo_128x128.png',
			'Image_electronics_drive_cardreader' : 'image;image=img/lib/clip_art/finance/Credit_Card_128x128.png',
			'Image_electronics_camcorder' : 'image;image=img/lib/clip_art/networking/Ip_Camera_128x128.png',
//			'Image_electronics_headset' NA
//			'Image_electronics_calculator_simple' NA
//			'Image_electronics_scanner_flatbed' NA
			'Image_electronics_printer_photo' : 'image;image=img/lib/clip_art/computers/Printer_128x128.png;flipH=1',
//			'Image_electronics_scanner_photo' NA
//			'Image_electronics_projector' NA
			'Image_electronics_drive_firewire' : 'image;image=img/lib/clip_art/computers/Harddrive_128x128.png;flipH=1',
			'Image_electronics_drive_usb' : 'image;image=img/lib/clip_art/computers/Harddrive_128x128.png;flipH=1',
			'Image_electronics_modem_external' : 'image;image=img/lib/clip_art/networking/Modem_128x128.png;flipH=1',
//			'Image_electronics_tv_tuner_external' NA
//			'Image_electronics_mp3' NA
//			'Image_electronics_sound_box' NA
			'Image_electronics_lcd_wide' : 'image;image=img/lib/clip_art/computers/Monitor_128x128.png',
//Audio Equipment
//			'Image_audio_speakers_2' NA
//			'Image_audio_speakers_2_1' NA
//			'Image_audio_speakers_5_1' NA
//			'Image_audio_record_player' NA
//			'Image_audio_headset' NA
//Electrical
			'EE_Amplifier' : s + 'electrical.abstract.amplifier',
			'EE_OpAmp' : cs,
			'EE_ControlledAmp' : s + 'electrical.abstract.controlled_amplifier',
			'EE_Multiplexer' : 'shape=mxgraph.electrical.abstract.mux2',
			'EE_Demultiplexer' : 'shape=mxgraph.electrical.abstract.mux2;operation=demux',
			'EE_Capacitor1' : s + 'electrical.capacitors.capacitor_1',
			'EE_Capacitor2' : s + 'electrical.capacitors.capacitor_3',
			'EE_Diode' : s + 'electrical.diodes.diode',
			'EE_Resistor' : s + 'electrical.resistors.resistor_2',
			'EE_VarResistor' : s + 'electrical.resistors.variable_resistor_2',
			'EE_Potentiometer' : s + 'electrical.resistors.potentiometer_2',
			'EE_ProtGround' : s + 'electrical.signal_sources.protective_earth',
			'EE_SignalGround' : s + 'electrical.signal_sources.signal_ground',
			'EE_Transformer' : s + 'electrical.inductors.transformer_1',
			'EE_Inductor' : s + 'electrical.inductors.inductor_3',
			'EE_Variable Inductor' : s + 'electrical.inductors.variable_inductor',
			'EE_TwoWaySwitch' : s + 'electrical.electro-mechanical.2-way_switch',
			'EE_OnOffSwitch' : s + 'electrical.electro-mechanical.simple_switch',
			'EE_Loudspeaker' : s + 'electrical.electro-mechanical.loudspeaker',
			'EE_Motor' : s + 'electrical.electro-mechanical.motor_1',
			'EE_LED1' : s + 'electrical.opto_electronics.led_2',
			'EE_Lightbulb' : s + 'electrical.miscellaneous.light_bulb',
			'EE_IntegratedCircuit' : 'shape=mxgraph.electrical.logic_gates.dual_inline_ic',
//Power Sources
			'EE_AcSource' : s + 'electrical.signal_sources.ac_source;strokeWidth=1;verticalLabelPosition=middle;align=left;verticalAlign=top;labelPosition=right;',
			'EE_VoltageSource' : s + 'electrical.signal_sources.dc_source_3;verticalLabelPosition=middle;align=left;verticalAlign=top;labelPosition=right;',
			'EE_CurrentSource' : s + 'electrical.signal_sources.dc_source_2;direction=north;verticalLabelPosition=middle;align=left;verticalAlign=top;labelPosition=right;',
			'EE_ControlledCurrentSource' : s + 'electrical.signal_sources.dependent_source_2;direction=west;verticalLabelPosition=middle;align=left;verticalAlign=top;labelPosition=right;',
			'EE_ControlledVoltageSource' : s + 'electrical.signal_sources.dependent_source_3;verticalLabelPosition=middle;align=left;verticalAlign=top;labelPosition=right;',
			'EE_DcSource1' : s + 'electrical.miscellaneous.monocell_battery;flipH=1;verticalLabelPosition=bottom;verticalAlign=top',
			'EE_DcSource2' : s + 'electrical.miscellaneous.multicell_battery;flipH=1;verticalLabelPosition=bottom;verticalAlign=top',
			'EE_Vss' : s + 'electrical.signal_sources.vss2;verticalLabelPosition=top;verticalAlign=bottom;fontSize=24',
			'EE_Vdd' : s + 'electrical.signal_sources.vdd;verticalLabelPosition=bottom;verticalAlign=top',
//Transistors
			
			'EE_BJT_NPN1' : s + 'electrical.transistors.pnp_transistor_1',
			'EE_BJT_NPN1_V2' : s + 'electrical.transistors.npn_transistor_1;',
			'EE_BJT_PNP1' : s + 'electrical.transistors.npn_transistor_1',
			'EE_BJT_PNP1_V2' : s + 'electrical.transistors.pnp_transistor_1',
			'EE_JFET_P' : s + 'electrical.transistors.p-channel_jfet_1;flipV=1',
			'EE_JFET_P_V2' : s + 'electrical.transistors.p-channel_jfet_1;flipV=1',
			'EE_JFET_N' : s + 'electrical.transistors.n-channel_jfet_1',
			'EE_JFET_N_V2' : s + 'electrical.transistors.n-channel_jfet_1',
			'EE_MOSFET_P1' : s + 'electrical.mosfets1.mosfet_ic_p;flipV=1',
			'EE_MOSFET_P1_V2' : s + 'electrical.mosfets1.mosfet_ic_p;flipV=1',
			'EE_MOSFET_P2' : s + 'electrical.mosfets1.mosfet_p_no_bulk',
			'EE_MOSFET_P2_V2' : s + 'electrical.mosfets1.mosfet_p_no_bulk',
			'EE_MOSFET_P3' : s + 'electrical.mosfets1.p-channel_mosfet_1;flipV=1',
			'EE_MOSFET_P3_V2' : s + 'electrical.mosfets1.p-channel_mosfet_1;flipV=1',
			'EE_MOSFET_N1' : s + 'electrical.mosfets1.mosfet_ic_n',
			'EE_MOSFET_N1_V2' : s + 'electrical.mosfets1.mosfet_ic_n',
			'EE_MOSFET_N2' : s + 'electrical.mosfets1.mosfet_n_no_bulk',
			'EE_MOSFET_N2_V2' : s + 'electrical.mosfets1.mosfet_n_no_bulk',
			'EE_MOSFET_N3' : s + 'electrical.mosfets1.n-channel_mosfet_1',
			'EE_MOSFET_N3_V2' : s + 'electrical.mosfets1.n-channel_mosfet_1',
//Relays
//			'EE_SPST' NA
//			'EE_SPDT' NA
//			'EE_DPST' NA
//			'EE_DPDT' NA
//Logic Gates
			'EE_AND' : s + 'electrical.logic_gates.and',
			'EE_OR' : s + 'electrical.logic_gates.or',
			'EE_Inverter' : s + 'electrical.logic_gates.inverter',
			'EE_NAND' : s + 'electrical.logic_gates.nand',
			'EE_NOR' : s + 'electrical.logic_gates.nor',
			'EE_XOR' : s + 'electrical.logic_gates.xor',
			'EE_NXOR' : s + 'electrical.logic_gates.xnor',
			'EE_DTypeRSFlipFlop' : s + 'electrical.logic_gates.d_type_rs_flip-flop',
			'EE_DTypeFlipFlop' : s + 'electrical.logic_gates.d_type_flip-flop',
			'EE_DTypeFlipFlopWithClear' : s + 'electrical.logic_gates.d_type_flip-flop_with_clear',
			'EE_RSLatch' : s + 'electrical.logic_gates.rs_latch',
			'EE_SyncRSLatch' : s + 'electrical.logic_gates.synchronous_rs_latch',
			'EE_TTypeFlipFlop' : s + 'electrical.logic_gates.t_type_flip-flop',
//Miscellaneous
			'EE_Plus' : s + 'ios7.misc.flagged',
			'EE_Negative' : 'shape=line',
			'EE_InverterContact' : 'ellipse',
			'EE_Voltmeter' : s + 'electrical.instruments.voltmeter',
			'EE_Ammeter' : s + 'electrical.instruments.ampermeter',
			'EE_SineWave' : s + 'electrical.waveforms.sine_wave',
			'EE_Sawtooth' : s + 'electrical.waveforms.sawtooth',
			'EE_SquareWave' : s + 'electrical.waveforms.square_wave',
//Messaging Systems
			'EIChannelBlock' : s + 'eip.messageChannel;verticalLabelPosition=bottom;verticalAlign=top',
			'EIMessageChannelBlock' : cs,
			'EIMessageBlock' : cs,
			'EIMessageRouterBlock' : s + 'eip.content_based_router;verticalLabelPosition=bottom;verticalAlign=top',
			'EIMessageTranslatorBlock' : s + 'eip.message_translator;verticalLabelPosition=bottom;verticalAlign=top',
			'EIMessageEndpointBlock' : cs,
//Messaging Channels
			'EIPublishSubscribeChannelBlock' : cs,
			'EIDatatypeChannelBlock' : cs,
			'EIInvalidMessageChannelBlock' : cs,
			'EIDeadLetterChannelBlock' : cs,
			'EIGuaranteedDeliveryBlock' : cs,
			'EIChannelAdapterBlock' : cs,
			'EIMessagingBridgeBlock' : s + 'eip.messaging_bridge;verticalLabelPosition=bottom;verticalAlign=top',
			'EIMessageBusBlock' : cs,
//Message Construction
			'EICommandMessageBlock' : cs,
			'EIDocumentMessageBlock' : cs,
			'EIEventMessageBlock' : cs,
			'EIRequestReplyBlock' : cs, 
			'EIReturnAddressBlock' : cs,
			'EICorrelationIDBlock' : cs,
			'EIMessageSequenceBlock' : cs,
			'EIMessageExpirationBlock' : cs,
//Message Routing
			'EIContentBasedRouterBlock' : s + 'eip.content_based_router;verticalLabelPosition=bottom;verticalAlign=top',
			'EIMessageFilterBlock' : s + 'eip.message_filter;verticalLabelPosition=bottom;verticalAlign=top',
			'EIDynamicRouterBlock' : s + 'eip.dynamic_router;verticalLabelPosition=bottom;verticalAlign=top',
			'EIRecipientListBlock' : s + 'eip.recipient_list;verticalLabelPosition=bottom;verticalAlign=top',
			'EISplitterBlock' : s + 'eip.splitter;verticalLabelPosition=bottom;verticalAlign=top',
			'EIAggregatorBlock' : s + 'eip.aggregator;verticalLabelPosition=bottom;verticalAlign=top',
			'EIResequencerBlock' : s + 'eip.resequencer;verticalLabelPosition=bottom;verticalAlign=top',
			'EIComposedMessageBlock' : s + 'eip.composed_message_processor;verticalLabelPosition=bottom;verticalAlign=top',
			'EIRoutingSlipBlock' : s + 'eip.routing_slip;verticalLabelPosition=bottom;verticalAlign=top',
			'EIProcessManagerBlock' : s + 'eip.process_manager;verticalLabelPosition=bottom;verticalAlign=top',
			'EIMessageBrokerBlock' : cs,
//Message Transformation
			'EIEnvelopeWrapperBlock' : s + 'eip.envelope_wrapper;verticalLabelPosition=bottom;verticalAlign=top',
			'EIContentEnricherBlock' : s + 'eip.content_enricher;verticalLabelPosition=bottom;verticalAlign=top',
			'EIContentFilterBlock' : s + 'eip.content_filter;verticalLabelPosition=bottom;verticalAlign=top',
			'EIClaimCheckBlock' : s + 'eip.claim_check;verticalLabelPosition=bottom;verticalAlign=top',
			'EINormalizerBlock' : s + 'eip.normalizer;verticalLabelPosition=bottom;verticalAlign=top',
//Messaging Endpoints
			'EIMessagingGatewayBlock' : s + 'eip.messaging_gateway;verticalLabelPosition=bottom;verticalAlign=top',
			'EITransactionalClientBlock' : s + 'eip.transactional_client;verticalLabelPosition=bottom;verticalAlign=top',
			'EIPollingConsumerBlock' : s + 'eip.polling_consumer;verticalLabelPosition=bottom;verticalAlign=top',
			'EIEventDrivenConsumerBlock' : s + 'eip.event_driven_consumer;verticalLabelPosition=bottom;verticalAlign=top',
			'EICompetingConsumersBlock' : s + 'eip.competing_consumers;verticalLabelPosition=bottom;verticalAlign=top',
			'EIMessageDispatcherBlock' : s + 'eip.message_dispatcher;verticalLabelPosition=bottom;verticalAlign=top',
			'EISelectiveConsumerBlock' : s + 'eip.selective_consumer;verticalLabelPosition=bottom;verticalAlign=top',
			'EIDurableSubscriberBlock' : cs,
			'EIServiceActivatorBlock' : s + 'eip.service_activator;verticalLabelPosition=bottom;verticalAlign=top',
//System Management
			'EIControlBusBlock' : cs,
			'EIDetourBlock' : s + 'eip.detour;verticalLabelPosition=bottom;verticalAlign=top',
			'EIWireTapBlock' : s + 'eip.wire_tap;verticalLabelPosition=bottom;verticalAlign=top',
			'EIMessageHistoryBlock' : cs,
			'EIMessageStoreBlock' : s + 'eip.message_store;verticalLabelPosition=bottom;verticalAlign=top',
			'EISmartProxyBlock' : s + 'eip.smart_proxy;verticalLabelPosition=bottom;verticalAlign=top',
			'EITestMessageBlock' : s + 'eip.test_message;verticalLabelPosition=bottom;verticalAlign=top',
			'EIChannelPurgerBlock' : s + 'eip.channel_purger;verticalLabelPosition=bottom;verticalAlign=top',
//Google Cloud Platform
			'GCPIconComputeEngineBlock' : gcpIcon + 'compute_engine',
			'GCPIconAppEngineBlock' : gcpIcon + 'app_engine',
			'GCPIconContainerEngineBlock' : gcpIcon + 'container_engine',
			'GCPIconContainerRegistryBlock' : gcpIcon + 'container_registry',
			'GCPIconCloudFunctionsBlock' : gcpIcon + 'cloud_functions',
			'GCPIconCloudStorageBlock' : gcpIcon + 'cloud_storage',
			'GCPIconCloudSQLBlock' : gcpIcon + 'cloud_sql',
			'GCPIconCloudBigtableBlock' : gcpIcon + 'cloud_bigtable',
			'GCPIconCloudDatastoreBlock' : gcpIcon + 'cloud_datastore',
			'GCPIconPersistentDiskBlock' : gcpIcon + 'persistent_disk',
			'GCPIconCloudVirtualNetworkBlock' : ss + 'gcp.networking.cloud_virtual_network;verticalLabelPosition=bottom;verticalAlign=top',
			'GCPIconCloudLoadBalancingBlock' : gcpIcon + 'cloud_load_balancing',
			'GCPIconCloudCDNBlock' : gcpIcon + 'cloud_cdn',
			'GCPIconCloudInterconnectBlock' : gcpIcon + 'dedicated_interconnect',
			'GCPIconCloudInterconnectBlock2' : gcpIcon + 'dedicated_interconnect',
			'GCPIconCloudDNSBlock' : gcpIcon + 'cloud_dns',
			'GCPIconBigQueryBlock' : gcpIcon + 'bigquery',
			'GCPIconCloudDataflowBlock' : gcpIcon + 'cloud_dataflow',
			'GCPIconCloudDataprocBlock' : gcpIcon + 'cloud_dataproc',
			'GCPIconCloudDatalabBlock' : gcpIcon + 'cloud_datalab',
			'GCPIconCloudPubSubBlock' : gcpIcon + 'cloud_pubsub',
			'GCPIconGenomicsBlock' : gcpIcon + 'genomics',
			'GCPIconCloudMachineLearningServicesBlock' : gcpIcon + 'cloud_machine_learning',
			'GCPIconCloudMachineLearningServicesBlock2' : gcpIcon + 'cloud_machine_learning',
			'GCPIconVisionAPIBlock' : gcpIcon + 'cloud_vision_api',
			'GCPIconVisionAPIBlock2' : gcpIcon + 'cloud_vision_api',
			'GCPIconSpeechAPIBlock' : gcpIcon + 'cloud_speech_api',
			'GCPIconSpeechAPIBlock2' : gcpIcon + 'cloud_speech_api',
			'GCPIconNaturalLanguageAPIBlock' : gcpIcon + 'cloud_natural_language_api',
			'GCPIconNaturalLanguageAPIBlock2' : gcpIcon + 'cloud_natural_language_api',
			'GCPIconTranslateAPIBlock' : gcpIcon + 'cloud_translation_api',
			'GCPIconTranslateAPIBlock2' : gcpIcon + 'cloud_translation_api',
			'GCPIconStackdriverOverviewBlock' : gcpIcon + 'stackdriver',
			'GCPIconStackdriverOverviewBlock2' : gcpIcon + 'stackdriver',
			'GCPIconMonitoringBlock' : gcpIcon + 'cloud_deployment_manager',
			'GCPIconLoggingBlock' : gcpIcon + 'logging',
			'GCPIconErrorReportingBlock' : gcpIcon + 'error_reporting',
			'GCPIconTraceBlock' : gcpIcon + 'trace',
			'GCPIconDebuggerBlock' : gcpIcon + 'debugger',
			'GCPIconDeploymentManagerBlock' : gcpIcon + 'cloud_deployment_manager',
			'GCPIconDeploymentManagerBlock2' : gcpIcon + 'cloud_deployment_manager',
			'GCPIconCloudEndpointsBlock' : gcpIcon + 'cloud_endpoints',
			'GCPIconCloudToolsForPowerShellBlock' : gcpIcon + 'cloud_tools_for_powershell',
			'GCPIconCloudToolsForVisualStudioBlock' : gcpIcon + 'cloud_tools_for_powershell',
			'GCPIconCloudIAMBlock' : gcpIcon + 'cloud_iam',
			'GCPIconGCPLogoBlock' : gcpIcon + 'placeholder',
			'GCPIconGCPLogoBlock2' : gcpIcon + 'placeholder',
			'GCPIconBlankBlock' : gcpIcon + 'blue_hexagon',
			'GCPIconBlankBlock2' : gcpIcon + 'blue_hexagon',
			'GCPIconAPIAnalyticsBlock' : gcpIcon + 'api_analytics',
			'GCPIconApigeeAPIPlatformBlock' : gcpIcon + 'apigee_api_platform',
			'GCPIconApigeeSenseBlock' : gcpIcon + 'apigee_sense',
			'GCPIconAPIMonetizationBlock' : gcpIcon + 'api_monetization',
			'GCPIconCloudEndpointsBlock2' : gcpIcon + 'cloud_endpoints',
			'GCPIconDeveloperPortalBlock' : gcpIcon + 'developer_portal',
			'GCPIconBigQueryBlock2' : gcpIcon + 'bigquery',
			'GCPIconCloudComposerBlock' : gcpIcon + 'cloud_composer',
			'GCPIconCloudDataflowBlock2' : gcpIcon + 'cloud_dataflow',
			'GCPIconCloudDatalabBlock2' : gcpIcon + 'cloud_datalab',
			'GCPIconCloudDataprepBlock' : gcpIcon + 'cloud_dataprep',
			'GCPIconCloudDataprocBlock2' : gcpIcon + 'cloud_dataproc',
			'GCPIconCloudPubSubBlock2' : gcpIcon + 'cloud_pubsub',
			'GCPIconDataStudioBlock' : gcpIcon + 'data_studio',
			'GCPIconGenomicsBlock2' : gcpIcon + 'genomics',
			'GCPIconAdvancedSolutionsLabBlock' : gcpIcon + 'advanced_solutions_lab',
			'GCPIconCloudAutoMLBlock' : gcpIcon + 'cloud_automl',
			'GCPIconCloudNaturalLanguageAPIBlock' : gcpIcon + 'cloud_natural_language_api',
			'GCPIconCloudJobsAPIBlock' : gcpIcon + 'cloud_jobs_api',
			'GCPIconCloudTPUBlock' : gcpIcon + 'cloud_tpu',
			'GCPIconCloudMachineLearningBlock' : gcpIcon + 'cloud_machine_learning',
			'GCPIconCloudVisionAPIBlock' : gcpIcon + 'cloud_vision_api',
			'GCPIconCloudTranslationAPIBlock' : gcpIcon + 'cloud_translation_api',
			'GCPIconDialogflowEnterpriseEditionBlock' : gcpIcon + 'dialogflow_enterprise_edition',
			'GCPIconCloudSpeechAPIBlock' : gcpIcon + 'cloud_speech_api',
			'GCPIconCloudTexttoSpeechBlock' : gcpIcon + 'cloud_text_to_speech',
			'GCPIconCloudVideoIntelligenceAPIBlock' : gcpIcon + 'cloud_video_intelligence_api',
			'GCPIconAppEngineBlock2' : gcpIcon + 'app_engine',
			'GCPIconCloudToolsforVisualStudioBlock' : gcpIcon + 'cloud_tools_for_powershell',
			'GCPIconCloudDeploymentManagerBlock' : gcpIcon + 'cloud_deployment_manager',
			'GCPIconCloudFunctionsBlock2' : gcpIcon + 'cloud_functions',
			'GCPIconContainerBuilderBlock' : gcpIcon + 'container_builder',
			'GCPIconCloudSDKBlock' : gcpIcon + 'placeholder',
			'GCPIconCloudSourceRepositoriesBlock' : gcpIcon + 'placeholder',
			'GCPIconContainerRegistryBlock2' : gcpIcon + 'container_registry',
			'GCPIconCloudTestLabBlock' : gcpIcon + 'placeholder',
			'GCPIconGPUBlock' : gcpIcon + 'gpu',
			'GCPIconContainerEngineBlock2' : gcpIcon + 'container_engine',
			'GCPIconTransferApplianceBlock' : gcpIcon + 'transfer_appliance',
			'GCPIconCloudToolsforPowerShellBlock' : gcpIcon + 'cloud_tools_for_powershell',
			'GCPIconCloudToolsforIntelliJBlock' : gcpIcon + 'placeholder',
			'GCPIconCloudToolsforAndroidStudioBlock' : gcpIcon + 'placeholder',
			'GCPIconGooglePluginforEclipseBlock' : gcpIcon + 'placeholder',
			'GCPIconContainerOptimizedOSBlock' : gcpIcon + 'container_optimized_os',
			'GCPIconComputeEngineBlock2' : gcpIcon + 'compute_engine',
			'GCPIconBeyondCorpBlock' : gcpIcon + 'beyondcorp',
			'GCPIconCloudIAMBlock2' : gcpIcon + 'cloud_iam',
			'GCPIconCloudResourceManagerBlock' : gcpIcon + 'cloud_iam',
			'GCPIconCloudSecurityCommandCenterBlock' : gcpIcon + 'cloud_security_command_center',
			'GCPIconCloudSecurityScannerBlock' : gcpIcon + 'cloud_security_scanner',
			'GCPIconDataLossPreventionAPIBlock' : gcpIcon + 'data_loss_prevention_api',
			'GCPIconIdentityAwareProxyBlock' : gcpIcon + 'identity_aware_proxy',
			'GCPIconKeyManagementServiceBlock' : gcpIcon + 'key_management_service',
			'GCPIconSecurityKeyEnforcementBlock' : gcpIcon + 'security_key_enforcement',
			'GCPIconCloudIoTCoreBlock' : gcpIcon + 'cloud_iot_core',
			'GCPIconCloudAPIsBlock' : gcpIcon + 'cloud_apis',
			'GCPIconCloudBillingAPIBlock' : gcpIcon + 'placeholder',
			'GCPIconCloudConsoleBlock' : gcpIcon + 'placeholder',
			'GCPIconCloudDeploymentManagerBlock2' : gcpIcon + 'cloud_deployment_manager',
			'GCPIconCloudMobileAppBlock' : gcpIcon + 'placeholder',
			'GCPIconCloudShellBlock' : gcpIcon + 'placeholder',
			'GCPIconDebuggerBlock2' : gcpIcon + 'debugger',
			'GCPIconErrorReportingBlock2' : gcpIcon + 'error_reporting',
			'GCPIconLoggingBlock2' : gcpIcon + 'logging',
			'GCPIconMonitoringBlock2' : gcpIcon + 'cloud_deployment_manager',
			'GCPIconStackdriverBlock' : gcpIcon + 'stackdriver',
			'GCPIconTraceBlock2' : gcpIcon + 'trace',
			'GCPIconCloudArmorBlock' : gcpIcon + 'cloud_armor',
			'GCPIconCloudCDNBlock2' : gcpIcon + 'cloud_cdn',
			'GCPIconCloudDNSBlock2' : gcpIcon + 'cloud_dns',
			'GCPIconCloudExternalIPAddressesBlock' : gcpIcon + 'cloud_external_ip_addresses',
			'GCPIconCloudFirewallRulesBlock' : gcpIcon + 'cloud_firewall_rules',
			'GCPIconCloudLoadBalancingBlock2' : gcpIcon + 'cloud_load_balancing',
			'GCPIconCloudNetworkBlock' : gcpIcon + 'cloud_network',
			'GCPIconCloudRouterBlock' : gcpIcon + 'cloud_router',
			'GCPIconCloudRoutesBlock' : gcpIcon + 'cloud_routes',
			'GCPIconCloudVPNBlock' : gcpIcon + 'cloud_vpn',
			'GCPIconDedicatedInterconnectBlock' : gcpIcon + 'dedicated_interconnect',
			'GCPIconPartnerInterconnectBlock' : gcpIcon + 'partner_interconnect',
			'GCPIconPremiumNetworkTierBlock' : gcpIcon + 'premium_network_tier',
			'GCPIconStandardNetworkTierBlock' : gcpIcon + 'standard_network_tier',
			'GCPIconVirtualPrivateCloudBlock' : gcpIcon + 'virtual_private_cloud',
			'GCPIconCloudBigtableBlock2' : gcpIcon + 'cloud_bigtable',
			'GCPIconCloudDatastoreBlock2' : gcpIcon + 'cloud_datastore',
			'GCPIconCloudFilestoreBlock' : gcpIcon + 'cloud_filestore',
			'GCPIconCloudMemorystoreBlock' : gcpIcon + 'cloud_memorystore',
			'GCPIconCloudSpannerBlock' : gcpIcon + 'cloud_spanner',
			'GCPIconCloudSQLBlock2' : gcpIcon + 'cloud_sql',
			'GCPIconCloudStorageBlock2' : gcpIcon + 'cloud_storage',
			'GCPIconPersistentDiskBlock2' : gcpIcon + 'persistent_disk',
			'GCPIconGoogleCloudPlatformBlock' : gcpIcon + 'google_cloud_platform',
			'GCPIconBlueHexagonBlock' : gcpIcon + 'blue_hexagon',
			'GCPIconGenericBlock' : gcpIcon + 'placeholder',
			'GCPIconPredictionAPIBlock' : gcpIcon + 'prediction_api',
			//'GCPGoogleCloudPlatformLockupBlock' : gcpIcon + 'gcp_google_cloud_platform_lockup',
			'GCPAutoScalingModifier' : 'shape=mxgraph.gcp2.modifiers_autoscaling;fillColor=#757575;strokeColor=none;',
			'GCPCustomVirtualMachineModifier' : 'shape=mxgraph.gcp2.modifiers_custom_virtual_machine;fillColor=#757575;strokeColor=none;',
			'GCPHighCPUMachineModifier' : 'shape=mxgraph.gcp2.modifiers_high_cpu_machine;fillColor=#757575;strokeColor=none;',
			'GCPHighMemoryMachineModifier' : 'shape=mxgraph.gcp2.modifiers_high_memory_machine;fillColor=#757575;strokeColor=none;',
			'GCPPreemptableVSModifier' : 'shape=mxgraph.gcp2.modifiers_preemptable_vm;fillColor=#757575;strokeColor=none;',
			'GCPSharedCoreMachineF1Modifier' : 'shape=mxgraph.gcp2.modifiers_shared_core_machine_f1;fillColor=#757575;strokeColor=none;',
			'GCPSharedCoreMachineG1Modifier' : 'shape=mxgraph.gcp2.modifiers_shared_core_machine_g1;fillColor=#757575;strokeColor=none;',
			'GCPStandardMachineModifier' : 'shape=mxgraph.gcp2.modifiers_standard_machine;fillColor=#757575;strokeColor=none;',
			'GCPStorageModifier' : 'shape=mxgraph.gcp2.modifiers_storage;fillColor=#757575;strokeColor=none;',
			'GCPAppEngineProductCard' : cs,
			'GCPCloudDataflowProductCard' : cs,
			'GCPCloudDataprocProductCard' : cs,
			'GCPComputeEngineProductCard' : cs,
			'GCPContainerEngineProductCard' : cs,
			
//Kubernetes Icons
			'CronjobLabeledKub19' : kupIcon + 'cronjob',
			'CronjobKub19' : kupIcon + 'cronjob',
			'DeployLabeledKub19' : kupIcon + 'deploy',
			'DeployKub19' : kupIcon + 'deploy',
			'DsLabeledKub19' : kupIcon + 'ds',
			'DsKub19' : kupIcon + 'ds',
			'JobLabeledKub19' : kupIcon + 'job',
			'JobKub19' : kupIcon + 'job',
			'PodLabeledKub19' : kupIcon + 'pod',
			'PodKub19' : kupIcon + 'pod',
			'RsLabeledKub19' : kupIcon + 'rs',
			'RsKub19' : kupIcon + 'rs',
			'StsLabeledKub19' : kupIcon + 'sts',
			'StsKub19' : kupIcon + 'sts',
			'PvLabeledKub19' : kupIcon + 'pv',
			'PvKub19' : kupIcon + 'pv',
			'PvcLabeledKub19' : kupIcon + 'pvc',
			'PvcKub19' : kupIcon + 'pvc',
			'ScLabeledKub19' : kupIcon + 'sc',
			'ScKub19' : kupIcon + 'sc',
			'VolLabeledKub19' : kupIcon + 'vol',
			'VolKub19' : kupIcon + 'vol',
			'EpLabeledKub19' : kupIcon + 'ep',
			'EpKub19' : kupIcon + 'ep',
			'IngLabeledKub19' : kupIcon + 'ing',
			'IngKub19' : kupIcon + 'ing',
			'NetpolLabeledKub19' : kupIcon + 'netpol',
			'NetpolKub19' : kupIcon + 'netpol',
			'SvcLabeledKub19' : kupIcon + 'svc',
			'SvcKub19' : kupIcon + 'svc',
			'CrdLabeledKub19' : kupIcon + 'crd',
			'CrdKub19' : kupIcon + 'crd',
			'CroleLabeledKub19' : kupIcon + 'c_role',
			'CroleKub19' : kupIcon + 'c_role',
			'GroupLabeledKub19' : kupIcon + 'group',
			'GroupKub19' : kupIcon + 'group',
			'RbLabeledKub19' : kupIcon + 'rb',
			'RbKub19' : kupIcon + 'rb',
			'RoleLabeledKub19' : kupIcon + 'role',
			'RoleKub19' : kupIcon + 'role',
			'SaLabeledKub19' : kupIcon + 'sa',
			'SaKub19' : kupIcon + 'sa',
			'UserLabeledKub19' : kupIcon + 'user',
			'UserKub19' : kupIcon + 'user',
			'CmResourceLabeledKub19' : kupIcon + 'cm',
			'CmKub19' : kupIcon + 'cm',
			'SecretLabeledKub19' : kupIcon + 'secret',
			'SecretKub19' : kupIcon + 'secret',
			'HpaLabeledKub19' : kupIcon + 'hpa',
			'HpaKub19' : kupIcon + 'hpa',
			'LimitsLabeledKub19' : kupIcon + 'limits',
			'LimitsKub19' : kupIcon + 'limits',
			'QuotaLabeledKub19' : kupIcon + 'quota',
			'QuotaKub19' : kupIcon + 'quota',
			'CrbLabeledKub19' : kupIcon + 'crb',
			'CrbKub19' : kupIcon + 'crb',
			'LogoKub19' : 'image;aspect=fixed;html=1;align=center;image=img/lib/mscae/Kubernetes.svg',
			'NsLabeledKub19' : kupIcon + 'ns',
			'NsKub19' : kupIcon + 'ns',
			'PspLabeledKub19' : kupIcon + 'psp',
			'PspKub19' : kupIcon + 'psp',
			'EtcdLabeledKub19' : kupIcon + 'etcd',
			'EtcdKub19' : kupIcon + 'etcd',
			'MasterLabeledKub19' : kupIcon + 'master',
			'MasterKub19' : kupIcon + 'master',
			'NodeLabeledKub19' : kupIcon + 'node',
			'NodeKub19' : kupIcon + 'node',
			'ApiLabeledKub19' : kupIcon + 'api',
			'CcmLabeledKub19' : kupIcon + 'c_c_m',
			'CmLabeledKub19' : kupIcon + 'c_m',
			'KproxyLabeledKub19' : kupIcon + 'node',
			'KubeletLabeledKub19' : kupIcon + 'kubelet',
			'SchedLabeledKub19' : kupIcon + 'sched',
//Equation
			'Equation' : cs,
//Walls
			'fpWall' : cs,
//Rooms
//Doors & Windows
			'fpWindow' : s + 'floorplan.window;strokeWidth=3',
			'fpOpening' : 'shape=rect',
			'fpDoor' : cs,
			'fpDoubleDoor' : cs,
//Stairs			
			'fpStairs' : s + 'floorplan.stairs;direction=north',
			'fpStairsDirectional' : s + 'floorplan.stairs;direction=north;verticalAlign=bottom',
//			'fpStairsCurved' NA
//			'fpStairsCurvedWide' NA
//Desks
//			'fpDeskEndSegment' NA
			'fpDeskLongSegment' : '',
			'fpDeskShortSegment' : '',
//			'fpDeskSmallCornerSegment' NA
			'fpDeskLargeCornerSegment' : s + 'floorplan.desk_corner',
//			'fpDeskMediumCornerSegment' NA
//			'fpDeskRoundedLSegment' NA
//			'fpDeskRoundedCornerSegment' NA
//Cubicle walls
			'fpCubiclePanel' : s + 'floorplan.wall;wallThickness=3',
			'fpCubicleWorkstation' : s + 'floorplan.wallU;wallThickness=3',
			'fpCubicleCorner5x5' : s + 'floorplan.wallCorner;wallThickness=3',
			'fpCubicleCorner6x6' : s + 'floorplan.wallCorner;wallThickness=3',
			'fpCubicleCorner8x8' : s + 'floorplan.wallCorner;wallThickness=3',
			'fpCubicleCorner8x6' : s + 'floorplan.wallCorner;wallThickness=3',
			'fpCubicleCornerOpen6x4' : s + 'floorplan.wallCorner;wallThickness=3',
			'fpCubicleDouble14x8' : s + 'floorplan.wallU;wallThickness=3',
			'fpCubicleEnclosed11x9' : s + 'floorplan.wallU;wallThickness=3',
//Tables & Chairs
			'fpTableConferenceOval' : 'ellipse',
			'fpTableConferenceBoat' : '',
			'fpTableConferenceRectangle' : '',
			'fpTableDiningRound' : 'ellipse',
			'fpTableDiningSquare' : '',
			'fpChairOffice' : s + 'floorplan.office_chair',
			'fpChairExecutive' : s + 'floorplan.office_chair',
			'fpChairLobby' : s + 'floorplan.office_chair',
			'fpChairDining' : s + 'floorplan.chair',
			'fpChairBarstool' : 'ellipse',
//Cubicles - Prebuilt
//Tables - Prebuilt
//Cabinets - we don't have corresponding stencils, just rounded rectangles			
			'fpCabinetBasic' : '',
//			'fpCabinetCornerLarge' NA
			'fpCabinetDoubleWide' : '',
			'fpCabinetDoubleWithShelves' : '',
			'fpCabinetShelvesBasic' : '',
			'fpCabinetShelvesDouble' : '',
			'fpCabinetBasicWithShelves' : '',
			'fpCabinetsAboveDeskShelves' : '',
//Restroom
			'fpRestroomToiletPrivate' : s + 'floorplan.toilet',
			'fpRestroomToiletPublic' : s + 'floorplan.toilet',
//			'fpRestroomBidet' NA
			'fpRestroomLights' : cs,
			'fpRestroomSinks' : cs,
//			'fpRestroomGrabBar' NA
			'fpRestroomBathtub' : s + 'floorplan.bathtub;direction=south',
			'fpRestroomShower' : s + 'floorplan.shower;flipH=1',
//			'fpRestroomCornerSink' NA
			'fpRestroomPedastalSink' : s + 'floorplan.sink_1',
			'fpRestroomCountertop' : '',
			'fpRestroomMirror' : 'shape=line;strokeWidth=3',
//			'fpDresserOrnateMirror' NA
//			'fpRestroomToiletPaper' NA
			'fpRestroomStalls' : cs,
//Beds
			'fpBedDouble' : s + 'floorplan.bed_double',
			'fpBedSingle' : s + 'floorplan.bed_single',
			'fpBedQueen' : s + 'floorplan.bed_double',
			'fpBedKing' : s + 'floorplan.bed_double',
			'fpBedDoubleWithTrundle' : s + 'floorplan.bed_double',
			'fpBedBunk' : s + 'floorplan.bed_double',
//			'fpBedBunkL' NA
//			'fpBedCrib' NA
			'fpBedBassinet' : s + 'pid.fittings.compensator',
//Dressers
//			'fpDresserChest' NA
//			'fpDresserMirrorDresser' NA
//			'fpClosetRod' NA
//			'fpDresserOrnateMirror' NA
//Appliances
			'fpApplianceWasher' : '',
			'fpApplianceDryer' : '',
			'fpApplianceWaterHeater' : 'ellipse',
//			'fpApplianceRefrigerator' NA
			'fpApplianceStoveOven' : s + 'floorplan.range_1',
			'fpStoveOvenSixBurner' : s + 'floorplan.range_2',
			'fpApplianceDishwasher' : '',
//Kitchen
			'fpKitchenSink' : s + 'floorplan.sink_2',
			'fpKitchenDoubleSink' : s + 'floorplan.sink_double',
			'fpKitchenCountertop' : '',
			'fpKitchenCountertopCorner' : s + 'floorplan.desk_corner',
//Couches
			'fpCouchLoveSeat' : s + 'floorplan.couch',
			'fpCouchSofa' : s + 'floorplan.couch',
//			'fpCouchSectional' NA
			'fpCouchOttoman' : '',
//			'fpCouchPillow' NA
//Technology
			'fpMiscDesktopComputer' : s + 'floorplan.workstation',
			'fpMiscLaptopComputer' : s + 'floorplan.laptop',
			'fpComputerMonitor' : s + 'floorplan.flat_tv',
			'fpCRTTelevision' : s + 'floorplan.flat_tv',
//			'fpMiscProjector' NA
//			'fpMiscProjectorScreen' NA
//Misc Floorplan
			'fpMiscIndoorPlant' : s + 'floorplan.plant',
//			'fpMiscPodium' NA
			'fpPiano' : s + 'floorplan.piano',
//			'fpPianoBench' : 'absoluteArcSize=1;arcSize=' + arcSize + ';rounded=1',
//Equipment
			'PEAxialCompressor' : s + 'pid.compressors.centrifugal_compressor_-_turbine_driven;verticalLabelPosition=bottom;verticalAlign=top',
			'PECentrifugalCompressor' : s + 'pid.compressors.centrifugal_compressor;verticalLabelPosition=bottom;verticalAlign=top',
			'PECentrifugalCompressor2' : s + 'pid.compressors.centrifugal_compressor_-_turbine_driven;verticalLabelPosition=bottom;verticalAlign=top',
//			'PECentrifugalCompressor3' NA
			'PEReciprocationCompressor' : s + 'pid.compressors.reciprocating_compressor;verticalLabelPosition=bottom;verticalAlign=top',
			'PERotaryCompressorBlock' : s + 'pid.compressors.rotary_compressor;verticalLabelPosition=bottom;verticalAlign=top',
			'PERotaryCompressor2Block' : s + 'pid.compressors.compressor_and_silencers;verticalLabelPosition=bottom;verticalAlign=top',
			'PEConveyorBlock' : s + 'pid2misc.conveyor;verticalLabelPosition=bottom;verticalAlign=top',
//			'PEOverheadConveyorBlock' NA
//			'PEScraperConveyorBlock' NA
//			'PEScrewConveyorBlock' NA
//			'PEPositiveDisplacementBlock' NA
//			'PEPositiveDisplacement2' NA
			'PEElevator1Block' : s + 'pid.misc.bucket_elevator;flipH=1;verticalLabelPosition=bottom;verticalAlign=top',
//			'PEElevator2Block' NA
//			'PEHoistBlock' NA
//			'PESkipHoistBlock' NA
//			'PEMotorBlock' NA
//			'PEDieselMotorBlock' NA
//			'PEElectricMotorBlock' NA
//			'PELiquidRingVacuumBlock' NA
//			'PETurbineDriverBlock' NA
//			'PEDoubleFlowTurbineBlock' NA
			'PEAgitatorMixerBlock' : s + 'pid.agitators.agitator_(propeller);verticalLabelPosition=bottom;verticalAlign=top',
			'PEDrumBlock' : s + 'pid.vessels.drum_or_condenser;verticalLabelPosition=bottom;verticalAlign=top',
			'PETankEquipmentBlock' : s + 'pid.vessels.tank;verticalLabelPosition=bottom;verticalAlign=top',
//			'PECentrifugalBlower' NA
//			'PEAlkylationBlock' NA
//			'PEBoomLoaderBlock' NA
//			'PEFluidCatalyticCrackingBlock' NA
//			'PEFluidCookingBlock' NA
//			'PEFluidizedReactorBlock' NA
//			'PETubularBlock' NA
//			'PEReformerBlock' NA
			'PEMixingReactorBlock' : s + 'pid.vessels.mixing_reactor;verticalLabelPosition=bottom;verticalAlign=top',
//			'PEHydrodesulferizationBlock' NA
//			'PEHydrocrackingBlock' NA
			'PEPlateTowerBlock' : s + 'pid2misc.column;columnType=baffle;verticalLabelPosition=bottom;verticalAlign=top',
			'PEPackedTowerBlock' : s + 'pid2misc.column;columnType=fixed;verticalLabelPosition=bottom;verticalAlign=top',
//			'PEAutomaticStokerBlock' NA
//			'PEOilBurnerBlock' NA
//			'PECounterflowForcedDraftBlock' NA
//			'PECounterflowNaturalDraftBlock' NA
//			'PECrossflowInductedBlock' NA
			'PEFurnaceBlock' : s + 'pid.vessels.furnace;verticalLabelPosition=bottom;verticalAlign=top',
//			'PEChimneyTowerBlock' NA
//Piping
			'PEOneToMany' : cs, //TODO
			'PEMultilines' : cs, //TODO
			'PEMidArrow' : 'shape=triangle;anchorPointDirection=0',
			'PEButtWeld' : s + 'sysml.x',
			'PETopToTop' : s + 'pid.vessels.container,_tank,_cistern',
//			'PESonicSignal' NA
			'PENuclear' : s + 'electrical.waveforms.sine_wave',
//			'PEPneumatic' NA
//			'PEHydraulicSignalLine' NA
			'PEMechanicalLink' : 'ellipse',
			'PESolderedSolvent' : 'ellipse',
			'PEDoubleContainment' : 'shape=hexagon;perimeter=hexagonPerimeter2',
			'PEFlange' : s + 'pid.piping.double_flange',
			'PEFlange2' : s + 'pid.piping.flange_in;flipH=1',
			'PEEndCap' : s + 'pid.piping.cap',
			'PEEndCap2' : s + 'pid.vessels.container,_tank,_cistern;direction=north',
			'PEBreather' : s + 'pid.piping.breather',
			'PEElectronicallyInsulated' : s + 'pid.piping.double_flange',
			'PEReducer' : s + 'pid.piping.concentric_reducer',
			'PEInlineMixer' : s + 'pid.piping.in-line_mixer',
//			'PESeparator' NA
//			'PEBurstingDisc' NA
			'PEFlameArrester' : s + 'pid.piping.flame_arrestor',
//			'PEFlameArrester2' NA
			'PEDetonationArrester' : s + 'pid.piping.detonation_arrestor',
//			'PEDrainSilencer' NA
			'PETriangleSeparator' : 'shape=triangle;direction=west;anchorPointDirection=0',
//			'PETriangleSeparator2' NA
			'PETundish' : s + 'ios7.misc.left',
			'PEOpenVent' : s + 'pid.vessels.vent_(bent)',
//			'PESiphonDrain' NA
			'PERemovableSpool' : s + 'pid.piping.removable_spool',
			'PEYTypeStrainer' : s + 'pid.piping.y-type_strainer',
			'PEDiverterValve' : s + 'pid.piping.diverter_valve',
			'PEPulsationDampener' : s + 'pid.piping.pulsation_dampener',
			'PEDuplexStrainer' : s + 'pid.piping.duplex_strainer',
			'PEBasketStrainer' : s + 'pid.piping.basket_strainer',
			'PEVentSilencer' : s + 'pid.piping.vent_silencer',
			'PEInlineSilencer' : s + 'pid.piping.in-line_silencer',
			'PESteamTrap' : s + 'pid.piping.steam_trap',
			'PEDesuperheater' : s + 'pid.piping.desuper_heater',
			'PEEjectorOrEductor' : s + 'pid.fittings.injector',
			'PEExhaustHead' : s + 'pid.piping.exhaust_head',
			'PERotaryValve' : s + 'pid.piping.rotary_valve',
			'PEExpansionJoint' : s + 'pid.piping.expansion_joint',
//Vessels
			'PEVesselBlock' : cs,
			'PEOpenTankBlock' : s + 'pid.vessels.container,_tank,_cistern;verticalLabelPosition=bottom;verticalAlign=top', //not all versions supported
			'PEOpenTopTank' : s + 'pid.vessels.container,_tank,_cistern;verticalLabelPosition=bottom;verticalAlign=top',
			'PEClosedTankBlock' : cs,
			'PEStorageSphereBlock' : s + 'pid.vessels.storage_sphere;verticalLabelPosition=bottom;verticalAlign=top',
			'PEColumnBlock' : cs,
			'PEBagBlock' : s + 'pid.vessels.bag;verticalLabelPosition=bottom;verticalAlign=top',
			'PEGasCylinderBlock' : s + 'pid.vessels.gas_bottle;verticalLabelPosition=bottom;verticalAlign=top',
			'PEGasHolderBlock' : s + 'pid.vessels.gas_holder;verticalLabelPosition=bottom;verticalAlign=top',
			'PEClarifierBlock' : s + 'pid.vessels.bunker_(conical_bottom);verticalLabelPosition=bottom;verticalAlign=top',
			'PETankBlock' : s + 'pid.vessels.tank_(conical_roof);verticalLabelPosition=bottom;verticalAlign=top',
			'PETrayColumnBlock' : s + 'pid2misc.column;columnType=tray;verticalLabelPosition=bottom;verticalAlign=top',
			'PEReactionVesselBlock' : s + 'pid.vessels.reactor;verticalLabelPosition=bottom;verticalAlign=top',
			'PEBin' : s + 'pid.vessels.tank_(conical_bottom)',
			'PEDomeRoofTank' : s + 'pid.vessels.tank_(dished_roof)',
			'PEConeRoofTank' : s + 'pid.vessels.tank_(conical_roof)',
//			'PEInternalFloatingRoof' NA
//			'PEDoubleWallTank' NA
//			'PEOnionTank' NA
//Heat Exchangers
			'PEBoilerBlock' : s + 'pid.misc.boiler_(dome);verticalLabelPosition=bottom;verticalAlign=top',
			'PEEquipmentBoilerBlock' : s + 'pid.misc.boiler_(dome);verticalLabelPosition=bottom;verticalAlign=top',
			'PEReboilerBlock' : s + 'pid.heat_exchangers.reboiler;verticalLabelPosition=bottom;verticalAlign=top',
			'PECondenserBlock' : s + 'pid.heat_exchangers.heat_exchanger_(straight_tubes);verticalLabelPosition=bottom;verticalAlign=top',
			'PEEquipmentCondenserBlock' : s + 'pid.heat_exchangers.condenser;verticalLabelPosition=bottom;verticalAlign=top',
//			'PEEvaporativeCondenserBlock' NA
			'PECoolingTowerBlock' : s + 'pid.misc.cooling_tower;verticalLabelPosition=bottom;verticalAlign=top',
			'PEHeatExchangerBlock' : s + 'pid.heat_exchangers.shell_and_tube_heat_exchanger_1;verticalLabelPosition=bottom;verticalAlign=top',
//			'PEAirCooledExchangerBlock' NA
			'PEHairpinExchangerBlock' : s + 'pid.heat_exchangers.hairpin_exchanger;verticalLabelPosition=bottom;verticalAlign=top',
			'PEPlateAndFrameHeatExchangerBlock' : s + 'pid.heat_exchangers.plate_and_frame_heat_exchanger;verticalLabelPosition=bottom;verticalAlign=top',
			'PESpiralHeatExchanger' : s + 'pid.heat_exchangers.spiral_heat_exchanger;verticalLabelPosition=bottom;verticalAlign=top',
			'PEUTubeHeatExchangerBlock' : s + 'pid.heat_exchangers.u-tube_heat_exchanger;verticalLabelPosition=bottom;verticalAlign=top',
			'PEDoublePipeHeatBlock' : s + 'pid.heat_exchangers.double_pipe_heat_exchanger;verticalLabelPosition=bottom;verticalAlign=top',
			'PEShellAndTubeHeat1Block' : s + 'pid.heat_exchangers.shell_and_tube_heat_exchanger_1;verticalLabelPosition=bottom;verticalAlign=top',
			'PEShellAndTubeHeat2Block' : s + 'pid.heat_exchangers.shell_and_tube_heat_exchanger_2;verticalLabelPosition=bottom;verticalAlign=top',
			'PEShellAndTubeHeat3Block' : s + 'pid.heat_exchangers.shell_and_tube_heat_exchanger_1;direction=north;verticalLabelPosition=bottom;verticalAlign=top',
			'PESinglePassHeatBlock' : s + 'pid.heat_exchangers.single_pass_heat_exchanger;verticalLabelPosition=bottom;verticalAlign=top',
			'PEHeaterBlock' : s + 'pid.heat_exchangers.heater;verticalLabelPosition=bottom;verticalAlign=top',
//Pumps
			'PEEjectorInjectorBlock' : s + 'pid.fittings.injector;verticalLabelPosition=bottom;verticalAlign=top',
			'PECompressorTurbineBlock' : cs,
			'PEMotorDrivenTurbineBlock' : cs,
//			'PETripleFanBlades2Block' NA
//			'PEFanBlades2Block' : NA
			'PECentrifugalPumpBlock' : s + 'pid.pumps.gas_blower;flipH=1;verticalLabelPosition=bottom;verticalAlign=top',
			'PECentrifugalPump' : s + 'pid.pumps.centrifugal_pump_1;verticalLabelPosition=bottom;verticalAlign=top',
			'PECentrifugalPump2' : s + 'pid.pumps.centrifugal_pump_2;verticalLabelPosition=bottom;verticalAlign=top',
			'PECentrifugalPump3' : s + 'pid.pumps.centrifugal_pump_1;flipH=1;verticalLabelPosition=bottom;verticalAlign=top',
			'PEGearPumpBlock' : s + 'pid.pumps.gear_pump;verticalLabelPosition=bottom;verticalAlign=top',
			'PEHorizontalPump' : s + 'pid.pumps.horizontal_pump;verticalLabelPosition=bottom;verticalAlign=top',
			'PEProgressiveCavityPump' : s + 'pid.pumps.cavity_pump;flipH=1;flipV=1;verticalLabelPosition=bottom;verticalAlign=top',
			'PEScrewPump' : s + 'pid.pumps.screw_pump;verticalLabelPosition=bottom;verticalAlign=top',
			'PEScrewPump2' : s + 'pid.pumps.screw_pump_2;flipH=1;verticalLabelPosition=bottom;verticalAlign=top',
			'PESumpPump' : s + 'pid.pumps.sump_pump;verticalLabelPosition=bottom;verticalAlign=top',
			'PEVacuumPump' : s + 'pid.pumps.vacuum_pump;verticalLabelPosition=bottom;verticalAlign=top',
			'PEVerticalPump' : s + 'pid.pumps.vertical_pump;verticalLabelPosition=bottom;verticalAlign=top',
			'PEVerticalPump2' : s + 'pid.pumps.vertical_pump;verticalLabelPosition=bottom;verticalAlign=top',
//Instruments
			'PEIndicatorBlock' : cs,
			'PEIndicator2Block' : cs,
			'PEIndicator3Block' : s + 'pid2inst.discInst;mounting=field',
			'PEIndicator4Block' : s + 'pid2inst.indicator;mounting=field;indType=inst',
//			'PEIndicator5Block' NA
			'PESharedIndicatorBlock' : cs,
			'PESharedIndicator2Block' : cs,
			'PEComputerIndicatorBlock' : cs,
			'PEProgrammableIndicatorBlock' : cs,
//Valves
			'PEGateValveBlock' : cs, //TODO not all variants covered
			'PEGlobeValveBlock' : cs,
			'PEControlValveBlock' : s + 'pid2valves.valve;valveType=gate;actuator=diaph;verticalLabelPosition=bottom;verticalAlign=top',  //TODO not all variants covered
			'PENeedleValveBlock' : s + 'pid2valves.valve;valveType=needle;verticalLabelPosition=bottom;verticalAlign=top',
//			'PEButterflyValveBlock' NA
			'PEButterflyValve2Block' : s + 'pid2valves.valve;flipH=1;valveType=butterfly;verticalLabelPosition=bottom;verticalAlign=top',
			'PEBallValveBlock' : s + 'pid2valves.valve;valveType=ball;verticalLabelPosition=bottom;verticalAlign=top',
			'PEDiaphragmBlock' : s + 'pid2valves.valve;valveType=ball;verticalLabelPosition=bottom;verticalAlign=top', 
			'PEPlugValveBlock' : s + 'pid2valves.valve;valveType=ball;verticalLabelPosition=bottom;verticalAlign=top',
			'PECheckValveBlock' : s + 'pid2valves.valve;valveType=check;verticalLabelPosition=bottom;verticalAlign=top',
			'PECheckValve2Block' : s + 'pid2valves.valve;valveType=check;verticalLabelPosition=bottom;verticalAlign=top',
			'PEAngleValveBlock' : cs,
			'PEAngleGlobeValveBlock' : cs,
			'PEPoweredValveBlock' : cs,
			'PEFloatOperatedValveBlock' : s + 'pid2valves.valve;valveType=gate;actuator=singActing;verticalLabelPosition=bottom;verticalAlign=top',
			'PENeedleValve2Block' : s + 'pid2valves.valve;valveType=needle;verticalLabelPosition=bottom;verticalAlign=top',
			'PEThreeWayValveBlock' : s + 'pid2valves.valve;valveType=threeWay;actuator=none;verticalLabelPosition=bottom;verticalAlign=top',
//			'PEFourWayValveBlock' NA
//			'PEGaugeBlock' NA
			'PEBleederValveBlock' : s + 'pid2valves.blockBleedValve;actuator=none;verticalLabelPosition=bottom;verticalAlign=top',
//			'PEOrificeBlock' NA
			'PERotameterBlock' : s + 'pid.flow_sensors.rotameter;flipH=1;verticalLabelPosition=bottom;verticalAlign=top',
//Venn Gradient
			'VennGradientColor1' : 'ellipse;fillOpacity=35',
			'VennGradientColor2' : 'ellipse;fillOpacity=35',
			'VennGradientColor3' : 'ellipse;fillOpacity=35',
			'VennGradientColor4' : 'ellipse;fillOpacity=35',
			'VennGradientColor5' : 'ellipse;fillOpacity=35',
			'VennGradientColor6' : 'ellipse;fillOpacity=35',
			'VennGradientColor7' : 'ellipse;fillOpacity=35',
			'VennGradientColor8' : 'ellipse;fillOpacity=35',
//Venn Plain
			'VennPlainColor1' : 'ellipse;fillOpacity=35',
			'VennPlainColor2' : 'ellipse;fillOpacity=35',
			'VennPlainColor3' : 'ellipse;fillOpacity=35',
			'VennPlainColor4' : 'ellipse;fillOpacity=35',
			'VennPlainColor5' : 'ellipse;fillOpacity=35',
			'VennPlainColor6' : 'ellipse;fillOpacity=35',
			'VennPlainColor7' : 'ellipse;fillOpacity=35',
			'VennPlainColor8' : 'ellipse;fillOpacity=35',
//iOS Devices
			'iOS7DeviceiPhone5Portrait' : s + 'ios.iPhone;bgStyle=bgGreen', //TODO
			'iOS7DeviceiPhone5Landscape' : s + 'ios.iPhone;bgStyle=bgGreen', //TODO
			'iOS7DeviceiPadPortrait' : s + 'ios.iPad;bgStyle=bgGreen', //TODO
			'iOS7DeviceiPadLandscape' : s + 'ios.iPad;bgStyle=bgGreen', //TODO
			'iOS7DeviceiPhone6Portrait' : s + 'ios.iPhone;bgStyle=bgGreen', //TODO
			'iOS7DeviceiPhone6Landscape' : s + 'ios.iPhone;bgStyle=bgGreen', //TODO
			'iOS7DeviceiPhone6PlusPortrait' : s + 'ios.iPhone;bgStyle=bgGreen', //TODO
			'iOS7DeviceiPhone6PlusLandscape' : s + 'ios.iPhone;bgStyle=bgGreen', //TODO
//iPhone Elements
			'iOS7StatusBariPhone' : s + 'ios7ui.appBar',
//			'iOS7NavBariPhone' NA
//			'iOS7TabsiPhone' : cs, //TODO
//			'iOS7iPhoneActionSheet' : cs, //TODO
			'iOS7iPhoneKeyboard' : s + 'ios7.misc.keyboard_(letters)',
//			'iOS7TableView' : cs, //TODO
//iPad Elements
			'iOS7StatusBariPad' : s + 'ios7ui.appBar',
//			'iOS7NavBariPad' : cs, //TODO
//			'iOS7TabsiPad' : cs, //TODO
//			'iOS7iPadActionSheet' : cs, //TODO
			'iOS7iPadKeyboard' : s + 'ios7.misc.keyboard_(letters)',
//			'iOS7SplitView'
//			'iOS7iPadPopover'
//Common Elements
//			'iOS7AlertDialog' : cs, //TODO
			'iOS7ProgressBar' : s + 'ios7ui.downloadBar', //TODO
			'iOS7Slider' : s + 'ios7ui.searchBox', //TODO
			'iOS7SearchBar' : s + 'ios7ui.searchBox', 
			'iOS7Button' : '',
			'iOS7TextField' : '',
			'iOS7TextView' : '',
//			'iOS7SegmentedControl' : cs, //TODO
			'iOS7Toggle' : s + 'ios7ui.onOffButton;buttonState=on;strokeColor=#38D145;strokeColor2=#aaaaaa;fillColor=#38D145;fillColor2=#ffffff', //TODO
			'iOS7Stepper' : s + 'ios7.misc.adjust;fillColor=#ffffff;gradientColor=none',
			'iOS7PageControls' : s + 'ios7ui.pageControl;fillColor=#666666;strokeColor=#bbbbbb', //TODO
			'iOS7Block' : '',
//			'iOS7DatePicker' : cs, //TODO
//			'iOS7TimePicker' : cs, //TODO
//			'iOS7CountdownPicker' : cs, //TODO
//iOS Icons
			'iOS7IconArrow left' : s + 'ios7.misc.left',
			'iOS7IconArrow' : s + 'ios7.misc.right',
			'iOS7IconArrow up' : s + 'ios7.misc.up',
			'iOS7IconArrow down' : s + 'ios7.misc.down',
			'iOS7IconWifi' : s + 'ios7.icons.wifi',
			'iOS7IconBluetooth' : s + 'ios7.icons.bluetooth',
			'iOS7IconBattery' : s + 'ios7.icons.battery',
			'iOS7IconSiri' : s + 'ios7.icons.microphone',
			'iOS7IconCheck' : s + 'ios7.icons.select',
			'iOS7IconCreate' : s + 'ios7.icons.add',
			'iOS7IconInfo' : s + 'ios7.icons.info',
			'iOS7IconLocation' : s + 'ios7.icons.location_2',
			'iOS7IconQuestion' : s + 'ios7.icons.help',
			'iOS7IconSearch' : s + 'ios7.icons.looking_glass',
			'iOS7IconToolbox' : s + 'ios7.icons.briefcase',
			'iOS7IconOptions' : s + 'ios7.icons.options',
			'iOS7IconShare' : s + 'ios7.icons.share',
			'iOS7IconTyping' : s + 'ios7.icons.message',
			'iOS7IconCopy' : s + 'ios7.icons.folders_2',
			'iOS7IconChat' : s + 'ios7.icons.messages',
			'iOS7IconOrganize' : s + 'ios7.icons.folder',
			'iOS7IconTrash' : s + 'ios7.icons.trashcan',
			'iOS7IconReply' : s + 'ios7.icons.back',
			'iOS7IconArchive' : s + 'ios7.icons.box',
			'iOS7IconCompose' : s + 'ios7.icons.compose',
			'iOS7IconSend' : s + 'ios7.icons.pointer',
			'iOS7IconDrawer' : s + 'ios7.icons.storage',
			'iOS7IconMail' : s + 'ios7.icons.mail',
			'iOS7IconDocument' : s + 'ios7.icons.document',
			'iOS7IconFlag' : s + 'ios7.icons.flag',
			'iOS7IconBookmarks' : s + 'ios7.icons.book',
			'iOS7IconGlasses' : s + 'ios7.icons.glasses',
			'iOS7IconFiles' : s + 'ios7.icons.folders',
			'iOS7IconDownloads' : s + 'ios7.icons.down',
			'iOS7IconLock' : s + 'ios7.icons.locked',
//			'iOS7IconUnlock' NA
			'iOS7IconCloud' : s + 'ios7.icons.cloud',
//			'iOS7IconCloud-lock' NA
			'iOS7IconOrientation Lock' : s + 'ios7.icons.orientation_lock',
//			'iOS7IconNotification' NA
			'iOS7IconContacts' : s + 'ios7.icons.user',
			'iOS7IconGlobal' : s + 'ios7.icons.globe',
			'iOS7IconSettings' : s + 'ios7.icons.settings',
			'iOS7IconAirplay' : s + 'ios7.icons.move_to_folder',
			'iOS7IconCamera' : s + 'ios7.icons.camera',
			'iOS7IconAirplane' : s + 'signs.transportation.airplane_6;direction=south',
			'iOS7IconCalculator' : s + 'ios7.icons.calculator',
			'iOS7IconPreferences' : s + 'ios7.icons.most_viewed',
			'iOS7IconPhone' : s + 'signs.tech.telephone_3',
			'iOS7IconKeypad' : s + 'ios7.icons.keypad',
			'iOS7IconVoicemail' : s + 'ios7.icons.tape',
			'iOS7IconStar' : s + 'ios7.icons.star',
			'iOS7IconMost Viewed' : s + 'ios7.icons.most_viewed',
			'iOS7IconVideo' : s + 'ios7.icons.video_conversation',
			'iOS7IconVolumne Controls' : s + 'ios7.icons.volume',
			'iOS7IconLocation pin' : s + 'ios7.icons.location',
			'iOS7IconCalendar' : s + 'ios7.icons.calendar',
			'iOS7IconAlarm' : s + 'ios7.icons.alarm_clock',
			'iOS7IconClock' : s + 'ios7.icons.clock',
			'iOS7IconTimer' : s + 'ios7.icons.gauge',
			'iOS7IconVolume down' : s + 'ios7.icons.silent',
			'iOS7IconVolume' : s + 'ios7.icons.volume_2',
			'iOS7IconVolume up' : s + 'ios7.icons.loud',
			'iOS7IconRepeat' : s + 'ios7.icons.reload',
			'iOS7IconRewind' : s + 'ios7.icons.backward',
			'iOS7IconPlay' : s + 'ios7.icons.play',
			'iOS7IconPause' : s + 'ios7.icons.pause',
			'iOS7IconFast forward' : s + 'ios7.icons.forward',
//			'iOS7IconArtists' NA
//			'iOS7IconPlaylist' NA
			'iOS7IconControls' : s + 'ios7.icons.controls',
//			'iOS7IconShuffle' NA
			'iOS7IconPrivacy' : s + 'ios7.icons.privacy',
			'iOS7IconLink' : s + 'ios7.icons.link',
			'iOS7IconLight' : s + 'ios7.icons.flashlight',
			'iOS7IconBrightness' : s + 'ios7.icons.sun',
			'iOS7IconHeart' : s + 'ios7.icons.heart',
			'iOS7IconJava' : s + 'ios7.icons.cup',
			'iOS7IconBox' : s + 'ios7.icons.bag',
			'iOS7IconEye' : s + 'ios7.icons.eye',
			'iOS7IconDo not disturb' : s + 'ios7.icons.moon',
//iOS Activity
//			'iOS7ActivityAdd bookmark' NA
//			'iOS7ActivityAdd to home screen' NA
//			'iOS7ActivityAdd to reading list' NA
//			'iOS7ActivityAirplay' NA
//			'iOS7ActivityAssign to contact' NA
//			'iOS7ActivityCopy' NA
//			'iOS7ActivityPrint' NA
//			'iOS7ActivitySlideshow' NA
//			'iOS7ActivityUse as wallpaper' NA
//UI Containers
			'UI2BrowserBlock' : cs,
			'UI2WindowBlock' : cs, 
			'UI2DialogBlock' : cs,
			'UI2AreaBlock' : 'rounded=1;arcSize=3',
			'UIAreaBlock' : 'rounded=1;arcSize=3;fillColor=none',
			'UI2ElementBlock' : '',
			'UI2AccordionBlock' : cs,
			'UI2TabBarContainerBlock' : cs,
			'UI2TabBar2ContainerBlock' : cs,
			'UI2VTabBarContainerBlock' : cs,
			'UI2VScrollBlock' : s + 'mockup.navigation.scrollBar;direction=north',
			'UI2HScrollBlock' : s + 'mockup.navigation.scrollBar',
			'UI2VerticalSplitterBlock' : s + 'mockup.forms.splitter;direction=north',
			'UI2HorizontalSplitterBlock' : s + 'mockup.forms.splitter',
//UI Widgets
			'UI2ImageBlock' : s + 'mockup.graphics.simpleIcon',
			'UI2VideoBlock' : s + 'mockup.containers.videoPlayer;barHeight=30',
			'UI2AudioBlock' : s + 'mockup.misc.playbackControls',
			'UI2MapBlock' : s + 'mockup.misc.map',
//			'UI2CalendarBlock' NA
			'UI2BarChartBlock' : s + 'mockup.graphics.barChart;strokeColor=none;strokeColor2=none',
			'UI2ColumnChartBlock' : s + 'mockup.graphics.columnChart;strokeColor=none;strokeColor2=none',
			'UI2LineChartBlock' : s + 'mockup.graphics.lineChart;strokeColor=none',
			'UI2PieChartBlock' : s + 'mockup.graphics.pieChart;parts=10,20,35',
			'UI2WebcamBlock' : s + 'mockup.containers.userMale',
			'UI2CaptchaBlock' : s + 'mockup.text.captcha;mainText=',
//			'Image_ui_formatting_toolbar2'
//UI Input
			'UI2ButtonBlock' : 'rounded=1;arcSize=25;',
			'UI2CheckBoxBlock' : cs,
			'UI2HorizontalCheckBoxBlock' : cs,
			'UI2RadioBlock' : cs,
			'UI2HorizontalRadioBlock' : cs,
			'UI2ColorPickerBlock' : s + 'mockup.forms.colorPicker;chosenColor=#aaddff',
			'UI2TextInputBlock' : '',
			'UI2SelectBlock' : cs,
			'UI2VSliderBlock' : cs,
			'UI2HSliderBlock' : cs,
			'UI2DatePickerBlock' : cs,
			'UI2SearchBlock' : cs,
			'UI2NumericStepperBlock' : cs,
			'UI2TableBlock' : cs,
//UI Menus
			'UI2ButtonBarBlock' : cs,
			'UI2VerticalButtonBarBlock' : cs,
			'UI2LinkBarBlock' : cs,
			'UI2BreadCrumbsBlock' : cs,
			'UI2MenuBarBlock' : cs,
			'UI2AtoZBlock' : cs,
			'UI2PaginationBlock' : cs,
			'UI2ContextMenuBlock' : cs,
//			'UI2TreePaneBlock' : cs, //TODO
			'UI2PlaybackControlsBlock' : s + 'mockup.misc.playbackControls;fillColor=#ffffff;strokeColor=#999999;fillColor2=#99ddff;strokeColor2=none;fillColor3=#ffffff;strokeColor3=none',
			'Image_ui_formatting_toolbar' : s + 'mockup.menus_and_buttons.font_style_selector_2',
//UI Misc
			'UI2ProgressBarBlock' : cs,
			'UI2HelpIconBlock' : s + 'mockup.misc.help_icon',
			'UI2BraceNoteBlock' : cs,
			'UI2TooltipBlock' : s + 'basic.rectangular_callout;flipV=1',
			'UI2TooltipSquareBlock' : cs,
			'UI2CalloutBlock' : cs,
			'UI2AlertBlock' : cs,
//iOS 6 iPad Elements
			'Image_ipad_ipad' : s + 'ios.iPad;bgStyle=bgGreen',
			'iPadGrayBackgroundBlock' : '',
			'Image_ipad_top_bar' : s + 'ios.iTopBar2;opacity=50;fillColor=#999999;strokeColor=#cccccc',
//			'Image_ipad_bar_gray' : '',
//			'Image_ipad_bar_semi_trans_black' : '',
//			'Image_ipad_bar_black' : '',
//			'Image_ipad_safari_top' NA
			'Image_ipad_search' : s + 'mockup.forms.searchBox;mainText=;flipH=1',
//			'Image_ipad_alert_dialog' : cs, //TODO
//			'Image_ipad_dialog' : cs, //TODO
			'Image_ipad_popover' : s + 'ios.iOption;barPos=50;pointerPos=top;buttonText=',
//			'Image_ipad_table' : cs, //TODO
//			'Image_ipad_vtab' : cs, //TODO
//iOS 6 iPad Controls
			'Image_ipad_button_black' : '',
			'Image_ipad_button_blue' : '',
			'Image_ipad_button_grayblue' : '',
			'Image_ipad_button_red' : '',
			'Image_ipad_back_button_gray' : s + 'ios.iButtonBack;buttonText=;fillColor=#eeeeee;fillColor2=#aaaaaa',
			'Image_ipad_back_button_black' : s + 'ios.iButtonBack;buttonText=;fillColor=#888888;fillColor2=#000000',
			'Image_ipad_sort_handle' : s + 'ios7.icons.options',
			'Image_ipad_dropdown' : s + 'ios.iComboBox;buttonText=;fillColor=#dddddd;fillColor2=#3D5565',
			'Image_ipad_email_name' : '',
			'Image_ipad_prev_next' : s + 'ios.iPrevNext;strokeColor=#444444;fillColor=#dddddd;fillColor2=#3D5565;fillColor3=#ffffff',
			'Image_ipad_keyboard_portrait' : s + 'ios.iKeybLett',
			'Image_ipad_keyboard_landscape' : s + 'ios.iKeybLett',
//			'Image_ipad_large_tabbed_button' : cs, //TODO
//			'Image_ipad_sort_button' : cs, //TODO
//			'Image_ipad_tab_bar' : cs, //TODO
			'Image_ipad_slider' : s + 'ios.iSlider;barPos=20',
//			'Image_ipad_switch_off'
//iOS 6 iPad Icons
			'Image_ipad_add_icon_blue' : s + 'ios.iAddIcon;fillColor=#8BbEff;fillColor2=#135Ec8;strokeColor=#ffffff',
			'Image_ipad_add_icon_green' : s + 'ios.iAddIcon;fillColor=#7AdF78;fillColor2=#1A9917;strokeColor=#ffffff',
			'Image_ipad_remove_icon' : s + 'ios.iDeleteIcon;fillColor=#e8878E;fillColor2=#BD1421;strokeColor=#ffffff',
			'Image_ipad_arrow_icon' : s + 'ios.iArrowIcon;fillColor=#8BbEff;fillColor2=#135Ec8;strokeColor=#ffffff',
			'Image_ipad_arrow' : s + 'ios7.misc.more',
			'Image_ipad_checkmark' : s + 'ios7.misc.check',
			'Image_ipad_check_off' : 'ellipse', //TODO
			'Image_ipad_location_dot' : 'ellipse',
			'Image_ipad_mark_as_read' : 'ellipse',
			'Image_ipad_pin_green' : s + 'ios.iPin;fillColor2=#00dd00;fillColor3=#004400;strokeColor=#006600',
			'Image_ipad_pin_red' : s + 'ios.iPin;fillColor2=#dd0000;fillColor3=#440000;strokeColor=#660000',
			'Image_ipad_radio_off' : 'ellipse', //TODO
			'Image_ipad_checkbox_off' : 'absoluteArcSize=1;arcSize=' + arcSize + ';rounded=1', //TODO
			'Image_ipad_indicator' : 'absoluteArcSize=1;arcSize=' + arcSize + ';rounded=1;fillColor=#e8878E;gradientColor=#BD1421;strokeColor=#ffffff',
//iOS 6 iPhone Elements
			'Image_iphone_iphone_4' : s + 'ios.iPhone;bg=bgGreen',
			'Image_iphone_bg_black' : '',
			'Image_iphone_bg_gray' : '',
			'Image_iphone_bg_stripe_drk' : s + 'ios.iBgStriped;strokeColor=#18211b;fillColor=#5D7585;strokeColor2=#657E8F',
			'Image_iphone_bg_stripe_lt' : s + 'ios.iBgStriped;strokeColor=#18211b;fillColor=#5D7585;strokeColor2=#657E8F',
			'Image_iphone_bg_white' : '',
			'Image_iphone_top_bar_app' : s + 'ios.iAppBar',
			'Image_iphone_top_bar_home' : s + 'ios.iTopBar2;opacity=50;fillColor=#999999;strokeColor=#cccccc;strokeWidth=1',
			'Image_iphone_bar_top' : '',
			'Image_iphone_bar_semi_trans_black' : '',
			'Image_iphone_bar_semi_trans_blue' : '',
			'Image_iphone_search' : s + 'mockup.forms.searchBox;mainText=;flipH=1',
//			'Image_iphone_table' : cs, //TODO
//			'Image_iphone_table_w_buttons' : cs, //TODO
//			'Image_iphone_table_w_icons' : cs, //TODO
//			'Image_iphone_list' : cs, //TODO
//			'Image_iphone_safari_top' NA
//			'Image_iphone_safari_bottom' NA
//			'Image_iphone_gray_grad_list' : '', //TODO
//			'Image_iphone_alert_bar' NA
//			'Image_iphone_alert_dialog' : cs, //TODO
//			'Image_iphone_dialog' : cs, //TODO
//			'Image_iphone_scroll_pane' : cs, //TODO
			'Image_iphone_alpha_list' : s + 'ios.iAlphaList',
//iOS 6 iPhone Controls
			'Image_iphone_button_black' : '',
			'Image_iphone_button_blue' : '',
			'Image_iphone_button_grayblue' : '',
			'Image_iphone_button_red' : '',
			'Image_iphone_button_lg_light' : '',
			'Image_iphone_button_lg_dark' : '',
			'Image_iphone_button_lg_green' : '',
			'Image_iphone_button_lg_red' : '',
			'Image_iphone_button_lg_yellow' : '',
			'Image_iphone_button_xl_green' : '',
			'Image_iphone_back_button' : s + 'ios.iButtonBack;strokeColor=#444444;buttonText=;fillColor=#dddddd;fillColor2=#3D5565',
			'Image_iphone_prev_next' : s + 'ios.iPrevNext;strokeColor=#444444;fillColor=#dddddd;fillColor2=#3D5565;fillColor3=#ffffff',
			'Image_iphone_sort_handle' : s + 'ios7.icons.options',
			'Image_iphone_slider' : s + 'ios.iSlider;barPos=60',
			'Image_iphone_dropdown' : s + 'ios.iComboBox;buttonText=;fillColor=#dddddd;fillColor2=#3D5565',
			'Image_iphone_email_name' : '',
			'Image_iphone_switch_off' : s + 'android.switch_off;fillColor=#666666', //TODO
			'Image_iphone_keyboard_button_blue' : '',
			'Image_iphone_keyboard_letters' : s + 'ios.iKeybLett',
			'Image_iphone_keyboard_landscape' : s + 'ios.iKeybLett',
//			'Image_iphone_large_tabbed_button' : cs, //TODO
//			'Image_iphone_sort_button' : cs, //TODO
//			'Image_iphone_tab_bar' : cs, //TODO
//			'Image_iphone_picker_multi' : cs, //TODO
//			'Image_iphone_picker_web' : cs, //TODO
//iOS 6 iPhone Icons
			'Image_iphone_add_icon_blue' : s + 'ios.iAddIcon;fillColor=#8BbEff;fillColor2=#135Ec8;strokeColor=#ffffff',
			'Image_iphone_add_icon_green' : s + 'ios.iAddIcon;fillColor=#7AdF78;fillColor2=#1A9917;strokeColor=#ffffff',
			'Image_iphone_remove_icon' : s + 'ios.iDeleteIcon;fillColor=#e8878E;fillColor2=#BD1421;strokeColor=#ffffff',
			'Image_iphone_arrow_icon' : s + 'ios.iArrowIcon;fillColor=#8BbEff;fillColor2=#135Ec8;strokeColor=#ffffff',
			'Image_iphone_arrow' : s + 'ios7.misc.more',
			'Image_iphone_checkmark' : s + 'ios7.misc.check',
			'Image_iphone_check_off' : 'ellipse', //TODO
			'Image_iphone_location_dot' : 'ellipse',
			'Image_iphone_mark_as_read' : 'ellipse',
			'Image_iphone_pin_green' : s + 'ios.iPin;fillColor2=#00dd00;fillColor3=#004400;strokeColor=#006600',
			'Image_iphone_pin_red' : s + 'ios.iPin;fillColor2=#dd0000;fillColor3=#440000;strokeColor=#660000',
			'Image_iphone_radio_off' : 'ellipse', //TODO
//			'Image_iphone_checkbox_off' : '', //TODO
			'Image_iphone_indicator' : 'fillColor=#e8878E;gradientColor=#BD1421;strokeColor=#ffffff',
			'Image_iphone_thread_count' : '',
				
//***************************************************************************************************************
// 2019 mapping
//***************************************************************************************************************

			
// AWS 17 - Analytics
			'AmazonAthena2017' : 'shape=mxgraph.aws3.athena;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1;pointerEvents=1',
			'AmazonCloudSearch2017' : 'shape=mxgraph.aws3.cloudsearch;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1;pointerEvents=1',
			'AmazonCloudSearchsearchdocuments2017' : 'shape=mxgraph.aws3.search_documents;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEMR2017' : 'shape=mxgraph.aws3.emr;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEMRcluster2017' : 'shape=mxgraph.aws3.emr_cluster;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEMREMRengine2017' : 'shape=mxgraph.aws3.emr_engine;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEMREMRengineMapRM32017' : 'shape=mxgraph.aws3.emr_engine_mapr_m3;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEMREMRengineMapRM52017' : 'shape=mxgraph.aws3.emr_engine_mapr_m5;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEMREMRengineMapRM72017' : 'shape=mxgraph.aws3.emr_engine_mapr_m7;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEMRHDFScluster2017' : 'shape=mxgraph.aws3.hdfs_cluster;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonES2017' : 'shape=mxgraph.aws3.elasticsearch_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonKinesis2017' : 'shape=mxgraph.aws3.kinesis;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonKinesisAmazonKinesisAnalytics2017' : 'shape=mxgraph.aws3.kinesis_analytics;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonKinesisAmazonKinesisenabledapp2017' : 'shape=mxgraph.aws3.kinesis_enabled_app;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonKinesisAmazonKinesisFirehose2017' : 'shape=mxgraph.aws3.kinesis_firehose;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonKinesisAmazonKinesisStreams2017' : 'shape=mxgraph.aws3.kinesis_streams;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonQuickSight2017' : 'shape=mxgraph.aws3.quicksight;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRedshift2017' : 'shape=mxgraph.aws3.redshift;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRedshiftdensecomputenode2017' : 'shape=mxgraph.aws3.dense_compute_node;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRedshiftdensestoragenode2017' : 'shape=mxgraph.aws3.dense_storage_node;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSDataPipeline2017' : 'shape=mxgraph.aws3.data_pipeline;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSGlue2017' : 'shape=mxgraph.aws3.glue;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Application Services			
			'AmazonAPIGateway2017' : 'shape=mxgraph.aws3.api_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonAppStream22017' : 'shape=mxgraph.aws3.appstream;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonElasticTranscoder2017' : 'shape=mxgraph.aws3.elastic_transcoder;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSWF2017' : 'shape=mxgraph.aws3.swf;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSWFdecider2017' : 'shape=mxgraph.aws3.decider;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSWFworker2017' : 'shape=mxgraph.aws3.worker;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSStepFunctions2017' : 'shape=mxgraph.aws3.step_functions;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Artificial Intelligence			
			'AmazonLex2017' : 'shape=mxgraph.aws3.lex;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonMachineLearning2017' : 'shape=mxgraph.aws3.machine_learning;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonPolly2017' : 'shape=mxgraph.aws3.polly;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRekognition2017' : 'shape=mxgraph.aws3.rekognition;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Business Productivity			
			'AmazonChime2017' : 'shape=mxgraph.aws3.chime;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonWorkMail2017' : 'shape=mxgraph.aws3.workmail;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonWorkDocs2017' : 'shape=mxgraph.aws3.workdocs;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Compute			
			'AmazonEC22017' : 'shape=mxgraph.aws3.ec2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2AMI2017' : 'shape=mxgraph.aws3.ami;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2AutoScaling2017' : 'shape=mxgraph.aws3.auto_scaling;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2DBoninstance2017' : 'shape=mxgraph.aws3.db_on_instance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2EC2rescue2017' : 'shape=mxgraph.aws3.rescue;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2ElasticIPaddress2017' : 'shape=mxgraph.aws3.elastic_ip;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2instance2017' : 'shape=mxgraph.aws3.instance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2instances2017' : 'shape=mxgraph.aws3.instances;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2instancewithCloudWatch2017' : 'shape=mxgraph.aws3.instance_with_cloudwatch;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2optimizedinstance2017' : 'shape=mxgraph.aws3.optimized_instance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
//			'AmazonEC2SpotFleet2017' : composite,
			'AmazonEC2SpotInstance2017' : 'shape=mxgraph.aws3.spot_instance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2X1instance2017' : 'shape=mxgraph.aws3.x1_instance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonECR2017' : 'shape=mxgraph.aws3.ecr;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonECRECRRegistry2017' : 'shape=mxgraph.aws3.ecr_registry;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonECS2017' : 'shape=mxgraph.aws3.ecs;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonECSECScontainer2017' : 'shape=mxgraph.aws3.ec2_compute_container;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonECSECScontainerAlt12017' : 'shape=mxgraph.aws3.ec2_compute_container_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonECSECScontainerAlt22017' : 'shape=mxgraph.aws3.ec2_compute_container_3;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonLightsail2017' : 'shape=mxgraph.aws3.lightsail;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPC2017' : 'shape=mxgraph.aws3.vpc;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCcustomergateway2017' : 'shape=mxgraph.aws3.customer_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCelasticnetworkadapter2017' : 'shape=mxgraph.aws3.elastic_network_adapter;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCelasticnetworkinterface2017' : 'shape=mxgraph.aws3.elastic_network_interface;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCendpoints2017' : 'shape=mxgraph.aws3.endpoints;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCflowlogs2017' : 'shape=mxgraph.aws3.flow_logs;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCInternetgateway2017' : 'shape=mxgraph.aws3.internet_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCnetworkaccesscontrollist2017' : 'shape=mxgraph.aws3.network_access_controllist;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCrouter2017' : 'shape=mxgraph.aws3.router;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCVPCNATgateway2017' : 'shape=mxgraph.aws3.vpc_nat_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCVPCpeering2017' : 'shape=mxgraph.aws3.vpc_peering;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCVPNconnection2017' : 'shape=mxgraph.aws3.vpn_connection;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCVPNgateway2017' : 'shape=mxgraph.aws3.vpn_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSBatch2017' : 'shape=mxgraph.aws3.batch;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSElasticBeanstalk2017' : 'shape=mxgraph.aws3.elastic_beanstalk;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSElasticBeanstalkapplication2017' : 'shape=mxgraph.aws3.application;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSElasticBeanstalkdeployment2017' : 'shape=mxgraph.aws3.deployment;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSLambda2017' : 'shape=mxgraph.aws3.lambda;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSLambdaLambdaFunction2017' : 'shape=mxgraph.aws3.lambda_function;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'ElasticLoadBalancing2017' : 'shape=mxgraph.aws3.elastic_load_balancing;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'ElasticLoadBalancingApplicationLoadBalancer2017' : 'shape=mxgraph.aws3.application_load_balancer;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'ElasticLoadBalancingELLoadBalancer2017' : 'shape=mxgraph.aws3.classic_load_balancer;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',

// AWS 17 - Contact Center			
			'AmazonConnect2017' : 'shape=mxgraph.aws3.connect;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Containers			
			'AutoScalingGroup2017' : 'rounded=1;arcSize=10;dashed=1;dashPattern=8 3 1 3;verticalAlign=bottom',
			'AvailabilityZone2017' : 'rounded=1;arcSize=10;dashed=1;dashPattern=8 4;verticalAlign=bottom',
			'Region2017' : 'rounded=1;arcSize=10;dashed=1;dashPattern=1 1;verticalAlign=bottom',
			'SecurityGroup2017' : 'verticalAlign=bottom',
			'ElasticBeanStalkContainer2017' : cs,
			'EC2InstanceContents2017' : cs,
			'VPCSubnet2017' : cs,
			'ServerContents2017' : 'rounded=1;arcSize=10;dashed=0;fillColor=#DBDBDB;gradientColor=none;verticalAlign=bottom',
			'VirtualPrivateCloudContainer2017' : cs,
			'AWSCloudContainer2017' : cs,
			'CorporateDataCenterContainer2017' : cs,
			
// AWS 17 - Database			
			'AmazonDynamoDB2017' : 'shape=mxgraph.aws3.dynamo_db;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonDynamoDBAccelerator2017' : 'shape=mxgraph.aws3.db_accelerator;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonDynamoDBattribute2017' : 'shape=mxgraph.aws3.attribute;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonDynamoDBattributes2017' : 'shape=mxgraph.aws3.attributes;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonDynamoDBglobalsecondaryindex2017' : 'shape=mxgraph.aws3.global_secondary_index;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonDynamoDBitem2017' : 'shape=mxgraph.aws3.item;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonDynamoDBitems2017' : 'shape=mxgraph.aws3.items;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonDynamoDBtable2017' : 'shape=mxgraph.aws3.table;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonElasticCache2017' : 'shape=mxgraph.aws3.elasticache;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonElasticCachecachenode2017' : 'shape=mxgraph.aws3.cache_node;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonElasticCacheMemcached2017' : 'shape=mxgraph.aws3.memcached;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonElasticCacheRedis2017' : 'shape=mxgraph.aws3.redis;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDS2017' : 'shape=mxgraph.aws3.rds;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSDBinstance2017' : 'shape=mxgraph.aws3.rds_db_instance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSinstancereadreplica2017' : 'shape=mxgraph.aws3.rds_db_instance_read_replica;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSinstancestandby2017' : 'shape=mxgraph.aws3.rds_db_instance_standby_multi_az;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSMSSQLinstance2017' : 'shape=mxgraph.aws3.ms_sql_instance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSMSSQLinstancealternate2017' : 'shape=mxgraph.aws3.ms_sql_instance_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSMySQLDBinstance2017' : 'shape=mxgraph.aws3.ms_sql_instance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSMySQLinstancealternate2017' : 'shape=mxgraph.aws3.mysql_db_instance_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSoracleDBinstance2017' : 'shape=mxgraph.aws3.oracle_db_instance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSOracleDBinstancealternate2017' : 'shape=mxgraph.aws3.oracle_db_instance_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSPIOP2017' : 'shape=mxgraph.aws3.piop;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSPostgreSQLinstance2017' : 'shape=mxgraph.aws3.postgre_sql_instance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSSQLmaster2017' : 'shape=mxgraph.aws3.sql_master;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRDSSQLslave2017' : 'shape=mxgraph.aws3.sql_slave;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSDMS2017' : 'shape=mxgraph.aws3.database_migration_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSDMSdatabasemigrationworkflowjob2017' : 'shape=mxgraph.aws3.database_migration_workflow_job;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Desktop App Straning			
			'AmazonWorkSpaces2017' : 'shape=mxgraph.aws3.workspaces;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Developer Tools			
			'AWSCodeBuild2017' : 'shape=mxgraph.aws3.codebuild;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCodeCommit2017' : 'shape=mxgraph.aws3.codecommit;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCodeDeploy2017' : 'shape=mxgraph.aws3.codedeploy;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCodePipeline2017' : 'shape=mxgraph.aws3.codepipeline;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCodeStar2017' : 'shape=mxgraph.aws3.codestar;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSXRay2017' : 'shape=mxgraph.aws3.x_ray;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Game Development			
			'AmazonGameLift2017' : 'shape=mxgraph.aws3.gamelift;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - General			
			'AWScloud2017' : 'shape=mxgraph.aws3.cloud;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSManagementConsole2017' : 'shape=mxgraph.aws3.management_console;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'client2017' : 'shape=mxgraph.aws3.management_console;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'corporatedatacenter2017' : 'shape=mxgraph.aws3.corporate_data_center;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'disk2017' : 'shape=mxgraph.aws3.disk;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'forums2017' : 'shape=mxgraph.aws3.forums;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'genericdatabase2017' : 'shape=mxgraph.aws3.generic_database;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'Internet2017' : 'shape=mxgraph.aws3.internet;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'Internetalternate12017' : 'shape=mxgraph.aws3.internet_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'Internetalternate22017' : 'shape=mxgraph.aws3.internet_3;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'mobileclient2017' : 'shape=mxgraph.aws3.mobile_client;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'multimedia2017' : 'shape=mxgraph.aws3.multimedia;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'officebuilding2017' : 'shape=mxgraph.aws3.office_building;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'SAMLtoken2017' : 'shape=mxgraph.aws3.saml_token;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'SSLpadlock2017' : 'shape=mxgraph.aws3.ssl_padlock;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'tapestorage2017' : 'shape=mxgraph.aws3.tape_storage;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'traditionalserver2017' : 'shape=mxgraph.aws3.traditional_server;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'user2017' : 'shape=mxgraph.aws3.user;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'users2017' : 'shape=mxgraph.aws3.users;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'virtualprivatecloud2017' : 'shape=mxgraph.aws3.virtual_private_cloud;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - IoT			
			'AWSIoTlambdafunction2017' : 'shape=mxgraph.aws3.lambda_function;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTfireTVstick2017' : 'shape=mxgraph.aws3.fire_tv_stick;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTfireTV2017' : 'shape=mxgraph.aws3.fire_tv;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTecho2017' : 'shape=mxgraph.aws3.echo;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTAVSenableddevice2017' : 'shape=mxgraph.aws3.alexa_enabled_device;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTalexavoiceservice2017' : 'shape=mxgraph.aws3.alexa_voice_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTalexasmarthomeskill2017' : 'shape=mxgraph.aws3.alexa_smart_home_skill;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTalexaskill2017' : 'shape=mxgraph.aws3.alexa_skill;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTHTTPprotocol2017' : 'shape=mxgraph.aws3.http_protocol;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTHTTP2protocol2017' : 'shape=mxgraph.aws3.http_2_protocol;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoThardwareboard2017' : 'shape=mxgraph.aws3.hardware_board;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTrule2017' : 'shape=mxgraph.aws3.rule;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTpolicy2017' : 'shape=mxgraph.aws3.policy;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTMQTTprotocol2017' : 'shape=mxgraph.aws3.mqtt_protocol;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTaction2017' : 'shape=mxgraph.aws3.action;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTtopic2017' : 'shape=mxgraph.aws3.topic;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTshadow2017' : 'shape=mxgraph.aws3.shadow;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTdesiredstate2017' : 'shape=mxgraph.aws3.desired_state;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTcertificate2017' : 'shape=mxgraph.aws3.certificate;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTreportedstate2017' : 'shape=mxgraph.aws3.reported_state;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTsimulator2017' : 'shape=mxgraph.aws3.simulator;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTservo2017' : 'shape=mxgraph.aws3.servo;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTsensor2017' : 'shape=mxgraph.aws3.sensor;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTactuator2017' : 'shape=mxgraph.aws3.actuator;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingthermostat2017' : 'shape=mxgraph.aws3.thermostat;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingmedicalemergency2017' : 'shape=mxgraph.aws3.medical_emergency;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingtravel2017' : 'shape=mxgraph.aws3.travel;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingcoffeepot2017' : 'shape=mxgraph.aws3.coffee_pot;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingcart2017' : 'shape=mxgraph.aws3.cart;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingcamera2017' : 'shape=mxgraph.aws3.camera;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingpoliceemergency2017' : 'shape=mxgraph.aws3.police_emergency;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingdoorlock2017' : 'shape=mxgraph.aws3.door_lock;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingutility2017' : 'shape=mxgraph.aws3.utility;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingcar2017' : 'shape=mxgraph.aws3.car;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingbank2017' : 'shape=mxgraph.aws3.bank;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingwindfarm2017' : 'shape=mxgraph.aws3.windfarm;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingbicycle2017' : 'shape=mxgraph.aws3.bicycle;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthinghouse2017' : 'shape=mxgraph.aws3.house;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthingfactory2017' : 'shape=mxgraph.aws3.factory;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthinglightbulb2017' : 'shape=mxgraph.aws3.lightbulb;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTthinggeneric2017' : 'shape=mxgraph.aws3.generic;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoTAWSGreengrass2017' : 'shape=mxgraph.aws3.greengrass;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSIoT2017' : 'shape=mxgraph.aws3.aws_iot;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Management			
			'AmazonCloudWatch2017' : 'shape=mxgraph.aws3.cloudwatch;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonCloudWatchalarm2017' : 'shape=mxgraph.aws3.alarm;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonCloudWatcheventeventbased2017' : 'shape=mxgraph.aws3.event_event_based;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonCloudWatcheventtimebased2017' : 'shape=mxgraph.aws3.event_time_based;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonCloudWatchrule2017' : 'shape=mxgraph.aws3.config_rule;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2SystemsManager2017' : 'shape=mxgraph.aws3.ec2_systems_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2SystemsManagerAutomation2017' : 'shape=mxgraph.aws3.automation;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2SystemsManagerdocuments2017' : 'shape=mxgraph.aws3.documents;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2SystemsManagerInventory2017' : 'shape=mxgraph.aws3.inventory;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2SystemsManagerMaintenanceWindow2017' : 'shape=mxgraph.aws3.maintenance_window;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2SystemsManagerParameterStore2017' : 'shape=mxgraph.aws3.parameter_store;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2SystemsManagerPatchManager2017' : 'shape=mxgraph.aws3.patch_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2SystemsManagerRunCommand2017' : 'shape=mxgraph.aws3.run_command;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2SystemsManagerStateManager2017' : 'shape=mxgraph.aws3.state_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCloudFormation2017' : 'shape=mxgraph.aws3.cloudformation;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCloudFormationchangeset2017' : 'shape=mxgraph.aws3.change_set;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCloudFormationstack2017' : 'shape=mxgraph.aws3.stack_aws_cloudformation;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCloudFormationtemplate2017' : 'shape=mxgraph.aws3.template;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCloudTrail2017' : 'shape=mxgraph.aws3.cloudtrail;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSConfig2017' : 'shape=mxgraph.aws3.config;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSManagedServices2017' : 'shape=mxgraph.aws3.managed_services;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSOpsWorks2017' : 'shape=mxgraph.aws3.opsworks;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSOpsWorksapps2017' : 'shape=mxgraph.aws3.apps;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSOpsWorksdeployments2017' : 'shape=mxgraph.aws3.deployments;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSOpsWorksinstances2017' : 'shape=mxgraph.aws3.instances_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSOpsWorkslayers2017' : 'shape=mxgraph.aws3.layers;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSOpsWorksmonitoring2017' : 'shape=mxgraph.aws3.monitoring;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSOpsWorkspermissions2017' : 'shape=mxgraph.aws3.permissions;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSOpsWorksresources2017' : 'shape=mxgraph.aws3.resources;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSOpsWorksstack2017' : 'shape=mxgraph.aws3.stack_aws_opsworks;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSServiceCatalog2017' : 'shape=mxgraph.aws3.service_catalog;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSTrustedAdvisor2017' : 'shape=mxgraph.aws3.trusted_advisor;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSTrustedAdvisorchecklist2017' : 'shape=mxgraph.aws3.checklist;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSTrustedAdvisorchecklistcost2017' : 'shape=mxgraph.aws3.checklist_cost;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSTrustedAdvisorchecklistfaulttolerance2017' : 'shape=mxgraph.aws3.checklist_fault_tolerance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSTrustedAdvisorchecklistperformance2017' : 'shape=mxgraph.aws3.checklist_performance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSTrustedAdvisorchecklistsecurity2017' : 'shape=mxgraph.aws3.checklist_security;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Messaging			
			'AmazonPinpoint2017' : 'shape=mxgraph.aws3.pinpoint;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSES2017' : 'shape=mxgraph.aws3.ses;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSESemail2017' : 'shape=mxgraph.aws3.email;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSNS2017' : 'shape=mxgraph.aws3.sns;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSNSemailnotification2017' : 'shape=mxgraph.aws3.email_notification;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSNSHTTPnotification2017' : 'shape=mxgraph.aws3.http_notification;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSNStopic2017' : 'shape=mxgraph.aws3.topic_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSQS2017' : 'shape=mxgraph.aws3.sqs;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSQSmessage2017' : 'shape=mxgraph.aws3.message;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSQSqueue2017' : 'shape=mxgraph.aws3.queue;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Migration			
			'AWSApplicationDiscoveryService2017' : 'shape=mxgraph.aws3.application_discovery_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSMigrationHub2017' : 'shape=mxgraph.aws3.migration_hub_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSSMS2017' : 'shape=mxgraph.aws3.server_migration_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSSnowball2017' : 'shape=mxgraph.aws3.snowball;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSSnowballimportexport2017' : 'shape=mxgraph.aws3.import_export;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Mobile Services			
			'AmazonCognito2017' : 'shape=mxgraph.aws3.cognito;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonMobileAnalytics2017' : 'shape=mxgraph.aws3.mobile_analytics;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSDeviceFarm2017' : 'shape=mxgraph.aws3.device_farm;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSMobileHub2017' : 'shape=mxgraph.aws3.mobile_hub;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=#AD688A;gradientColor=#F58435;gradientDirection=west;;pointerEvents=1',
			
// AWS 17 - Networking & Content Delivery			
			'AmazonCloudFront2017' : 'shape=mxgraph.aws3.cloudfront;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonCloudFrontdownloaddistribution2017' : 'shape=mxgraph.aws3.download_distribution;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonCloudFrontedgelocation2017' : 'shape=mxgraph.aws3.edge_location;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonCloudFrontstreamingdistribution2017' : 'shape=mxgraph.aws3.streaming_distribution;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRoute532017' : 'shape=mxgraph.aws3.route_53;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRoute53hostedzone2017' : 'shape=mxgraph.aws3.hosted_zone;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonRoute53routetable2017' : 'shape=mxgraph.aws3.route_table;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonVPCinternetgateway2017' : 'shape=mxgraph.aws3.internet_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSDirectConnect2017' : 'shape=mxgraph.aws3.direct_connect;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'ElasticLoadBalancingClassicLoadBalancer2017' : 'shape=mxgraph.aws3.classic_load_balancer;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - On-Demand Workforce			
			'AmazonMechanicalTurk2017' : 'shape=mxgraph.aws3.mechanical_turk;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonMechanicalTurkassignmenttask2017' : 'shape=mxgraph.aws3.assignment_task;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonMechanicalTurkhumanintelligencetasks2017' : 'shape=mxgraph.aws3.human_intelligence_tasks_hit;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonMechanicalTurkrequester2017' : 'shape=mxgraph.aws3.requester;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonMechanicalTurkworkers2017' : 'shape=mxgraph.aws3.users;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - SDKs			
			'Xamarin2017' : 'shape=mxgraph.aws3.android;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'Ruby2017' : 'shape=mxgraph.aws3.android;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'Python2017' : 'shape=mxgraph.aws3.android;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'PHP2017' : 'shape=mxgraph.aws3.android;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'Nodejs2017' : 'shape=mxgraph.aws3.android;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'Net2017' : 'shape=mxgraph.aws3.android;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'JavaScript2017' : 'shape=mxgraph.aws3.android;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'Java2017' : 'shape=mxgraph.aws3.android;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'iOS2017' : 'shape=mxgraph.aws3.android;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSToolsForWindowsPowerShell2017' : 'shape=mxgraph.aws3.toolkit_for_windows_powershell;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSToolkitForVisualStudio2017' : 'shape=mxgraph.aws3.toolkit_for_visual_studio;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSToolkitForEclipse2017' : 'shape=mxgraph.aws3.toolkit_for_eclipse;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCLI2017' : 'shape=mxgraph.aws3.cli;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'Android2017' : 'shape=mxgraph.aws3.android;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 17 - Serurity Identity and Compliance
			'ACMcertificatemanager2017' : 'shape=mxgraph.aws3.certificate_manager_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonCloudDirectory2017' : 'shape=mxgraph.aws3.clouddirectory;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonInspector2017' : 'shape=mxgraph.aws3.inspector;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonInspectoragent2017' : 'shape=mxgraph.aws3.agent;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonMacie2017' : 'shape=mxgraph.aws3.macie;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSArtifact2017' : 'shape=mxgraph.aws3.artifact;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCertificateManager2017' : 'shape=mxgraph.aws3.certificate_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCloudHSM2017' : 'shape=mxgraph.aws3.cloudhsm;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSDirectoryService2017' : 'shape=mxgraph.aws3.directory_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSKMS2017' : 'shape=mxgraph.aws3.kms;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSOrganizations2017' : 'shape=mxgraph.aws3.organizations;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSShield2017' : 'shape=mxgraph.aws3.shield;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSWAF2017' : 'shape=mxgraph.aws3.waf;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSWAFfilteringrule2017' : 'shape=mxgraph.aws3.filtering_rule;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'IAM2017' : 'shape=mxgraph.aws3.iam;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'IAMaddon2017' : 'shape=mxgraph.aws3.add_on;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'IAMAWSSTS2017' : 'shape=mxgraph.aws3.sts;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'IAMAWSSTS22017' : 'shape=mxgraph.aws3.sts_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'IAMdataencryptionkey2017' : 'shape=mxgraph.aws3.data_encryption_key;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'IAMencrypteddata2017' : 'shape=mxgraph.aws3.encrypted_data;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'IAMlongtermsecuritycredential2017' : 'shape=mxgraph.aws3.long_term_security_credential;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=#ffffff;pointerEvents=1',
			'IAMMFAtoken2017' : 'shape=mxgraph.aws3.mfa_token;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'IAMpermissions2017' : 'shape=mxgraph.aws3.permissions_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'IAMrole2017' : 'shape=mxgraph.aws3.role;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'IAMtemporarysecuritycredential2017' : 'shape=mxgraph.aws3.temporary_security_credential;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;fillColor=#ffffff;pointerEvents=1',
			
// AWS 17 - Storage			
			'AmazonEBS2017' : 'shape=mxgraph.aws3.volume;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEFS2017' : 'shape=mxgraph.aws3.efs;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEFSEFSfilesystem2017' : 'shape=mxgraph.aws3.efs_share;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonGlacier2017' : 'shape=mxgraph.aws3.glacier;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonGlacierarchive2017' : 'shape=mxgraph.aws3.archive;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonGlaciervault2017' : 'shape=mxgraph.aws3.vault;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonS32017' : 'shape=mxgraph.aws3.s3;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonS3bucket2017' : 'shape=mxgraph.aws3.bucket;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonS3bucketwithobjects2017' : 'shape=mxgraph.aws3.bucket_with_objects;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonS3object2017' : 'shape=mxgraph.aws3.object;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSStorageGateway2017' : 'shape=mxgraph.aws3.storage_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSStorageGatewaycachedvolume2017' : 'shape=mxgraph.aws3.cached_volume;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSStorageGatewaynoncachedvolume2017' : 'shape=mxgraph.aws3.non_cached_volume;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSStorageGatewayvirtualtapelibrary2017' : 'shape=mxgraph.aws3.virtual_tape_library;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'snapshot2017' : 'shape=mxgraph.aws3.snapshot;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'volume2017' : 'shape=mxgraph.aws3.volume;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			
// AWS 19 Analytics			
			
			'AnalyticsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.analytics;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonAthenaAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.athena;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonCloudSearchAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudsearch;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonElasticsearchServiceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elasticsearch_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonEMRAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.emr;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonKinesisAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kinesis;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonKinesisDataAnalyticsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kinesis_data_analytics;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonKinesisDataFirehoseAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kinesis_data_firehose;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonKinesisDataStreamsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kinesis_data_streams;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonKinesisVideoStreamsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kinesis_video_streams;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonManagedStreamingforKafkaAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.managed_streaming_for_kafka;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonQuickSightAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.quicksight;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonRedshiftAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.redshift;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDataPipelineAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.data_pipeline;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSGlueAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.glue;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSLakeFormationAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lake_formation;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonCloudSearch_SearchDocumentsAWS19' : 'shape=mxgraph.aws4.search_documents;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEMR_ClusterAWS19' : 'shape=mxgraph.aws4.cluster;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEMR_EMREngineAWS19' : 'shape=mxgraph.aws4.emr_engine;;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEMR_EMREngineMapRM3AWS19' : 'shape=mxgraph.aws4.emr_engine_mapr_m3;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEMR_EMREngineMapRM5AWS19' : 'shape=mxgraph.aws4.emr_engine_mapr_m5;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEMR_EMREngineMapRM7AWS19' : 'shape=mxgraph.aws4.emr_engine_mapr_m7;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonRedshift_DenseComputeNodeAWS19' : 'shape=mxgraph.aws4.dense_compute_node;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonRedshift_DenseStorageNodeAWS19' : 'shape=mxgraph.aws4.dense_storage_node;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGlue_CrawlersAWS19' : 'shape=mxgraph.aws4.glue_crawlers;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGlue_DataCatalogAWS19' : 'shape=mxgraph.aws4.glue_data_catalog;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEMR_HDFSClusterAWS19' : 'shape=mxgraph.aws4.cluster;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSDataLake_ResourceAWS19' : 'shape=mxgraph.aws4.data_lake_resource_icon;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			
// AWS 19 - Application Integration			
			'ApplicationIntegrationAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.application_integration;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonMQAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.mq;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonSimpleNotificationServiceSNSAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sns;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonSimpleQueueServiceSQSAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sqs;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSAppSyncAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sqs;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSStepFunctionsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.step_functions;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonSimpleNotificationServiceSNS_EmailNotificationAWS19' : 'shape=mxgraph.aws4.email_notification;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonSimpleNotificationServiceSNS_HTTPNotificationAWS19' : 'shape=mxgraph.aws4.http_notification;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonSimpleNotificationServiceSNS_TopicAWS19' : 'shape=mxgraph.aws4.topic;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonSimpleQueueServiceSQS_MessageAWS19' : 'shape=mxgraph.aws4.message;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonSimpleQueueServiceSQS_QueueAWS19' : 'shape=mxgraph.aws4.queue;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonAPIGateway_EndpointAWS19' : 'shape=mxgraph.aws4.endpoint;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEventBridgeAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.eventbridge;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSElementalAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elemental;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - AR & VR			
			'ARVRAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.ar_vr;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonSumerianAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sumerian;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - Blockchain 			
			'BlockchainAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.blockchain;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonManagedBlockchainAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.managed_blockchain;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonQuantumLedgerDatabaseQLDBAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.quantum_ledger_database;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - Business Applications 			
			'BusinessApplicationAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.business_application;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AlexaForBusinessAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.alexa_for_business;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonChimeAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.chime;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonWorkDocsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.workdocs;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonWorkMailAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.workmail;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - Compute			
			'ComputeAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.compute;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonEC2AWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.ec2;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonEC2AutoScalingAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.auto_scaling2;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonEC2ContainerRegistryAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.ecr;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonElasticContainerServiceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.ecs;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonElasticContainerServiceforKubernetesAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.eks;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonLightsailAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lightsail;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSBatchAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.batch;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSElasticBeanstalkAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_beanstalk;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSFargateAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.fargate;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSLambdaAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lambda;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSOutpostsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.outposts;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSServerlessApplicationRepositoryAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.serverless_application_repository;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'ElasticLoadBalancingELBAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_load_balancing;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'VMwareCloudOnAWSAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.vmware_cloud_on_aws;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonEC2_AMIAWS19' : 'shape=mxgraph.aws4.ami;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_AutoScalingAWS19' : 'shape=mxgraph.aws4.auto_scaling2;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2ContainerRegistry_ImageAWS19' : 'shape=mxgraph.aws4.container_registry_image;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2ContainerRegistry_RegistryAWS19' : 'shape=mxgraph.aws4.registry;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_ElasticIPAddressAWS19' : 'shape=mxgraph.aws4.elastic_ip_address;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_RescueAWS19' : 'shape=mxgraph.aws4.rescue;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonElasticContainerService_Container1AWS19' : 'shape=mxgraph.aws4.container_1;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1;pointerEvents=1',
			'AmazonElasticContainerService_Container2AWS19' : 'shape=mxgraph.aws4.container_2;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonElasticContainerService_Container3AWS19' : 'shape=mxgraph.aws4.container_3;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonElasticContainerService_ServiceAWS19' : 'shape=mxgraph.aws4.ecs_service;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonElasticContainerService_TaskAWS19' : 'shape=mxgraph.aws4.ecs_task;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSElasticBeanstalk_ApplicationAWS19' : 'shape=mxgraph.aws4.application;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSElasticBeanstalk_DeploymentAWS19' : 'shape=mxgraph.aws4.deployment;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSLambda_LambdaFunctionAWS19' : 'shape=mxgraph.aws4.lambda_function;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSThinkboxDeadlineAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.thinkbox_deadline;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;;pointerEvents=1',
			'AWSThinkboxDraftAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.thinkbox_draft;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;;pointerEvents=1',
			'AWSThinkboxFrostAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.thinkbox_frost;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;;pointerEvents=1',
			'AWSThinkboxKrakatoaAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.thinkbox_krakatoa;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;;pointerEvents=1',
			'AWSThinkboxSequoiaAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.thinkbox_sequoia;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;;pointerEvents=1',
			'AWSThinkboxStokeAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.thinkbox_stoke;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;;pointerEvents=1',
			'AWSThinkboxXMeshAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.thinkbox_xmesh;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;;pointerEvents=1',
			
			
// AWS 19 - Cost Management		
			'AWSCostManagementAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cost_management;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSBudgetsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.budgets;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCostandUsageReportAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cost_and_usage_report;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCostExplorerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cost_explorer;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'ReservedInstanceReportingAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.reserved_instance_reporting;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - Customer Engagement			
			'CustomerEngagementAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.customer_engagement;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonConnectAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.connect;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonPinpointAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.pinpoint;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonSimpleEmailServiceSESAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.simple_email_service;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonSimpleEmailServiceSES_EmailAWS19' : 'shape=mxgraph.aws4.email;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			
// AWS 19 - Database			
			'DatabaseAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.database;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonAuroraAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.aurora;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonDocumentDBwithMongoDBcompatibilityAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.documentdb_with_mongodb_compatibility;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonDynamoDBAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.dynamodb;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonElastiCacheAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elasticache;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonNeptuneAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.neptune;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonQuantumLedgerDatabase_QLDBAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.quantum_ledger_database;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonRDSAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.rds;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonRDSonVMwareAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.rds_on_vmware;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonRedshift_blueAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.redshift;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonTimestreamAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.timestream;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDatabaseMigrationServiceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.database_migration_service;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonDynamoDB_AttributeAWS19' : 'shape=mxgraph.aws4.attribute;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonDynamoDB_AttributesAWS19' : 'shape=mxgraph.aws4.attributes;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonDynamoDB_GlobalSecondaryIndexAWS19' : 'shape=mxgraph.aws4.global_secondary_index;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonDynamoDB_ItemAWS19' : 'shape=mxgraph.aws4.item;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonDynamoDB_ItemsAWS19' : 'shape=mxgraph.aws4.items;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonDynamoDB_TableAWS19' : 'shape=mxgraph.aws4.table;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonElastiCache_CacheNodeAWS19' : 'shape=mxgraph.aws4.cache_node;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonElastiCache_ForMemcachedAWS19' : 'shape=mxgraph.aws4.elasticache_for_memcached;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonElastiCache_ForRedisAWS19' : 'shape=mxgraph.aws4.elasticache_for_redis;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonRedshift_DenseComputeNode_blueAWS19' : 'shape=mxgraph.aws4.dense_compute_node;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonRedshift_DenseStorageNode_blueAWS19' : 'shape=mxgraph.aws4.dense_storage_node;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSDatabaseMigrationService_DatabaseMigrationWorkflowAWS19' : 'shape=mxgraph.aws4.database_migration_workflow_job;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonDynamoDBDAXAWS19' : 'shape=mxgraph.aws4.dynamodb_dax;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			
// AWS 19 - Desktop App Streaming			
			'DesktopandAppStreamingAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.desktop_and_app_streaming;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonAppstream2AWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.appstream_20;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonWorkspacesAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.workspaces;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - Developer Tools			
			'DeveloperToolsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.developer_tools;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSCloud9AWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloud9;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCodeBuildAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.codebuild;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCodeCommitAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.codecommit;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCodeDeployAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.codedeploy;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCodePipelineAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.codepipeline;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCodeStarAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.codestar;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCommandLineInterfaceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.command_line_interface;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSToolsAndSDKsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.tools_and_sdks;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSXRayAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.xray;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCloudDevelopmentKitAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloud_development_kit;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - EC2 Instance Types
			'AmazonEC2_InstanceAWS19' : 'shape=mxgraph.aws4.instance2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_InstancesAWS19' : 'shape=mxgraph.aws4.instances;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_InstancewithCloudWatchAWS19' : 'shape=mxgraph.aws4.instance_with_cloudwatch2;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_DBonInstanceAWS19' : 'shape=mxgraph.aws4.db_on_instance2;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_SpotInstanceAWS19' : 'shape=mxgraph.aws4.spot_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_HighMemoryInstanceAWS19' : 'shape=mxgraph.aws4.high_memory_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_A1InstanceAWS19' : 'shape=mxgraph.aws4.a1_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_OptimizedInstanceAWS19' : 'shape=mxgraph.aws4.optimized_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_C4InstanceAWS19' : 'shape=mxgraph.aws4.c4_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_C5InstanceAWS19' : 'shape=mxgraph.aws4.c5_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_C5nInstanceAWS19' : 'shape=mxgraph.aws4.c5n_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_D2InstanceAWS19' : 'shape=mxgraph.aws4.d2_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_F1InstanceAWS19' : 'shape=mxgraph.aws4.f1_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_G3InstanceAWS19' : 'shape=mxgraph.aws4.g3_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_H1InstanceAWS19' : 'shape=mxgraph.aws4.h1_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_I3InstanceAWS19' : 'shape=mxgraph.aws4.i3_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_M4InstanceAWS19' : 'shape=mxgraph.aws4.m4_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_M5aInstanceAWS19' : 'shape=mxgraph.aws4.m5a_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_M5InstanceAWS19' : 'shape=mxgraph.aws4.m5_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_P2InstanceAWS19' : 'shape=mxgraph.aws4.p2_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_P3InstanceAWS19' : 'shape=mxgraph.aws4.p3_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_R4InstanceAWS19' : 'shape=mxgraph.aws4.r4_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_R5aInstanceAWS19' : 'shape=mxgraph.aws4.r5a_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_R5InstanceAWS19' : 'shape=mxgraph.aws4.r5_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_T2InstanceAWS19' : 'shape=mxgraph.aws4.t2_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_T3aInstanceAWS19' : 'shape=mxgraph.aws4.t3a_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_T3InstanceAWS19' : 'shape=mxgraph.aws4.t3_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_X1eInstanceAWS19' : 'shape=mxgraph.aws4.x1e_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_X1InstanceAWS19' : 'shape=mxgraph.aws4.x1_instance2;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonEC2_z1dInstanceAWS19' : 'shape=mxgraph.aws4.z1d_instance;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',

			'AmazonWorkLinkAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.worklink;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - Game Tech			
			'GameTechAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.game_tech;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonGameLiftAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.gamelift;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - General			
			'AWSMarketplaceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.marketplace;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSGeneral_AWSCloudAWS19' : 'shape=mxgraph.aws4.aws_cloud;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_CorporateDataCenterAWS19' : 'shape=mxgraph.aws4.corporate_data_center;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_DiskAWS19' : 'shape=mxgraph.aws4.disk;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_ForumsAWS19' : 'shape=mxgraph.aws4.forums;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_GenericDatabaseAWS19' : 'shape=mxgraph.aws4.generic_database;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_InternetAlt1AWS19' : 'shape=mxgraph.aws4.internet;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_InternetAlt2AWS19' : 'shape=mxgraph.aws4.internet_alt1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_InternetGatewayAWS19' : 'shape=mxgraph.aws4.internet_alt2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_MobileClientAWS19' : 'shape=mxgraph.aws4.mobile_client;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_MultimediaAWS19' : 'shape=mxgraph.aws4.multimedia;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_OfficeBuildingAWS19' : 'shape=mxgraph.aws4.office_building;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_SAMLTokenAWS19' : 'shape=mxgraph.aws4.saml_token;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_SDKAWS19' : 'shape=mxgraph.aws4.external_sdk;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_SSLPadlockAWS19' : 'shape=mxgraph.aws4.ssl_padlock;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_TapeStorageAWS19' : 'shape=mxgraph.aws4.tape_storage;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_ToolkitAWS19' : 'shape=mxgraph.aws4.external_toolkit;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_TraditionalServerAWS19' : 'shape=mxgraph.aws4.traditional_server;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_UserAWS19' : 'shape=mxgraph.aws4.user;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_UsersAWS19' : 'shape=mxgraph.aws4.users;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSGeneral_VirtualPrivateCloudAWS19' : 'shape=mxgraph.aws4.virtual_private_cloud;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'ClientAWS19' : 'shape=mxgraph.aws4.client;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'External_SDKAWS19' : 'shape=mxgraph.aws4.external_sdk;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'External_ToolkitAWS19' : 'shape=mxgraph.aws4.external_toolkit;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			
// AWS 19 - Groups (Note: repeated below without _v2)
			'AWSCloudAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_cloud;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fillColor=none;' + containerStyle,
			'AWSCloudaltAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_cloud_alt;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fillColor=none;' + containerStyle,
			'RegionAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_region;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;dashed=1;fontColor=#0E82B8;fillColor=none;' + containerStyle,
			'AvailabilityZoneAWS19_v2' : 'verticalAlign=top;fillColor=none;dashed=1;dashPattern=5 5;fontColor=#0E82B8;' + containerStyle,
			'SecuritygroupAWS19_v2' : 'verticalAlign=top;fillColor=none;' + containerStyle,
			'AutoScalingAWS19_v2' : 'shape=mxgraph.aws4.groupCenter;grIcon=mxgraph.aws4.group_auto_scaling_group;grStroke=1;verticalAlign=top;fillColor=none;fontColor=#D75F17;spacingTop=25;fillColor=none;' + containerStyle,
			'VirtualprivatecloudVPCAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_vpc;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#2C8723;fillColor=none;' + containerStyle,
			'PrivateSubnetAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_security_group;grStroke=0;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;strokeColor=#0E82B8;fillColor=none;' + containerStyle,
			'PublicSubnetAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_security_group;grStroke=0;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;strokeColor=#2C8723;fontColor=#2C8723;fillColor=none;' + containerStyle,
			'ServercontentsAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_on_premise;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#5A6C86;fillColor=none;' + containerStyle,
			'CorporatedatacenterAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_corporate_data_center;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#5A6C86;fillColor=none;' + containerStyle,
			'ElasticBeanstalkcontainerAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_elastic_beanstalk;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#D75F17;fillColor=none;' + containerStyle,
			'EC2instancecontentsAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_ec2_instance_contents;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#D75F17;fillColor=none;' + containerStyle,
			'SpotFleetAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_spot_fleet;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#D75F17;fillColor=none;' + containerStyle,
			'AWSStepFunctionAWS19_v2' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_step_functions_workflow;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#CB1261;fillColor=none;' + containerStyle,
			'GenericGroup1AWS19_v2' : 'verticalAlign=top;align=center;fillColor=none;dashed=1;dashPattern=5 5;strokeColor=#5A6C86;fontColor=#5A6C86;' + containerStyle,
			'GenericGroup2AWS19_v2' : 'verticalAlign=top;align=center;container=1;pointerEvents=0;collapsible=0;recursiveResize=0;' + containerStyle,

			//Repeated from the above
			'AWSCloudAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_cloud;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fillColor=none;' + containerStyle,
			'AWSCloudaltAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_cloud_alt;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fillColor=none;' + containerStyle,
			'RegionAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_region;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;dashed=1;fontColor=#0E82B8;fillColor=none;' + containerStyle,
			'AvailabilityZoneAWS19' : 'verticalAlign=top;fillColor=none;dashed=1;dashPattern=5 5;fontColor=#0E82B8;strokeOpacity=100;strokeColor=#147eba;' + containerStyle,
			'SecuritygroupAWS19' : 'verticalAlign=top;fillColor=none;fontColor=#DD3522;' + containerStyle,
			'AutoScalingAWS19' : 'shape=mxgraph.aws4.groupCenter;grIcon=mxgraph.aws4.group_auto_scaling_group;grStroke=1;verticalAlign=top;fillColor=none;fontColor=#D75F17;spacingTop=25;fillColor=none;' + containerStyle,
			'VirtualprivatecloudVPCAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_vpc;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#2C8723;fillColor=none;' + containerStyle,
			'PrivateSubnetAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_security_group;grStroke=0;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;strokeColor=#0E82B8;fontColor=#0E82B8;fillOpacity=13;fillColor=#147eba;' + containerStyle,
			'PublicSubnetAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_security_group;grStroke=0;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;strokeColor=#2C8723;fontColor=#2C8723;fillOpacity=13;fillColor=#248814;' + containerStyle,
			'ServercontentsAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_on_premise;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#5A6C86;fillColor=none;' + containerStyle,
			'CorporatedatacenterAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_corporate_data_center;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#5A6C86;fillColor=none;' + containerStyle,
			'ElasticBeanstalkcontainerAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_elastic_beanstalk;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#D75F17;fillColor=none;' + containerStyle,
			'EC2instancecontentsAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_ec2_instance_contents;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#D75F17;fillColor=none;' + containerStyle,
			'SpotFleetAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_spot_fleet;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#D75F17;fillColor=none;' + containerStyle,
			'AWSStepFunctionAWS19' : 'shape=mxgraph.aws4.group;grIcon=mxgraph.aws4.group_aws_step_functions_workflow;verticalAlign=top;align=left;grIconSize=40;spacingLeft=45;spacingTop=5;fontColor=#CB1261;fillColor=none;' + containerStyle,
			'GenericGroup1AWS19' : 'verticalAlign=top;align=center;fillColor=none;dashed=1;dashPattern=5 5;strokeColor=#5A6C86;fontColor=#5A6C86;' + containerStyle,
			'GenericGroup2AWS19' : 'verticalAlign=top;align=center;fillColor=#EAECEF;' + containerStyle,
// AWS 19 - Internet of Things			
			'InternetofThingsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.internet_of_things;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonFreeRTOSlightbgAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.freertos;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoT1ClickAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_1click;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoTButtonAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_button;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoTCoreAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_core;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoTDeviceDefenderAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_device_defender;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoTDeviceManagementAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_device_management;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoTEventsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_events;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoTGreengrassAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.greengrass;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoTSiteWiseAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_sitewise;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoTThingsGraphAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_things_graph;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoTAnalyticsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.iot_analytics;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIoTAnalytics_ChannelAWS19' : 'shape=mxgraph.aws4.iot_analytics_channel;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIoTAnalytics_DataStoreAWS19' : 'shape=mxgraph.aws4.iot_analytics_data_store;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIoTAnalytics_PipelineAWS19' : 'shape=mxgraph.aws4.iot_analytics_pipeline;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_ActionAWS19' : 'shape=mxgraph.aws4.action;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_ActuatorAWS19' : 'shape=mxgraph.aws4.actuator;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_AlexaEnabledDeviceAWS19' : 'shape=mxgraph.aws4.alexa_enabled_device;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_AlexaSkillAWS19' : 'shape=mxgraph.aws4.alexa_skill;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_AlexaVoiceServiceAWS19' : 'shape=mxgraph.aws4.alexa_skill;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_BankAWS19' : 'shape=mxgraph.aws4.bank;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_BicycleAWS19' : 'shape=mxgraph.aws4.bycicle;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_CameraAWS19' : 'shape=mxgraph.aws4.camera;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_CarAWS19' : 'shape=mxgraph.aws4.car;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_CartAWS19' : 'shape=mxgraph.aws4.cart;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_CertificateManagerAWS19' : 'shape=mxgraph.aws4.certificate_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_CoffeePotAWS19' : 'shape=mxgraph.aws4.coffee_pot;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_DesiredStateAWS19' : 'shape=mxgraph.aws4.desired_state;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_DeviceGatewayAWS19' : 'shape=mxgraph.aws4.iot_device_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_DoorLockAWS19' : 'shape=mxgraph.aws4.door_lock;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_EchoAWS19' : 'shape=mxgraph.aws4.echo;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_FactoryAWS19' : 'shape=mxgraph.aws4.factory;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_FireTVAWS19' : 'shape=mxgraph.aws4.firetv;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_FireTVStickAWS19' : 'shape=mxgraph.aws4.firetv_stick;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_GenericAWS19' : 'shape=mxgraph.aws4.generic;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_HardwareBoardAWS19' : 'shape=mxgraph.aws4.hardware_board;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_HouseAWS19' : 'shape=mxgraph.aws4.house;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_HTTP2ProtocolAWS19' : 'shape=mxgraph.aws4.http2_protocol;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_HTTPProtocolAWS19' : 'shape=mxgraph.aws4.http_protocol;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_LambdaFunctionAWS19' : 'shape=mxgraph.aws4.lambda_function;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_LightbulbAWS19' : 'shape=mxgraph.aws4.lightbulb;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_MedicalEmergencyAWS19' : 'shape=mxgraph.aws4.medical_emergency;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_MQTTProtocolAWS19' : 'shape=mxgraph.aws4.mqtt_protocol;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_OverTheAirUpdateAWS19' : 'shape=mxgraph.aws4.iot_over_the_air_update;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_PoliceEmergencyAWS19' : 'shape=mxgraph.aws4.police_emergency;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_PolicyAWS19' : 'shape=mxgraph.aws4.policy;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_ReportedStateAWS19' : 'shape=mxgraph.aws4.reported_state;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_RuleAWS19' : 'shape=mxgraph.aws4.rule;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_SensorAWS19' : 'shape=mxgraph.aws4.sensor;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_ServoAWS19' : 'shape=mxgraph.aws4.servo;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_ShadowAWS19' : 'shape=mxgraph.aws4.shadow;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_SimulatorAWS19' : 'shape=mxgraph.aws4.simulator;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_ThermostatAWS19' : 'shape=mxgraph.aws4.thermostat;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_TopicAWS19' : 'shape=mxgraph.aws4.topic_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_TravelAWS19' : 'shape=mxgraph.aws4.travel;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_UtilityAWS19' : 'shape=mxgraph.aws4.utility;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'IoT_WindfarmAWS19' : 'shape=mxgraph.aws4.windfarm;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIoTGreengrass_ConnectorAWS19' : 'shape=mxgraph.aws4.connector;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIoTAnalytics_DataSetAWS19' : 'shape=mxgraph.aws4.data_set;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIoTAnalytics_NotebookAWS19' : 'shape=mxgraph.aws4.notebook;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			
// AWS 19 - Machine Learning			
			'MachineLearningAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.machine_learning;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonComprehendAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.comprehend;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonElasticInferenceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_inference;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonForecastAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.forecast;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonLexAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.lex;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonPersonalizeAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.personalize;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonPollyAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.polly;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonRekognitionAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.rekognition;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonSageMakerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sagemaker;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonSageMakerGroundTruthAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.sagemaker_ground_truth;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonTextractAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.textract;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonTranscribeAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.transcribe;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonTranslateAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.translate;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'ApacheMXNetonAWSAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.apache_mxnet_on_aws;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDeepLearningAMIsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.deep_learning_amis;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDeepLensAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.deeplens;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDeepRacerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.deepracer;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'TensorFlowonAWSAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.tensorflow_on_aws;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonSageMaker_ModelAWS19' : 'shape=mxgraph.aws4.sagemaker_model;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonSageMaker_NotebookAWS19' : 'shape=mxgraph.aws4.sagemaker_notebook;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonSageMaker_TrainAWS19' : 'shape=mxgraph.aws4.sagemaker_train;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonRekognition_ImageAWS19' : 'shape=mxgraph.aws4.rekognition_image;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonRekognition_VideoAWS19' : 'shape=mxgraph.aws4.rekognition_video;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSDeepLearningContainersAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.deep_learning_containers;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - Management & Governance			
			'ManagementandGovernanceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.management_and_governance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonCloudWatchAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudwatch;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSAutoScalingAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.autoscaling;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCloudFormationAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudformation;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCloudTrailAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudtrail;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCommandLineInterface_pinkAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.command_line_interface;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSConfigAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.config;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSControlTowerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.control_tower;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSLicenseManagerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.license_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSManagedServicesAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.managed_services;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSManagementConsoleAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.management_console;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSOpsWorksAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.opsworks;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSPersonalHealthDashboardAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.personal_health_dashboard;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSServiceCatalogAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.service_catalog;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSystemsManagerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.systems_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSTrustedAdvisorAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.trusted_advisor;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSWellArchitectedToolAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.well_architected_tool;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonCloudWatch_AlarmAWS19' : 'shape=mxgraph.aws4.alarm;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonCloudWatch_EventEventBasedAWS19' : 'shape=mxgraph.aws4.event_event_based;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonCloudWatch_EventTimeBasedAWS19' : 'shape=mxgraph.aws4.event_time_based;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonCloudWatch_RuleAWS19' : 'shape=mxgraph.aws4.rule_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSCloudFormation_ChangeSetAWS19' : 'shape=mxgraph.aws4.change_set;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSCloudFormation_StackAWS19' : 'shape=mxgraph.aws4.stack;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSCloudFormation_TemplateAWS19' : 'shape=mxgraph.aws4.template;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOpsWorks_AppsAWS19' : 'shape=mxgraph.aws4.opsworks_apps;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOpsWorks_DeploymentsAWS19' : 'shape=mxgraph.aws4.deployments;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOpsWorks_InstancesAWS19' : 'shape=mxgraph.aws4.instances_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOpsWorks_LayersAWS19' : 'shape=mxgraph.aws4.layers;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOpsWorks_MonitoringAWS19' : 'shape=mxgraph.aws4.monitoring;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOpsWorks_PermissionsAWS19' : 'shape=mxgraph.aws4.opsworks_permissions;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOpsWorks_ResourcesAWS19' : 'shape=mxgraph.aws4.resources;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOpsWorks_Stack2AWS19' : 'shape=mxgraph.aws4.stack2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSystemsManager_AutomationAWS19' : 'shape=mxgraph.aws4.automation;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSystemsManager_DocumentsAWS19' : 'shape=mxgraph.aws4.documents;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSystemsManager_InventoryAWS19' : 'shape=mxgraph.aws4.inventory;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSystemsManager_MaintenanceWindowsAWS19' : 'shape=mxgraph.aws4.maintenance_windows;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSystemsManager_ParameterStoreAWS19' : 'shape=mxgraph.aws4.parameter_store;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSystemsManager_PatchManagerAWS19' : 'shape=mxgraph.aws4.patch_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSystemsManager_RunCommandAWS19' : 'shape=mxgraph.aws4.run_command;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSystemsManager_StateManagerAWS19' : 'shape=mxgraph.aws4.state_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSTrustedAdvisor_ChecklistAWS19' : 'shape=mxgraph.aws4.checklist;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSTrustedAdvisor_ChecklistCostAWS19' : 'shape=mxgraph.aws4.checklist_cost;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSTrustedAdvisor_ChecklistFaultTolerantAWS19' : 'shape=mxgraph.aws4.checklist_fault_tolerant;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSTrustedAdvisor_ChecklistPerformanceAWS19' : 'shape=mxgraph.aws4.checklist_performance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSTrustedAdvisor_ChecklistSecurityAWS19' : 'shape=mxgraph.aws4.checklist_security;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOrganizationsAWS19_v2' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.organizations;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSystemsManagerOpsCenterAWS19' : 'shape=mxgraph.aws4.systems_manager_opscenter;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			
// AWS 19 - Media Services			
			'MediaServicesAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.media_services;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonElasticTranscoderAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_transcoder;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonKinesisVideoStreams_orangeAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.kinesis_video_streams;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSElementalMediaConnectAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elemental_mediaconnect;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSElementalMediaConvertAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elemental_mediaconvert;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSElementalMediaLiveAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elemental_medialive;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSElementalMediaPackageAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elemental_mediapackage;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSElementalMediaStoreAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elemental_mediastore;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSElementalMediaTailorAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elemental_mediatailor;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - Migration & Transfer			
			'MigrationandTransferAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.migration_and_transfer;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSApplicationDiscoveryServiceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.application_discovery_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDatabaseMigrationService_greenAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.database_migration_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDataSyncAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.datasync;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSMigrationHubAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.migration_hub;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSServerMigrationServiceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.server_migration_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSnowballAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.snowball;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSnowballEdgeAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.snowball_edge;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSnowmobileAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.snowmobile;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSTransferforSFTPAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.transfer_for_sftp;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDataSync_AgentAWS19' : 'shape=mxgraph.aws4.agent2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
// AWS 19 - Mobile			
			'MobileAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.mobile;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonAPIGatewayAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.api_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonPinpoint_redAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.pinpoint;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSAmplifyAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.amplify;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSAppSync_redAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.appsync;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDeviceFarmAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.device_farm;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - Networking & Content Delivery			
			'NetworkingandContentDeliveryAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.networking_and_content_delivery;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonAPIGateway_purpleAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.api_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonCloudFrontAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudfront;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonRoute53AWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.route_53;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonVPCAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.vpc;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonVPCPrivateLinkAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.vpc_privatelink;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSAppMeshAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.app_mesh;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSClientVPNAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.client_vpn;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCloudMapAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloud_map;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDirectConnectAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.direct_connect;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSGlobalAcceleratorAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.global_accelerator;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSTransitGatewayAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.transit_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonCloudFront_DownloadDistributionAWS19' : 'shape=mxgraph.aws4.download_distribution;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonCloudFront_EdgeLocationAWS19' : 'shape=mxgraph.aws4.edge_location;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonCloudFront_StreamingDistributionAWS19' : 'shape=mxgraph.aws4.streaming_distribution;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonRoute53_HostedZoneAWS19' : 'shape=mxgraph.aws4.hosted_zone;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonRoute53_RouteTableAWS19' : 'shape=mxgraph.aws4.route_table;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_CustomerGatewayAWS19' : 'shape=mxgraph.aws4.customer_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_ElasticNetworkAdapterAWS19' : 'shape=mxgraph.aws4.elastic_network_adapter;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_ElasticNetworkInterfaceAWS19' : 'shape=mxgraph.aws4.elastic_network_interface;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_EndpointsAWS19' : 'shape=mxgraph.aws4.endpoints;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_FlowLogsAWS19' : 'shape=mxgraph.aws4.flow_logs;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_InternetGatewayAWS19' : 'shape=mxgraph.aws4.internet_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_NATGatewayAWS19' : 'shape=mxgraph.aws4.nat_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_NetworkAccessControlListAWS19' : 'shape=mxgraph.aws4.network_access_control_list;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_PeeringAWS19' : 'shape=mxgraph.aws4.peering;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_RouterAWS19' : 'shape=mxgraph.aws4.router;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_VPNConnectionAWS19' : 'shape=mxgraph.aws4.vpn_connection;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPC_VPNGatewayAWS19' : 'shape=mxgraph.aws4.vpn_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonNetworkingAPIGateway_EndpointAWS19' : 'shape=mxgraph.aws4.endpoint;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonVPCTrafficMirroringAWS19' : 'shape=mxgraph.aws4.vpc_traffic_mirroring;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSitetoSiteVPNAWS19' : 'shape=mxgraph.aws4.site_to_site_vpn;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'ElasticLoadBalancing_ApplicationloadbalancerAWS19' : 'shape=mxgraph.aws4.application_load_balancer;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'ElasticLoadBalancingELBAWS19_v2' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_load_balancing;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'ElasticLoadBalancing_ClassicloadbalancerAWS19' : 'shape=mxgraph.aws4.classic_load_balancer;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'ElasticLoadBalancing_NetworkloadbalancerAWS19' : 'shape=mxgraph.aws4.network_load_balancer;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			
// AWS 19 - Robotics		
			'RoboticsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.robotics;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSRoboMakerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.robotics;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSRoboMaker_CloudExtensionROSAWS19' : 'shape=mxgraph.aws4.cloud_extension_ros;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSRoboMaker_DevelopmentEnvironmentAWS19' : 'shape=mxgraph.aws4.development_environment;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSRoboMaker_FleetManagementAWS19' : 'shape=mxgraph.aws4.fleet_management;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSRoboMaker_SimulationAWS19' : 'shape=mxgraph.aws4.simulation;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			
// AWS 19 - Satellite			
			'SatelliteAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.satellite;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AWSGroundStationAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.ground_station;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// AWS 19 - Security, Identity & Compliance			
			'SecurityIdentityandComplianceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.security_identity_and_compliance;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonCloudDirectoryAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloud_directory;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonCognitoAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cognito;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonGuardDutyAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.guardduty;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonInspectorAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.inspector;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonMacieAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.macie;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSArtifactAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.artifact;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCertificateManagerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.certificate_manager_3;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSCloudHSMAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.cloudhsm;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSDirectoryServiceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.directory_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSFirewallManagerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.firewall_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSIdentityandAccessManagement_IAMAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.identity_and_access_management;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSKeyManagementServiceAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.key_management_service;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSOrganizationsAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.organizations;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSecretsManagerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.secrets_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSecurityHubAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.security_hub;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSShieldAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.shield;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSingleSignOnAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.single_sign_on;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSWAFAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.waf;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonInspector_AgentAWS19' : 'shape=mxgraph.aws4.agent;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSCertificateManager_CertificateManagerAWS19' : 'shape=mxgraph.aws4.certificate_manager_2;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIdentityandAccessManagementIAM_AddonAWS19' : 'shape=mxgraph.aws4.addon;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIdentityandAccessManagementIAM_AWSSTSAWS19' : 'shape=mxgraph.aws4.sts;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIdentityandAccessManagementIAM_AWSSTSAlternateAWS19' : 'shape=mxgraph.aws4.sts_alternate;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIdentityandAccessManagementIAM_DataEncryptionKeyAWS19' : 'shape=mxgraph.aws4.data_encryption_key;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIdentityandAccessManagementIAM_EncryptedDataAWS19' : 'shape=mxgraph.aws4.encrypted_data;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIdentityandAccessManagementIAM_LongtermSecurityCredentialAWS19' : 'shape=mxgraph.aws4.long_term_security_credential;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIdentityandAccessManagementIAM_MFATokenAWS19' : 'shape=mxgraph.aws4.mfa_token;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIdentityandAccessManagementIAM_PermissionsAWS19' : 'shape=mxgraph.aws4.permissions;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIdentityandAccessManagementIAM_RoleAWS19' : 'shape=mxgraph.aws4.role;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSIdentityandAccessManagementIAM_TemporarySecurityCredentialAWS19' : 'shape=mxgraph.aws4.temporary_security_credential;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOrganizations_AccountAWS19' : 'shape=mxgraph.aws4.organizations_account;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSOrganizations_OrganizationalUnitAWS19' : 'shape=mxgraph.aws4.organizations_organizational_unit;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSShield_ShieldAdvancedAWS19' : 'shape=mxgraph.aws4.shield_shield_advanced;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSWAF_FilteringruleAWS19' : 'shape=mxgraph.aws4.filtering_rule;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSADConnectorAWS19' : 'shape=mxgraph.aws4.ad_connector;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSimpleADAWS19' : 'shape=mxgraph.aws4.simple_ad;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSManagedMicrosoftADAWS19' : 'shape=mxgraph.aws4.managed_ms_ad;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSResourceAccessManagerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.resource_access_manager;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
			
// AWS 19 - Storage
			'StorageAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.storage;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;pointerEvents=1',
			'AmazonElasticBlockStoreEBSAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_block_store;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonElasticFileSystem_EFSAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.elastic_file_system;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonFSxAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.fsx;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonFSxforLustreAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.fsx_for_lustre;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonFSxforWindowsFileServerAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.fsx_for_windows_file_server;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonS3GlacierAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.glacier;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonSimpleStorageServiceS3AWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.s3;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSBackupAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.backup;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSnowball_greenAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.snowball;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSnowballEdge_greenAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.snowball_edge;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSSnowmobile_greenAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.snowmobile;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AWSStorageGatewayAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.storage_gateway;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'AmazonElasticBlockStoreEBS_SnapshotAWS19' : 'shape=mxgraph.aws4.snapshot;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonElasticBlockStoreEBS_VolumeAWS19' : 'shape=mxgraph.aws4.volume;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonS3Glacier_ArchiveAWS19' : 'shape=mxgraph.aws4.archive;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonS3Glacier_VaultAWS19' : 'shape=mxgraph.aws4.vault;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonSimpleStorageServiceS3_BucketAWS19' : 'shape=mxgraph.aws4.bucket;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonSimpleStorageServiceS3_BucketwithObjectsAWS19' : 'shape=mxgraph.aws4.bucket_with_objects;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonSimpleStorageServiceS3_ObjectAWS19' : 'shape=mxgraph.aws4.object;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSSnowFamily_SnowballImportExportAWS19' : 'shape=mxgraph.aws4.import_export;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSStorageGateway_CachedVolumeAWS19' : 'shape=mxgraph.aws4.cached_volume;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSStorageGateway_NonCachedVolumeAWS19' : 'shape=mxgraph.aws4.non_cached_volume;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AWSStorageGateway_VirtualTapeLibraryAWS19' : 'shape=mxgraph.aws4.virtual_tape_library;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'AmazonElasticFileSystem_EFS_FilesystemAWS19' : 'shape=mxgraph.aws4.file_system;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=none;pointerEvents=1',
			'EFSInfrequentAccessAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.efs_infrequentaccess;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			'EFSStandardAWS19' : 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.efs_standard;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;strokeColor=#ffffff;pointerEvents=1',
			
// GCP - Service Cards			
			'GCPServiceCardApplicationSystemBlock' : cs,
			'GCPServiceCardAuthorizationBlock' : cs,
			'GCPServiceCardBlankBlock' : cs,
			'GCPServiceCardReallyBlankBlock' : cs,
			'GCPServiceCardBucketBlock' : cs,
			'GCPServiceCardCDNInterconnectBlock' : cs,
			'GCPServiceCardCloudDNSBlock' : cs,
			'GCPServiceCardClusterBlock' : cs,
			'GCPServiceCardDiskSnapshotBlock' : cs,
			'GCPServiceCardEdgePopBlock' : cs,
			'GCPServiceCardFrontEndPlatformServicesBlock' : cs,
			'GCPServiceCardGatewayBlock' : cs,
			'GCPServiceCardGoogleNetworkBlock' : cs,
			'GCPServiceCardImageServicesBlock' : cs,
			'GCPServiceCardLoadBalancerBlock' : cs,
			'GCPServiceCardLocalComputeBlock' : cs,
			'GCPServiceCardLocalStorageBlock' : cs,
			'GCPServiceCardLogsAPIBlock' : cs,
			'GCPServiceCardMemcacheBlock' : cs,
			'GCPServiceCardNATBlock' : cs,
			'GCPServiceCardPaymentFormBlock' : cs,
			'GCPServiceCardPushNotificationsBlock' : cs,
			'GCPServiceCardScheduledTasksBlock' : cs,
			'GCPServiceCardServiceDiscoveryBlock' : cs,
			'GCPServiceCardSquidProxyBlock' : cs,
			'GCPServiceCardTaskQueuesBlock' : cs,
			'GCPServiceCardVirtualFileSystemBlock' : cs,
			'GCPServiceCardVPNGatewayBlock' : cs,
			
// GCP - Device Cards			
			'GCPInputDatabase' : cs,
			'GCPInputRecord' : cs,
			'GCPInputPayment' : cs,
			'GCPInputGateway' : cs,
			'GCPInputLocalCompute' : cs,
			'GCPInputBeacon' : cs,
			'GCPInputStorage' : cs,
			'GCPInputList' : cs,
			'GCPInputStream' : cs,
			'GCPInputMobileDevices' : cs,
			'GCPInputCircuitBoard' : cs,
			'GCPInputLive' : cs,
			'GCPInputUsers' : cs,
			'GCPInputLaptop' : cs,
			'GCPInputApplication' : cs,
			'GCPInputLightbulb' : cs,
			'GCPInputGame' : cs,
			'GCPInputDesktop' : cs,
			'GCPInputDesktopAndMobile' : cs,
			'GCPInputWebcam' : cs,
			'GCPInputSpeaker' : cs,
			'GCPInputRetail' : cs,
			'GCPInputReport' : cs,
			'GCPInputPhone' : cs,
			'GCPInputBlank' : cs,

// Site Map	
			'SMPage' : cs,
			'SMHome' : s + 'sitemap.home;strokeColor=#000000;fillColor=#E6E6E6',
			'SMGallery' : s + 'sitemap.gallery;strokeColor=#000000;fillColor=#E6E6E6',
			'SMShopping' : s + 'sitemap.shopping;strokeColor=#000000;fillColor=#E6E6E6',
			'SMMap' : s + 'sitemap.map;strokeColor=#000000;fillColor=#E6E6E6',
			'SMAthletics' : s + 'sitemap.sports;strokeColor=#000000;fillColor=#E6E6E6',
			'SMLogin' : s + 'sitemap.login;strokeColor=#000000;fillColor=#E6E6E6',
			'SMPrint' : s + 'sitemap.print;strokeColor=#000000;fillColor=#E6E6E6',
			'SMScript' : s + 'sitemap.script;strokeColor=#000000;fillColor=#E6E6E6',
			'SMSearch' : s + 'sitemap.search;strokeColor=#000000;fillColor=#E6E6E6',
			'SMSettings' : s + 'sitemap.settings;strokeColor=#000000;fillColor=#E6E6E6',
			'SMSitemap' : s + 'sitemap.sitemap;strokeColor=#000000;fillColor=#E6E6E6',
			'SMSuccess' : s + 'sitemap.success;strokeColor=#000000;fillColor=#E6E6E6',
			'SMVideo' : s + 'sitemap.video;strokeColor=#000000;fillColor=#E6E6E6',
			'SMAudio' : s + 'sitemap.audio;strokeColor=#000000;fillColor=#E6E6E6',
			'SMBlog' : s + 'sitemap.blog;strokeColor=#000000;fillColor=#E6E6E6',
			'SMCalendar' : s + 'sitemap.calendar;strokeColor=#000000;fillColor=#E6E6E6',
			'SMChart' : s + 'sitemap.chart;strokeColor=#000000;fillColor=#E6E6E6',
			'SMCloud' : s + 'sitemap.cloud;strokeColor=#000000;fillColor=#E6E6E6',
			'SMDocument' : s + 'sitemap.document;strokeColor=#000000;fillColor=#E6E6E6',
			'SMDownload' : s + 'sitemap.download;strokeColor=#000000;fillColor=#E6E6E6',
			'SMError' : s + 'sitemap.error;strokeColor=#000000;fillColor=#E6E6E6',
			'SMForm' : s + 'sitemap.form;strokeColor=#000000;fillColor=#E6E6E6',
			'SMGame' : s + 'sitemap.game;strokeColor=#000000;fillColor=#E6E6E6',
			'SMJobs' : s + 'sitemap.jobs;strokeColor=#000000;fillColor=#E6E6E6',
			'SMLucid' : s + 'sitemap.home;strokeColor=#000000;fillColor=#E6E6E6',
			'SMNewspress' : s + 'sitemap.news;strokeColor=#000000;fillColor=#E6E6E6',
			'SMPhoto' : s + 'sitemap.photo;strokeColor=#000000;fillColor=#E6E6E6',
			'SMPortfolio' : s + 'sitemap.portfolio;strokeColor=#000000;fillColor=#E6E6E6',
			'SMPricing' : s + 'sitemap.pricing;strokeColor=#000000;fillColor=#E6E6E6',
			'SMProfile' : s + 'sitemap.profile;strokeColor=#000000;fillColor=#E6E6E6',
			'SMSlideshow' : s + 'sitemap.slideshow;strokeColor=#000000;fillColor=#E6E6E6',
			'SMUpload' : s + 'sitemap.upload;strokeColor=#000000;fillColor=#E6E6E6',
//SVG shapes
			'SVGPathBlock2' : cs,
//Special cases
			'PresentationFrameBlock' : cs,
//Timeline
//TODO Timeline shapes are postponed, this code is a work-in-progress
			'TimelineBlock' : cs,
			'TimelineMilestoneBlock' : cs,
			'TimelineIntervalBlock' : cs,
			'MinimalTextBlock' : 'strokeColor=none;fillColor=none',
//Freehand			
			'FreehandBlock' : cs,
//ExtShapes
			'ExtShapeLaptopBlock': ss + 'citrix.laptop_2;verticalLabelPosition=bottom;verticalAlign=top',
			'ExtShapeServerBlock': ss + 'citrix.tower_server;verticalLabelPosition=bottom;verticalAlign=top',
			'ExtShapeCloudBlock': ss + 'citrix.cloud;verticalLabelPosition=bottom;verticalAlign=top',
			'ExtShapeUserBlock': ss + 'aws3d.end_user;verticalLabelPosition=bottom;verticalAlign=top;fillColor=#073763',
			'ExtShapeWorkstationLCDBlock': ss + 'veeam.3d.workstation;verticalLabelPosition=bottom;verticalAlign=top',
//Infographics
			'InfographicsBlock': cs,
//Other
			'FlexiblePolygonBlock': cs,
			'PersonRoleBlock' : cs
	};
	
	function mapImgUrl(imgUrl)
	{
		if (imgUrl && LucidImporter.imgSrcRepl != null)
		{
			var attMap = LucidImporter.imgSrcRepl.attMap;
					
			if (attMap[imgUrl])
			{
				imgUrl = attMap[imgUrl];
			}
			else
			{
				var imgRepl = LucidImporter.imgSrcRepl.imgRepl;
				
				for (var i = 0; i < imgRepl.length; i++)
				{
					var repl = imgRepl[i];
					imgUrl = imgUrl.replace(repl.searchVal, repl.replVal);
				}
				
				LucidImporter.hasExtImgs = true;
			}
		}
	
		return imgUrl;
	};
	
	function mapFontFamily(fontFamily)
	{
		//We support a single font only since we can have one mapping only
		gFontFamilyStyle = '';
		
		try
		{
			if (fontFamily)
			{
				var mappedFont = null;
				
				if (LucidImporter.advImpConfig && LucidImporter.advImpConfig.fontMapping)
				{
					mappedFont = LucidImporter.advImpConfig.fontMapping[fontFamily];
				}
				
				if (mappedFont)
				{
					for (var key in mappedFont)
					{
						gFontFamilyStyle += key + '=' + mappedFont[key] + ';';
					}
					
					return mappedFont['fontFamily']? 'font-family: ' + mappedFont['fontFamily'] : '';
				}
				else if (fontFamily != defaultLucidFont)
				{
					gFontFamilyStyle = 'fontFamily=' + fontFamily + ';';
					return 'font-family: ' + fontFamily + ';';
				}
			}
		}
		catch(e) {}
		
		return '';
	};
	
	function fix1Digit(num)
	{
		return  Math.round(num * 10) / 10;	
	};
	
	// actual code start
	//TODO This can be optimized more
	function convertTxt2Html(txt, srcM, props)
	{
		var blockStyles = {'a': true, 'il': true, 'ir': true, 'mt': true, 'mb': true, 'p': true, 't': true, 'l': true};
		var nonBlockStyles = {'lk': true, 's': true, 'c': true, 'b': true, 'fc': true, 'i': true, 'u': true, 'k': true, 'f': true, 'ac': true};

		srcM.sort(function(a, b)
		{
			return a.s - b.s;
		});
		
		var m = srcM.filter(function(m) 
		{ 
			return nonBlockStyles[m.n];
		});
		
		//To prevent losing beginning of a label when first one is not at zero (links case) 
		if (m[0] && m[0].s != 0)
		{
			m.unshift({s: 0, n: 'dummy', v: '', e: m[0].s});
		}
		
		var globalStyles = srcM.filter(function(m)
		{
			return blockStyles[m.n];
		});
		
		//Add missing block that defauls to center
		var newlines = [0], nl = 0;
		
		while ((nl = txt.indexOf('\n', nl)) > 0)
		{
			nl++;
			newlines.push(nl);
		}
		
		var expectedS = 0;
		
		for (var i = 0; i < globalStyles.length; i++)
		{
			if (globalStyles[i].s > newlines[expectedS])
			{
				globalStyles.splice(i, 0, {s: newlines[expectedS], n: 'a', v: props.TextAlign || 'center'});
			}
			else
			{
				var skip = 0;
				
				while(i + skip < globalStyles.length && globalStyles[i + skip].s == newlines[expectedS])
				{
					skip++;
				}
				
				if (skip > 1)
				{
					i += skip - 1; // -1 since loop will increment again
				}
			}
			
			expectedS++;
		}
		
		if (newlines[expectedS] != null)
		{
			globalStyles.push({s: newlines[expectedS], n: 'a', v: props.TextAlign || 'center'});
		}
		
		var html = '', ends = m.slice();

		ends.sort(function(a, b)
		{
			return a.e - b.e;
		});

		var i = 0, j = 0, k = 0, curStyles = {}, curBlockStyles = {}, openTags = [], openTagsCount = [], 
			openBlockTags = [], blockActive = false, listActive = false, listType;
		
		function startBlockTag(styles, nonBlockStyles)
		{
			var str = '';
			var t = styles['t'];

			var l = styles['l'] || {v: t && t.v == 'ul'? 'auto' : 'decimal'};
			
			if (t != null && (listActive == false || listActive != t.v || listType != l.v))
			{
				if (listActive)
				{
					str += endBlockTag(true);
				}
				
				listActive = t.v;
				listType = l.v;
				
				if (t.v == 'ul')
				{
					str += '<ul ';
					openBlockTags.push('ul');
				}
				else
				{
					str += '<ol ';
					openBlockTags.push('ol');
				}
				
				str += 'style="margin: 0px; padding-left: 10px;list-style-position: inside; list-style-type:';
				
				if (t.v == 'hl')
				{
					str += 'upper-roman';
				}
				else
				{
					switch(l.v)
					{
						case 'auto':
							str += 'disc';
							break;
						case 'inv': //Approx
							str += 'circle';
							break;
						case 'disc': 
							str += 'circle';
							break;
						case 'trib': //Approx
							str += 'square';
							break;
						case 'square':
							str += 'square';
							break;	
						case 'dash': //Approx
							str += 'square';
							break;	
						case 'heart': //Approx
							str += 'disc';
							break;
						default:
							str += 'decimal';					
					}
				}
				
				str += '">';
			}
			else if (t == null)
			{
				if (listActive)
				{
					str += endBlockTag(true);
					listActive = false;
				}

				str += '<div style="';
				openBlockTags.push('div');
			}

			if (t != null)
			{
				str += '<li style="text-align:' + (styles['a']? styles['a'].v : (props.TextAlign || 'center')) + ';';
				var color, fontSize;
				
				// Find font size/color
				if (nonBlockStyles != null)
				{
					if (nonBlockStyles['c'])
					{
						color = nonBlockStyles['c'].v;
					}
					
					if (nonBlockStyles['s'])
					{
						fontSize = nonBlockStyles['s'].v;
					}
				}
					
				try
				{
					var s = m[i], e = ends[j];
					var it = i;
					
					if (s && e && s.s < e.e) //s can be null when all starts are used, e ends after s BUT sometimes there are errors in the file
					{
						var curS = s.s;
		
						while(s != null && s.s == curS)
						{
							if (s.n == 's')
							{
								fontSize = s.v;
							}
							else if (s.n == 'c')
							{
								color = s.v;
							}
							
							s = m[++it];
						}
					}					
				}
				catch(e)
				{
					console.log(e);
				}
				
				color = rgbToHex(color);
				
				if (color != null)
				{
					color = color.substring(0, 7);
					str += 'color:' + color + ';';
				}
				
				//Ignore zero font-size
				if (fontSize)
				{
					str += 'font-size:' + fix1Digit(fontSize * scale) + 'px;';
				}
				
				str += '">';
				openBlockTags.push('li');
				str += '<span style="';
				openBlockTags.push('span');
			}
			
			if (!listActive)
			{
				var tmp = styles['a']? styles['a'].v : (props.TextAlign || 'center');
				var jc = tmp;
				
				if (tmp == 'left')
				{
					jc = 'flex-start';
				}
				else if (tmp == 'right')
				{
					jc = 'flex-end';
				}
				
				str += 'display: flex; justify-content: ' + jc + '; text-align: ' + tmp + '; align-items: baseline; font-size: 0; line-height: 1.25;';
			}
			
			if (styles['il'])
			{
				str += 'margin-left: ' + Math.max(0, fix1Digit(styles['il'].v * scale - (listActive? 28 : 0))) + 'px;';
			}

			if (styles['ir'])
			{
				str += 'margin-right: ' + fix1Digit(styles['ir'].v * scale) + 'px;';
			}

			if (styles['mt'])
			{
				str += 'margin-top: ' + fix1Digit(styles['mt'].v * scale) + 'px;';
			}

			if (styles['mb'])
			{
				str += 'margin-bottom: ' + fix1Digit(styles['mb'].v * scale) + 'px;';
			}

			str += 'margin-top: -2px;">';
			
			if (!listActive)
			{
				str += '<span>';// Is this needed?
				openBlockTags.push('span');
			}
			
			return str;
		};

		
		function startTag(styles)
		{
			if (mxUtils.isEmptyObject(styles))
			{
				return '';
			}
			
			var str = '';
			var tagCount = 0;

			if (styles['lk'])
			{
				var lk = styles['lk'];
				
				if (lk.v != null && lk.v.length > 0)
				{
					str += '<a href="' + getLink(lk.v[0]) + '">';
					openTags.push('a');
					tagCount++;
				}
			}
			
			str += '<span style="';
			openTags.push('span');
			tagCount++;

			//Ignore zero font-size
			str += 'font-size:' + (styles['s'] && styles['s'].v? fix1Digit(styles['s'].v * scale) : defaultFontSize) + 'px;';

			if (styles['c'])
			{
				var v = rgbToHex(styles['c'].v);
				
				if (v != null)
				{
					v = v.substring(0, 7);
					str += 'color:' + v + ';';
				}
			}

			if ((styles['b'] && styles['b'].v) || (styles['fc'] && styles['fc'].v && styles['fc'].v.indexOf('Bold') == 0))
			{
				str += 'font-weight: bold;';
			}
			
			if (styles['i'] && styles['i'].v)
			{
				str += 'font-style: italic;';
			}
			
			if (styles['ac'] && styles['ac'].v)
			{
				str += 'text-transform: uppercase;';
			}
			
			var fontFamily = null;
			
			if (styles['f'])
			{
				fontFamily = styles['f'].v;
			}
			else if (props.Font)
			{
				fontFamily = props.Font;
			}
			
			str += mapFontFamily(fontFamily);
			
			var td = [];

			if (styles['u'] && styles['u'].v)
			{
				td.push('underline');
			}

			if (styles['k'] && styles['k'].v)
			{
				td.push('line-through');
			}
			
			if (td.length > 0)
			{
				str += 'text-decoration: ' + td.join(' ') + ';';
			}
			
			str += '">'
			openTagsCount.push(tagCount);

			return str;
		};

		function endBlockTag(force)
		{
			var str = '';
			
			do
			{
				var tag = openBlockTags.pop();
				
				if (!force && listActive && (tag == 'ul' || tag == 'ol'))
				{
					openBlockTags.push(tag);
					break;
				}
				
				str += '</' + tag + '>';
			}
			while(openBlockTags.length > 0);

			return str;
		};

		function endTag(txt, curS, curE, all)
		{
			var str = txt? txt.substring(curS, curE) : '';

			//TODO Check this is always the case. Most of the time this is correct, also, the empty tag should be removed
			if (listActive)
			{
				str = str.trim();
			}
			
			//If an endTag is called with no open tags, add a dummy startTag to have a font size
			if (openTags.length == 0 && str.length > 0)
			{
				str = startTag({dummy: 1}) + str;
			}
			
			str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			
			do
			{
				var count = openTagsCount.pop();
	
				for (var i = 0; i < count; i++) 
				{
					var tag = openTags.pop();
					str += '</' + tag + '>';
				}
			}
			while(all && openTags.length > 0);

			return str;
		};
		
		var curS = 0, curE = 0, maxE = txt.length, firstBlock = true;
		
		while (k < globalStyles.length || firstBlock)
		{
			firstBlock = false;
			
			if (k < globalStyles.length)
			{
				var bs = globalStyles[k], curBS = globalStyles[k].s;

				if (blockActive)
				{
					curBlockStyles = {};
					html += endTag(txt, curS, maxE, true); //End any open tag
					curE = curS = maxE;
					html += endBlockTag(); 
				}
		
				while(bs != null && bs.s == curBS)
				{
					curBlockStyles[bs.n] = bs;
					bs = globalStyles[++k];
				}
				
				if (bs != null)
				{
					maxE = bs.s;
				}
				else
				{
					maxE = txt.length;
				}
				
				html += startBlockTag(curBlockStyles, curStyles);
				
				if (blockActive)
				{
					html += startTag(curStyles);
				}
				
				blockActive = true;
			}
			
			while(i >= j && (i < m.length || j < ends.length))
			{
				var s = m[i], e = ends[j];
	
				if (s && e && s.s < e.e) //s can be null when all starts are used, e ends after s BUT sometimes there are errors in the file
				{
					if (s.s >= maxE) break;
					curS = s.s;
	
					if (curS - curE > 0)
					{
						//NOTE: After the fix in end where we add dummy start and end, this shouldn't be called
						//End any open tag and add remaining text with current style 
						html += startTag(curStyles) + endTag(txt, curE, curS);
						curE = curS;
					}
					
					while(s != null && s.s == curS)
					{
						curStyles[s.n] = s;
						s = m[++i];
					}
					
					html += startTag(curStyles);
				}
				else if (e)
				{
					if (e.e > maxE) break;
					curE = e.e;
	
					do
					{
						delete curStyles[e.n];
						e = ends[++j];
					}
					while(e != null && e.e == curE);
					
					html += endTag(txt, curS, curE);
					curS = curE;
					
					//Next start should be immidiately after this end or we add a dummy one
					if (openTagsCount.length == 0 && (s == null || s.s != curE))
					{
						m.splice(i, 0, {s: curE, n: 'dummy', v: ''});
						ends.splice(j, 0, {e: s? s.s : maxE, n: 'dummy', v: ''});
					}
				}
				else
				{
					break;
				}
			}
		}
		
		html += endTag(null, null, null, true); //End any open tag
		
		if (blockActive)
		{
			if (curE != maxE)
			{
				html += startTag({dummy: 1}) + endTag(txt, curE, maxE);
			}
			
			html += endBlockTag(true); 
		}
					
		return html;
	};
	
	function convertText(props, forceHTML)
	{
		isLastLblHTML = false;
		var text = (props.Text != null && props.Text.t) ? props.Text :
			((props.Value != null && props.Value.t) ? props.Value :
			((props.Lane_0 != null && props.Lane_0.t) ? props.Lane_0 : null));
		var text2 = null;
		
		if (text == null && props.State != null)
		{
			if (props.State.t)
			{
				text = props.State;
			}
		}
		else if (text == null && props.Note != null)
		{
			if (props.Note.t)
			{
				text = props.Note;
			}
		}
		else if (text == null && props.Title != null)
		{
			if (props.Title.t)
			{
				text = props.Title;
			}
		}
		else if (props.t)
		{
			text = props;
		}

		if (text == null && props.TextAreas != null)
		{
			if (props.TextAreas.Text != null)
			{
				if (props.TextAreas.Text.Value != null)
				{
					if (props.TextAreas.Text.Value.t)
					{
						text = props.TextAreas.Text.Value;
					}
				}
			}
		}
		else if (text == null && props.t0 != null)
		{
			if (props.t0.t)
			{
				text = props.t0;
			}
		}
		
		// TODO: Convert text object to HTML. One case is covered. Is there others?
		// TODO: HTML text conversion looks stable now, maybe convert all using html?
		if (text != null)
		{
			if (text.t != null)
			{
				var txt = text.t;
				txt = txt.replace(/\u2028/g, '\n'); //Special unicide line separator
				var m = text.m;
				
				//Convert text object to HTML if needed
				try
				{
					//If there are 3+ consecutive spaces, most probably it's spaces to create a new line
					if (/   /.test(txt))
					{
						LucidImporter.hasUnknownShapes = true;
					}
					
					for (var i = 0; i < m.length; i++)
					{
						if (m[i].s > 0 || (m[i].e != null && m[i].e < txt.length) || m[i].n == 't' || m[i].n == 'ac' || m[i].n == 'lk')
						{
							isLastLblHTML = true;
							break;
						}
					}
					
					isLastLblHTML = isLastLblHTML || forceHTML;
					
					if (isLastLblHTML)
					{
						return convertTxt2Html(txt, m, props);
					}
				}
				catch(e)
				{
					console.log(e);
				}
				
				txt = txt.replace(/</g, '&lt;');
				txt = txt.replace(/>/g, '&gt;');
				
				return txt;
			}
			
			if (text.Value != null)
			{
				if (text.Value.t != null)
				{
					text.Value.t = text.Value.t.replace(/</g, '&lt;');
					text.Value.t = text.Value.t.replace(/>/g, '&gt;');
					
					return text.Value.t;
				}
			}
		}
		
		return (text2 != null) ? text2 : ''; 
	};
		
	function getAction(obj)
	{
		if (obj.Action != null)
		{
			return obj.Action;
		}
		
		return obj;
	};
		
	function getTextM(properties)
	{
		if (properties.Text != null)
		{
			if (properties.Text.m != null)
			{
				return properties.Text.m;
			}
		}
		else if(properties.TextAreas != null)
		{
			if (properties.TextAreas.Text != null)
			{
				if (properties.TextAreas.Text.Value != null)
				{
					if (properties.TextAreas.Text.Value.m != null)
					{
						return properties.TextAreas.Text.Value.m;
					}
				}
			}
		}
		else if (properties.m != null)
		{
			return properties.m;
		}
		else if (properties.Title != null)
		{
			if (properties.Title.m != null)
			{
				return properties.Title.m;
			}
		}
		else if (properties.State != null)
		{
			if (properties.State.m != null)
			{
				return properties.State.m;
			}
		}
		else if (properties.Note != null)
		{
			if (properties.Note.m != null)
			{
				return properties.Note.m;
			}
		}
		
		return null;
	}
	
	function getLabelStyle(properties, noLblStyle)
	{
		var style = 'whiteSpace=wrap;' + (noLblStyle? 
				'overflow=block;blockSpacing=1;html=1;fontSize=' + defaultFontSize + ';' +
				gFontFamilyStyle
				: 
				getFontSize(properties) +
				getFontFamily(properties) +
				getFontColor(properties) + 
				getFontStyle(properties) +
				getTextAlignment(properties) + 
				getTextLeftSpacing(properties) +
				getTextRightSpacing(properties) + 
				getTextTopSpacing(properties) +
				getTextBottomSpacing(properties) 
			  ) + 
				getTextGlobalSpacing(properties) +
				getTextVerticalAlignment(properties) +
				getTextGlobalAlignment(properties);
				
		gFontFamilyStyle = '';
		return style;  
	}
	
	function addAllStyles(style, properties, action, cell, noLblStyle, overrideNone)
	{
		overrideNone = (overrideNone == null) ? false : overrideNone;
		var s = '';
		
		var noStroke = false;
		var noFill = false;

		// Special case fillColor/strokeColor none is removed during processing
		if (style != null)
		{
			if (overrideNone)
			{
				var tokens = style.split(';');
				style = '';

				for (var i = 0; i < tokens.length; i++)
				{
					if (tokens[i] == 'fillColor=none')
					{
						noFill = true;
					}
					else if (tokens[i] == 'strokeColor=none')
					{
						noStroke = true;
					}
					else if (tokens[i] != '')
					{
						style += tokens[i] + ';';
					}
				}
			}
			else  if (style != '' && style.charAt(style.length - 1) != ';')
			{
				s = ';';
			}
		}

		s += (!hasStyle(style, 'whiteSpace') ? 'whiteSpace=wrap;' : '') + 
		  (noLblStyle? (hasStyle(style, 'overflow')? '' : 'overflow=block;blockSpacing=1;') + 
			(hasStyle(style, 'html')? '' : 'html=1;') + 'fontSize=' + defaultFontSize + ';' +
			gFontFamilyStyle
			:
			addStyle(mxConstants.STYLE_FONTSIZE, style, properties, action, cell) +	
			addStyle(mxConstants.STYLE_FONTFAMILY, style, properties, action, cell) +		
			addStyle(mxConstants.STYLE_FONTCOLOR, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_FONTSTYLE, style, properties, action, cell) +		
			addStyle(mxConstants.STYLE_ALIGN, style, properties, action, cell) +		
			addStyle(mxConstants.STYLE_SPACING_LEFT, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_SPACING_RIGHT, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_SPACING_TOP, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_SPACING_BOTTOM, style, properties, action, cell)
		  ) +
			addStyle(mxConstants.STYLE_ALIGN + 'Global', style, properties, action, cell) +
			addStyle(mxConstants.STYLE_SPACING, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_VERTICAL_ALIGN, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_STROKECOLOR, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_OPACITY, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_ROUNDED, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_ROTATION, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_FLIPH, style, properties, action, cell) +		
			addStyle(mxConstants.STYLE_FLIPV, style, properties, action, cell) +		
			addStyle(mxConstants.STYLE_SHADOW, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_FILLCOLOR, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_DASHED, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_STROKEWIDTH, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_IMAGE, style, properties, action, cell) +			
			addStyle(mxConstants.STYLE_POINTER_EVENTS, style, properties, action, cell);

		if (noFill && !hasStyle(s, mxConstants.STYLE_FILLCOLOR))
		{
			s += 'fillColor=none;';
		}

		if (noStroke && !hasStyle(s, mxConstants.STYLE_STROKECOLOR))
		{
			s += 'strokeColor=none;';
		}

		gFontFamilyStyle = '';
		return s;
	}
	
	function addStyle(key, style, properties, action, cell)
	{
		if (!hasStyle(style, key))
		{
			switch(key)
			{
				case mxConstants.STYLE_FONTSIZE :
					return getFontSize(properties);
				
				case mxConstants.STYLE_FONTFAMILY :
					return getFontFamily(properties);
				
				case mxConstants.STYLE_FONTCOLOR :
					return getFontColor(properties);
					
				case mxConstants.STYLE_FONTSTYLE :
					return getFontStyle(properties);
					
				case mxConstants.STYLE_ALIGN :
					return getTextAlignment(properties);
					
				case mxConstants.STYLE_ALIGN + 'Global':
					return getTextGlobalAlignment(properties);

				case mxConstants.STYLE_SPACING_LEFT :
					return getTextLeftSpacing(properties);
					
				case mxConstants.STYLE_SPACING_RIGHT :
					return getTextRightSpacing(properties);
					
				case mxConstants.STYLE_SPACING_TOP :
					return getTextTopSpacing(properties);
					
				case mxConstants.STYLE_SPACING_BOTTOM :
					return getTextBottomSpacing(properties);
					
				case mxConstants.STYLE_SPACING :
					return getTextGlobalSpacing(properties);
					
				case mxConstants.STYLE_VERTICAL_ALIGN :
					return getTextVerticalAlignment(properties);
					
				case mxConstants.STYLE_STROKECOLOR :
					return getStrokeColor(properties, action);
					
				case mxConstants.STYLE_OPACITY :
					return getOpacity(properties, action, cell);
					
				case mxConstants.STYLE_ROUNDED :
					return getRounded(properties, action, cell);
					
				case mxConstants.STYLE_ROTATION :
					return getRotation(properties, action, cell);
					
				case mxConstants.STYLE_FLIPH :
					return getFlipH(properties);
					
				case mxConstants.STYLE_FLIPV :
					return getFlipV(properties);
					
				case mxConstants.STYLE_SHADOW :
					return getShadow(properties);
					
				case mxConstants.STYLE_FILLCOLOR :
					return getFillColor(properties, action);
					
				case mxConstants.STYLE_DASHED :
					return getStrokeStyle(properties);
					
				case mxConstants.STYLE_STROKEWIDTH :
					return getStrokeWidth(properties);
					
				case mxConstants.STYLE_IMAGE :
					return getImage(properties, action);

				case mxConstants.STYLE_POINTER_EVENTS :
					return getPointerEvents(properties, action);
					
				default :
					break;
			}
		}
		
		return '';
	}
	
	function getFontSize(properties)
	{
		//adds font size
		var isV = false;
		
		var m = getTextM(properties);
		
		if (m != null)
		{
			var i = 0;
			
			while ((!isV) && (i < m.length))
			{
				var currM = m[i];
				
				if (currM.n == 's')
				{
					if (currM.v) //Ignore zero value also
					{
						isV = true;
						
						return 'fontSize=' + fix1Digit(currM.v * scale) + ';';
					}
				}
				i++;
			}
		}
		
		if (isV == 0)
		{
			return 'fontSize=' + defaultFontSize + ';';
		}
		
		return '';
	}
	
	function getFontFamily(properties)
	{
		var m = getTextM(properties);
		var fontFamily;
		
		if (m != null)
		{
			for (var i = 0; i < m.length; i++)
			{
				if (m[i].n == 'f' && m[i].v)
				{
					fontFamily = m[i].v;
					break;
				}
			}
		}
		
		if (!fontFamily && properties.Font)
		{
			fontFamily = properties.Font;
		}
		
		mapFontFamily(fontFamily);
		return gFontFamilyStyle;
	};
	
	function getLink(lnk)
	{
		if (lnk.tp == 'ext')
		{
			return lnk.url;
		}
		else if (lnk.tp == 'ml')
		{
			return 'mailto:' + lnk.eml;
		}
		else if (lnk.tp == 'pg')
		{
			return 'data:page/id,' + (LucidImporter.pageIdsMap[lnk.id] || 0);
		}
		else if (lnk.tp == 'c') //Confluence content
		{
			return 'data:confluence/id,' + lnk.ccid;
		}
		else
		{
			return null;	
		}
	};
	
	function getFontColor(properties)
	{
		//adds font color
		var isC = false;
		var m = getTextM(properties);
		
		if (m != null)
		{
			var i = 0;
			
			while ((!isC) && (i < m.length))
			{
				var currM = m[i];
				
				if (currM.n == 'c')
				{
					if (currM.v != null)
					{
						isC = true;
						
						var currV = rgbToHex(currM.v).substring(0, 7);

						if (currV == '#000000')
						{
							currV = 'default';
						}

						return mxConstants.STYLE_FONTCOLOR + '=' + currV + ';';
					}
				}
				
				i++;
			}
		}
		
		return '';
	}
	
	function getFontStyle(properties)
	{
		return getFontStyleString(getTextM(properties));
	}
		
	function getFontStyleString(m)
	{
		if (m != null)
		{
			var fontStyle = 0;
			//check for bold text
			var isBT = false;
			
			if (m != null)
			{
				var i = 0;
				
				while ((!isBT) && (i < m.length))
				{
					var currM = m[i];
					
					if (currM.n == 'b')
					{
						if (currM.v != null && currM.v)
						{
							isBT = true;
							fontStyle += 1;
						}
					}
					else if (currM.n == 'fc' && currM.v == 'Bold')
					{
						isBT = true;
						fontStyle += 1;
					}
					
					i++;
				}
			}
				
			//check for italic text
			var isIT = false;
			
			if (m != null)
			{
				var i = 0;
				
				while ((!isIT) && (i < m.length))
				{
					var currM = m[i];
					
					if (currM.n == 'i')
					{
						if (currM.v != null && currM.v)
						{
							isIT = true;
							fontStyle += 2;
						}
					}
					
					i++;
				}
			}
				
			//check for underline text
			var isUT = false;
			
			if (m != null)
			{
				var i = 0;
				
				while ((!isUT) && (i < m.length))
				{
					var currM = m[i];
					
					if (currM.n == 'u')
					{
						if (currM.v != null && currM.v)
						{
							isUT = true;
							fontStyle += 4;
						}
					}
					
					i++;
				}
			}
			
			if (fontStyle > 0)
			{
				return 'fontStyle=' + fontStyle + ';';
			}
		}
		
		return '';
	}
	
	function getTextAlignment(properties)
	{
		var m = getTextM(properties);
		
		//adds text alignment
		if (m != null)
		{
			var i = 0;
			
			while (i < m.length)
			{
				var currM = m[i];
				
				if (currM.n == 'a')
				{
					if (currM.v != null)
					{
						return 'align=' + currM.v + ';';
					}
				}
				
				i++;
			}
		}
		
		return '';
	}
	
	function getTextLeftSpacing(properties)
	{
		var m = getTextM(properties);
		
		if (m != null)
		{
			//adds left spacing
			var i = 0;
			
			while (i < m.length)
			{
				var currM = m[i];
				
				if (currM.v != null)
				{
					if (currM.n == 'il')
					{
						return 'spacingLeft=' + fix1Digit(currM.v * scale) + ';';
					}
					/*else
					{
						var align = getTextAlignment(properties);
					
						if (currM.n == 's' && align != 'align=center;' && align != '')
						{
							// TODO: Fix condition to apply this only when necessary
							//return 'spacingLeft=' + currM.v * scale + ';';
						}
					}*/
				}
					
				i++;
			}
		}
		
		return '';
	}

	function getTextRightSpacing(properties)
	{
		//adds right spacing
		var isIR = false;
		var m = getTextM(properties);
		
		if (m != null)
		{
			var i = 0;
			
			while ((!isIR) && (i < m.length))
			{
				var currM = m[i];
				
				if (currM.n == 'ir')
				{
					if (currM.v != null)
					{
						isIR = true;
						
						return 'spacingRight=' + fix1Digit(currM.v * scale) + ';';
					}
				}
				
				i++;
			}
		}
		
		return '';
	}
	
	function getTextTopSpacing(properties)
	{
		//adds top spacing
		var isMT = false;
		var m = getTextM(properties);
		
		if (m != null)
		{
			var i = 0;
			
			while ((!isMT) && (i < m.length))
			{
				var currM = m[i];
				
				if (currM.n == 'mt')
				{
					if (currM.v != null)
					{
						isMT = true;
						return 'spacingTop=' + fix1Digit(currM.v * scale) + ';';
					}
				}
				
				i++;
			}
		}

		return '';
	}
	
	function getTextBottomSpacing(properties)
	{
		//adds bottom spacing
		var isMB = false;
		var m = getTextM(properties);
		
		if (m != null)
		{
			var i = 0;
			
			while ((!isMB) && (i < m.length))
			{
				var currM = m[i];
				
				if (currM.n == 'mb')
				{
					if (currM.v != null)
					{
						isMB = true;
						return 'spacingBottom=' + fix1Digit(currM.v * scale) + ';';
					}
				}
				
				i++;
			}
		}
		
		return '';
	}
	
	function getTextGlobalSpacing(properties)
	{
		//adds global spacing
		if (typeof properties.InsetMargin === 'number')
		{
			return 'spacing=' + Math.max(0, fix1Digit((properties.InsetMargin) * scale)) + ';';
		}
	
		return '';
	}
	
	function getTextVerticalAlignment(properties)
	{
		// adds text vertical alignment
		if (properties.Text_VAlign != null)
		{
			if (typeof properties.Text_VAlign === 'string')
			{
				return 'verticalAlign=' + properties.Text_VAlign + ';';
			}
		}
		
		if (properties.Title_VAlign != null && typeof properties.Title_VAlign === 'string')
		{
			return 'verticalAlign=' + properties.Title_VAlign + ';';
		}
		
		return createStyle(mxConstants.STYLE_VERTICAL_ALIGN, properties.TextVAlign, 'middle');
	}
	
	function getTextGlobalAlignment(properties)
	{
		return createStyle(mxConstants.STYLE_ALIGN, properties.TextAlign, 'center');
	}
	
	function getStrokeColor(properties, action)
	{
		if (properties.LineWidth == 0)
		{
			return mxConstants.STYLE_STROKECOLOR + '=none;';
		}
		else
		{
			return createStyle(mxConstants.STYLE_STROKECOLOR, getColor(properties.LineColor), '#000000');
		}
	}

	function getHeaderColor(color)
	{
		if (color != null)
		{
			return mxConstants.STYLE_FILLCOLOR + '=' + getColor(color) + ';';
		}
		
		return '';
	}
	
	function getLaneColor(color)
	{
		if (color != null)
		{
			return 'swimlaneFillColor=' + getColor(color) + ';';
		}
		
		return '';
	}
	
	function getOpacity(properties, action, cell)
	{
		var style = '';

		if (typeof properties.LineColor === 'string')
		{
			properties.LineColor = rgbToHex(properties.LineColor);
			
			if (properties.LineColor.length > 7)
			{
				var sOpac = "0x" + properties.LineColor.substring(properties.LineColor.length - 2, properties.LineColor.length);
				
				if(!cell.style.includes('strokeOpacity'))
				{
					style += 'strokeOpacity=' + Math.round(parseInt(sOpac) / 2.55) + ';';
				}
			}
		}
		
		if (typeof properties.FillColor === 'string')
		{
			properties.FillColor = rgbToHex(properties.FillColor);
			
			if (properties.FillColor.length > 7)
			{
				var fOpac = "0x" + properties.FillColor.substring(properties.FillColor.length - 2, properties.FillColor.length);
				
				if(!cell.style.includes('fillOpacity'))
				{
					style += 'fillOpacity=' + Math.round(parseInt(fOpac) / 2.55) + ';';
				}
			}
		}
		
		return style;
	}

	function getRounded(properties, action, cell)
	{
		if (!cell.edge && !cell.style.includes('rounded'))
		{
			//rounding check
			if (properties.Rounding != null)
			{
				if (properties.Rounding > 0)
				{
					return 'rounded=1;absoluteArcSize=1;arcSize=' + fix1Digit(properties.Rounding * scale) + ';';
				}
			}
//			else if (properties.Rounding == null)
//			{
//				return 'rounded=1;absoluteArcSize=1;arcSize=8;';
//			}
		}
		
		return '';
	}

	function getRotation(properties, action, cell)
	{
		var s = '';
	
		// Converts rotation
		if (properties.Rotation != null)
		{
			// KNOWN: TextRotation currently ignored
			var deg = mxUtils.toDegree(parseFloat(properties.Rotation));
			var h = true;
			
			// Fixes the case for horizontal swimlanes where we use horizontal=0
			// and Lucid uses rotation
			if (deg != 0 && action.Class && ((action.Class == 'UMLSwimLaneBlockV2') || ((action.Class.indexOf('Rotated') >= 0 || deg == -90 || deg == 270) && (action.Class.indexOf('Pool') >= 0 || action.Class.indexOf('SwimLane') >= 0))))
			{
				deg += 90;
				cell.geometry.rotate90();
				cell.geometry.isRotated = true;
				h = false;
			}
			else if (mxUtils.indexOf(rccw, action.Class) >= 0)
			{
				deg -= 90;
				cell.geometry.rotate90();
			}
			else if (mxUtils.indexOf(rcw2, action.Class) >= 0)
			{
				deg += 180;
			}
			
			if (deg != 0)
			{
				s += 'rotation=' + deg + ';'
			}
			
			if (!h)
			{
				s +=  'horizontal=0;';
			}
		}
		
		return s;
	}
	
	function getFlipH(properties)
	{
		if (properties.FlipX)
		{
			return 'flipH=1;';
		}
		
		return '';
	}
	
	function getFlipV(properties)
	{
		if (properties.FlipY)
		{
			return 'flipV=1;';
		}
		
		return '';
	}

	function getShadow(properties)
	{
		// Shadow is mapped simple shadow style
		if (properties.Shadow != null)
		{
			return mxConstants.STYLE_SHADOW + '=1;';
		}
		
		return '';
	}

	function rgbToHex(color)
	{
		if (color)
		{
			if (typeof color === 'object')
			{
				try
				{
					color = color.cs[0].c; //TODO support gradient colors 
				}
				catch(e)
				{
					console.log(e);
					color = '#ffffff';
				}
			}
			
			if (color.substring(0, 3) == 'rgb')
			{
				color = '#' + color.match(/\d+/g).map(function(n)
				{
					var s = parseInt(n).toString(16);
					return (s.length == 1? '0' : '') + s;
				}).join('');
			}
			else if (color.charAt(0) != '#')
			{
				color = '#' + color;
			}
		}
		
		return color;
	};
	
	function getColor(color)
	{
		color = rgbToHex(color);
		return color? color.substring(0, 7) : null;
	}
	
	function getOpacity2(color, style)
	{
		color = rgbToHex(color);
		return color && color.length > 7? (style + '=' + Math.round(parseInt('0x' + color.substr(7)) / 2.55) + ';') : '';
	}
	
	function getFillColor(properties, action)
	{
		// Gradients and fill color
		if (properties.FillColor != null)
		{
			if (typeof properties.FillColor === 'object')
			{
				if (properties.FillColor.cs != null && properties.FillColor.cs.length > 1)
				{
					return createStyle(mxConstants.STYLE_FILLCOLOR, getColor(properties.FillColor.cs[0].c)) +
						createStyle(mxConstants.STYLE_GRADIENTCOLOR, getColor(properties.FillColor.cs[1].c));
				}
			}
			else if (typeof properties.FillColor === 'string')
			{
				return createStyle(mxConstants.STYLE_FILLCOLOR, getColor(properties.FillColor), '#FFFFFF');
			}
			else
			{
				return createStyle(mxConstants.STYLE_FILLCOLOR, 'none');
			}
		}
		
		return '';
	}
	
	function getStrokeStyle(properties)
	{
		// Stroke style
		if (properties.StrokeStyle == 'dotted')
		{
			return 'dashed=1;fixDash=1;dashPattern=1 4;';
		}
		else if (properties.StrokeStyle == 'dashdot')
		{
			return 'dashed=1;fixDash=1;dashPattern=10 5 1 5;';
		}
		else if (properties.StrokeStyle == 'dashdotdot')
		{
			return 'dashed=1;fixDash=1;dashPattern=10 5 1 5 1 5;';
		}
		else if (properties.StrokeStyle == 'dotdotdot')
		{
			return 'dashed=1;fixDash=1;dashPattern=1 2;';
		}
		else if (properties.StrokeStyle == 'longdash')
		{
			return 'dashed=1;fixDash=1;dashPattern=16 6;';
		}
		else if (properties.StrokeStyle == 'dashlongdash')
		{
			return 'dashed=1;fixDash=1;dashPattern=10 6 16 6;';
		}
		else if (properties.StrokeStyle == 'dashed24')
		{
			return 'dashed=1;fixDash=1;dashPattern=3 8;';
		}
		else if (properties.StrokeStyle == 'dashed32')
		{
			return 'dashed=1;fixDash=1;dashPattern=6 5;';
		}
		else if (properties.StrokeStyle == 'dashed44')
		{
			return 'dashed=1;fixDash=1;dashPattern=8 8;';
		}
		else if (properties.StrokeStyle != null && properties.
			StrokeStyle.substring(0, 6) == 'dashed')
		{
			return 'dashed=1;fixDash=1;';
		} 
		
		return '';
	}

	function getPointerEvents(properties)
	{
		return properties.Magnetize ? containerStyle : '';
	}
	
	function getStrokeWidth(properties)
	{
		return properties.LineWidth != null? createStyle(mxConstants.STYLE_STROKEWIDTH, fix1Digit(parseFloat(properties.LineWidth) * scale), '1') : '';
	}
	
	function getImage(properties, action, url)
	{
		var imgUrl = url, extraStyles = '';
		
		// Converts images
		if (properties.FillColor && properties.FillColor.url)
		{
			imgUrl = properties.FillColor.url;
			//Check if image is cropped, stretched, ...
			if (properties.FillColor.pos == 'fill')
			{
				extraStyles = 'imageAspect=0;';
			} 
			//TODO Support non-destructive cropping
			/*else if (typeof properties.FillColor.pos == 'object')
			{
				"pos": {
		            "pin": {
		                "x": 0.5765582655826557,
		                "y": 0.6180376215526864
		            },
		            "size": {
		                "w": 0.7764227642276422,
		                "h": 1.5284871672246134
		            }
            	}
			}*/
		}
		else if (action.Class == 'ImageSearchBlock2')
		{
			imgUrl = properties.URL;
		}
		else if (action.Class == 'UserImage2Block' && properties.ImageFillProps != null &&
				properties.ImageFillProps.url != null)
		{
			imgUrl = properties.ImageFillProps.url;
		}
					
		if (imgUrl != null)
		{
			return 'image=' + mapImgUrl(imgUrl) + ';' + extraStyles;
		}
		
		return '';
	}

	// Adds metadata, link, converts placeholders
	function addCustomData(cell, p, graph)
	{
		if (p.Link != null && p.Link.length > 0)
		{
			graph.setAttributeForCell(cell, 'link', getLink(p.Link[0]));
		}
		
		if (p.NoteHint != null && p.NoteHint.t)
		{
			graph.setAttributeForCell(cell, 'Notes', p.NoteHint.t);
		}

		replacePlaceholders(cell, graph);
		
		for (var property in p)
		{
			if (p.hasOwnProperty(property) && 
				property.toString().startsWith('ShapeData_'))
			{
				try
				{
					var data = p[property];
					var key = mxUtils.trim(data.Label).replace(/[^a-z0-9]+/ig, '_').
						replace(/^\d+/, '').replace(/_+$/, '');
					setAttributeForCell(cell, key, data.Value, graph);
				}
				catch (e)
				{
					if (window.console)
					{
						console.log('Ignored ' + property + ':', e);
					}
				}
			}
		}
	};
	
	var placeholderPattern = new RegExp('{{(date\{.*\}|[^%^\{^\}]+)}}', 'g');
	
	function replacePlaceholders(cell, graph)
	{
		var result = [];
		var str = graph.convertValueToString(cell);
		var doReplace = false;
		
		if (str != null)
		{
			var last = 0;
			
			while (match = placeholderPattern.exec(str))
			{
				var val = match[0];
				doReplace = true;
				
				if (val.length > 2)
				{
					var tmp = val.substring(2, val.length - 2);
					
					if (tmp == 'documentName')
					{
						tmp = 'filename';
					}
					else if (tmp == 'pageName')
					{
						tmp = 'page';
					}
					else if (tmp == 'totalPages')
					{
						tmp = 'pagecount';
					}
					else if (tmp == 'page')
					{
						tmp = 'pagenumber';
					}
					else if (tmp.substring(0, 5) == 'date:')
					{
						// LATER: Convert more date masks
						tmp = 'date{' + tmp.substring(5).replace(/MMMM/g, 'mmmm').replace(/MM/g, 'mm').replace(/YYYY/g, 'yyyy') + '}';
					}
					else if (tmp.substring(0, 16) == 'lastModifiedTime')
					{
						// LATER: Convert more date masks
						tmp = tmp.replace(/MMMM/g, 'mmmm').replace(/MM/g, 'mm').replace(/YYYY/g, 'yyyy');
					}
					else if (tmp.substring(0, 9) == 'i18nDate:')
					{
						// LATER: Convert more named date masks
						tmp = 'date{' + tmp.substring(9).replace(/i18nShort/g, 'shortDate')
							.replace(/i18nMediumWithTime/g, 'mmm d, yyyy hh:MM TT') + '}';
					}
					
					tmp = '%' + tmp + '%';
					result.push(str.substring(last, match.index) + ((tmp != null) ? tmp : val));
					last = match.index + val.length;
				}
			}
			
			if (doReplace)
			{
				result.push(str.substring(last));
				graph.setAttributeForCell(cell, 'label', result.join(''));
				graph.setAttributeForCell(cell, 'placeholders', '1');
			}
		}
	};
	
	function setAttributeForCell(cell, key, value, graph)
	{
		var currentKey = key;
		var counter = 0;
		
		// Resolves conflicts by adding counter postfix
		while (graph.getAttributeForCell(cell, currentKey) != null)
		{
			counter++;
			currentKey = key + '_' + counter;
		}
		
		graph.setAttributeForCell(cell, currentKey, (value != null) ? value : '');
	};
	
	function updateCell(cell, obj, graph, source, target, ignoreLabel)
	{
		var a = getAction(obj);
		
		if (a != null)
		{
			var s = styleMap[a.Class];
			
			if (s != null)
			{
				cell.style += s;
				
				if (cell.style.charAt(cell.style.length - 1) != ';')
				{
					cell.style += ';';
				}
			}
			else if (!cell.edge)
			{
				console.log('No mapping found for: ' + a.Class);
				LucidImporter.hasUnknownShapes = true;
			}
			
			var p = (a.Properties != null) ? a.Properties : a;

			if (p != null)
			{
				// Adds label
				cell.value = (!ignoreLabel) ? convertText(p) : '';
				cell.style += addAllStyles(cell.style, p, a, cell, isLastLblHTML, true);
				
				if (!cell.style.includes('strokeColor'))
				{
					cell.style += getStrokeColor(p, a);
				}
				
				addCustomData(cell, p, graph);
				
				if (p.Title && p.Title.t && p.Text && p.Text.t && a.Class.substr(0, 8) != 'ExtShape')
				{
					var geo = cell.geometry;
					var title = new mxCell(convertText(p.Title), new mxGeometry(0, geo.height,geo.width, 10), 'strokeColor=none;fillColor=none;');
					title.vertex = true;
					cell.insert(title);
					title.style += getLabelStyle(p.Title, isLastLblHTML);
				}
				
				// Edge style
				if (cell.edge)
				{
					if (p.Rounding != null && p.Shape != 'diagonal') //No rounding for diagornal edges
					{
						cell.style += 'rounded=1;arcSize=' + p.Rounding + ';';
					}
					else
					{
						cell.style += 'rounded=0;';
					}
					var isCurved = p.Shape == 'curve';
					
					if (isCurved)
					{
						cell.style += 'curved=1;';
					}
					else if (p.Shape != 'diagonal')
					{
						if (p.ElbowPoints != null && p.ElbowPoints.length > 0)
						{
							cell.geometry.points = [];
							
							for (var i = 0; i < p.ElbowPoints.length; i++)
							{
								cell.geometry.points.push(new mxPoint(
									Math.round(p.ElbowPoints[i].x * scale + dx),
									Math.round(p.ElbowPoints[i].y * scale + dy)));
							}
						}
						else if (p.Shape == 'elbow' || (p.Endpoint1.Block != null && p.Endpoint2.Block != null))
						{
							cell.style += 'edgeStyle=orthogonalEdgeStyle;';
						}
					}
					
					if (p.LineJumps || LucidImporter.globalProps.LineJumps)
					{
						cell.style += 'jumpStyle=arc;';
					}

					if (p.Endpoint1.Style != null)
					{
						var startStyle = edgeStyleMap[p.Endpoint1.Style];
						
						if (startStyle != null)
						{
							startStyle = startStyle.replace(/xyz/g, 'start');
							cell.style += 'startArrow=' + startStyle + ';';
						}
						else
						{
							LucidImporter.hasUnknownShapes = true;
							
							if (window.console)
							{
								console.log('Unknown endpoint style: ' + p.Endpoint1.Style);
							}
						}
					}
					
					if (p.Endpoint2.Style != null)
					{
						var endStyle = edgeStyleMap[p.Endpoint2.Style];
						
						if (endStyle != null)
						{
							endStyle = endStyle.replace(/xyz/g, 'end');
							cell.style += 'endArrow=' + endStyle + ';';
						}
						else
						{
							LucidImporter.hasUnknownShapes = true;
							
							if (window.console)
							{
								console.log('Unknown endpoint style: ' + p.Endpoint2.Style);
							}
						}
					}

					var waypoints = p.ElbowControlPoints != null && p.ElbowControlPoints.length > 0? p.ElbowControlPoints : p.Joints;

					if (isCurved && p.BezierJoints != null && p.BezierJoints.length > 0)
					{
						waypoints = [];

						//Last point sometimes has incorrect x,y value!
						var lpt = p.BezierJoints[p.BezierJoints.length - 1];
						lpt.p.x = p.Endpoint2.x;
						lpt.p.y = p.Endpoint2.y;

						for (var i = 0; i < p.BezierJoints.length; i++)
						{
							var pt = p.BezierJoints[i];
							//TODO This is best-effort approximation (close enouhh but not exact)
							waypoints.push({x: pt.p.x + pt.nt.x * pt.lcps * .75, y: pt.p.y + pt.nt.y * pt.lcps * .75});
							waypoints.push({x: pt.p.x + pt.nt.x * pt.rcps * .75, y: pt.p.y + pt.nt.y * pt.rcps * .75});
						}

						//remove first & last points
						waypoints = waypoints.slice(1, waypoints.length - 1);
					}
					else if (isCurved) //Curved with the default waypoints
					{
						waypoints = [];
						//TODO This is best-effort approximation (close enouhh but not exact)
						waypoints.push({x: p.Endpoint1.x + (p.Endpoint1.LinkX < 0.1? -250 : (p.Endpoint1.LinkX > 0.9? 250 : 0) ), 
										y: p.Endpoint1.y + (p.Endpoint1.LinkY < 0.1? -250 : (p.Endpoint1.LinkY > 0.9? 250 : 0) )});
						waypoints.push({x: p.Endpoint2.x + (p.Endpoint2.LinkX < 0.1? -250 : (p.Endpoint2.LinkX > 0.9? 250 : 0) ), 
										y: p.Endpoint2.y + (p.Endpoint2.LinkY < 0.1? -250 : (p.Endpoint2.LinkY > 0.9? 250 : 0) )});
					}

					if (waypoints != null)
					{
						cell.geometry.points = [];
						
						for (var i = 0; i < waypoints.length; i++)
						{
							var pt = waypoints[i].p ? waypoints[i].p : waypoints[i];
							
							cell.geometry.points.push(new mxPoint(
								Math.round(pt.x * scale + dx),
								Math.round(pt.y * scale + dy)));
						}
					}
					
					// Inserts implicit or explicit control points for loops
					var implicitY = false, implicitX = false;
					
					if ((cell.geometry.points == null || cell.geometry.points.length == 0) && 
						p.Endpoint1.Block != null && p.Endpoint1.Block == p.Endpoint2.Block &&
						source != null && target != null)
					{
						{
							var exit = new mxPoint(Math.round(source.geometry.x + source.geometry.width * p.Endpoint1.LinkX),
								Math.round(source.geometry.y + source.geometry.height * p.Endpoint1.LinkY));
							var entry = new mxPoint(Math.round(target.geometry.x + target.geometry.width * p.Endpoint2.LinkX),
								Math.round(target.geometry.y + target.geometry.height * p.Endpoint2.LinkY));
							dx = (exit.x == entry.x) ? (Math.abs(exit.x - source.geometry.x) < source.geometry.width / 2? -20 : 20) : 0;
							dy = (exit.y == entry.y) ? (Math.abs(exit.y - source.geometry.y) < source.geometry.height / 2? -20 : 20) : 0;
							
							var p1 = new mxPoint(exit.x + dx, exit.y + dy), p2 = new mxPoint(entry.x + dx, entry.y + dy);
							p1.generated = true;
							p2.generated = true;
							cell.geometry.points = [p1, p2];
							implicitX = (exit.y == entry.y); //TODO Check these implicit variables effect
							implicitY = (exit.x == entry.x);
						}
					}

					// Anchor points and arrows					
					var p1, p2;
					
					if (source == null || !source.geometry.isRotated) //TODO Rotate the endpoint instead of ignoring it
					{
						p1 = updateEndpoint(cell, p.Endpoint1, true, implicitY, null, source);
					}
					
					if (source != null && p1 != null)
					{
						if (source.stylePoints == null)
						{
							source.stylePoints = [];
						}
						
						source.stylePoints.push(p1);
						LucidImporter.stylePointsSet.add(source);
					}
					
					if (target == null || !target.geometry.isRotated) //TODO Rotate the endpoint instead of ignoring it
					{
						p2 = updateEndpoint(cell, p.Endpoint2, false, implicitY, null, target);
					}
					
					if (target != null && p2 != null)
					{
						if (target.stylePoints == null)
						{
							target.stylePoints = [];
						}
						
						target.stylePoints.push(p2);
						LucidImporter.stylePointsSet.add(target);
					}
				}
			}
		}
		
		if (obj.id != null)
		{
			cell.style += ';lucidId=' + obj.id + ';';
		}

		cell.lucidchartObject = obj;
	};
	
	function createVertex(obj, graph)
	{
		var a = getAction(obj);
		var p = a.Properties;
		var b = p.BoundingBox;

		if (obj.Class != null && (obj.Class.substring(0, 3) === "AWS" || obj.Class.substring(0, 6) === "Amazon" ) && !obj.Class.includes('AWS19'))
		{
			b.h = b.h - 20;
		}
		
		v = new mxCell('', new mxGeometry(Math.round(b.x * scale + dx), Math.round(b.y * scale + dy),
				Math.round(b.w * scale), Math.round(b.h * scale)), vertexStyle);
		v.vertex = true;
		updateCell(v, obj, graph);

		//Store z-order to use it in groups
		v.zOrder = p.ZOrder;
		
	    handleTextRotation(v, p);

	    if (p.Hidden)
		{
			v.visible = false;
		}
		
	    return v;
	};
	
	function createEdge(obj, graph, source, target)
	{
		var e = new mxCell('', new mxGeometry(0, 0, 100, 100), edgeStyle);
		e.geometry.relative = true;
		e.edge = true;
		updateCell(e, obj, graph, source, target, true);
		
		// Adds text labels
		var a = getAction(obj);
		var p = a.Properties;
		var ta = (p != null) ? p.TextAreas : obj.TextAreas;
		
		if (ta != null)
		{
			var count = 0;
			
			while (ta['t' + count] !== undefined) //Some files has null for some labels 
			{
				var tmp = ta['t' + count];
				
				if (tmp != null)
				{
					e = insertLabel(tmp, e, obj, source, target, graph)
				}
				
				count++;
			}
			
			count = 0;
			
			while (ta['m' + count] !== undefined || count < 1)
			{
				var tmp = ta['m' + count];
				
				if (tmp != null)
				{
					e = insertLabel(tmp, e, obj, source, target, graph)
				}
				
				count++;
			}

			if (ta.Text != null)
			{
				e = insertLabel(ta.Text, e, obj, source, target, graph)
			}

			var ta = (p != null) ? p.TextAreas : obj.TextAreas;
			
			if (ta.Message != null)
			{
				e = insertLabel(ta.Message, e, obj, source, target, graph)
			}
		}
		
		if (obj.Hidden)
		{
			e.visible = false;
		}
		
		return e;
	}

	function insertLabel(textArea, e, obj, src, trg, graph)
	{
		var x = (parseFloat(textArea.Location) - 0.5) * 2;
		
		if (isNaN(x) && textArea.Text != null && textArea.Text.Location != null)
		{
			x = (parseFloat(textArea.Text.Location) - 0.5) * 2;
		}
		
		var lblTxt = convertText(textArea);
		var lab = new mxCell(lblTxt, new mxGeometry((!isNaN(x)) ? x : 0, 0, 0, 0),
			labelStyle + getEdgeLabelStyle(textArea, obj, isLastLblHTML));
		lab.geometry.relative = true;
		lab.vertex = true;
		
		if (textArea.Side)
		{
			try
			{
				if (obj.Action && obj.Action.Properties)
				{
					obj = obj.Action.Properties;
				}
				
				var dx, dy;

				//Sometimes x, y info in the Endpoint is incorrect when the edge is connected!
				if (src != null && trg != null)
				{
					var srcGeo = src.geometry, trgGeo = trg.geometry;
					dx = Math.abs((srcGeo.x + srcGeo.width * obj.Endpoint1.LinkX) - 
									(trgGeo.x + trgGeo.width * obj.Endpoint2.LinkX));
					dy = Math.abs((srcGeo.y + srcGeo.height * obj.Endpoint1.LinkY) - 
									(trgGeo.y + trgGeo.height * obj.Endpoint2.LinkY));
				}
				else
				{
					dx = Math.abs(obj.Endpoint1.x - obj.Endpoint2.x);
					dy = Math.abs(obj.Endpoint1.y - obj.Endpoint2.y);
				}
				
				var strSize = mxUtils.getSizeForString(lblTxt.replace(/\n/g, '<br>'));
				
				if (dx == 0 || dx < dy)
				{
					lab.geometry.offset = new mxPoint(Math.sign(obj.Endpoint1.y - obj.Endpoint2.y) * textArea.Side * (strSize.width / 2 + 5 + dx), 0);
				}
				else
				{
					lab.geometry.offset = new mxPoint(0, Math.sign(obj.Endpoint2.x - obj.Endpoint1.x) * textArea.Side * (strSize.height / 2 + 5 + dy));
				}
			}
			catch(e)
			{
				console.log(e);
			}
		} 

		
		lab.lucidchartObject = textArea;
		e.insert(lab);
		
		return e;
	};
	
	function getEdgeLabelStyle(obj, pObj, noLblStyle)
	{
		if (noLblStyle)
		{
			return gFontFamilyStyle;
		}
		
		var size = defaultFontSize;
		var style = '';
		
		if (obj != null && obj.Value != null && obj.Value.m != null)
		{
			style = getFontStyleString(obj.Value.m);
			
			for (var i = 0; i < obj.Value.m.length; i++)
			{
				if (obj.Value.m[i].n == 's' && obj.Value.m[i].v) //Ignore zero value
				{
					size = fix1Digit(scale * parseFloat(obj.Value.m[i].v));
				}
				else if (obj.Value.m[i].n == 'c')
				{
					var v = rgbToHex(obj.Value.m[i].v);
					
					if (v != null)
					{
						v = v.substring(0, 7);
					}

					if (v == '#000000')
					{
						v = 'default';
					}
					
					style += 'fontColor=' + v + ';'
				}
			}
			
			style += getFontFamily(pObj);
			gFontFamilyStyle = '';
		}
		
		return style + ';fontSize=' + size + ';';
	};
	
	function createStyle(key, prop, defaultValue, fn)
	{
		if (prop != null && fn != null)
		{
			prop = fn(prop);
		}
		
		if (prop != null && prop != defaultValue)
		{
			return key + '=' + prop + ';';
		}
		
		return '';
	};

	function updateEndpoint(cell, endpoint, source, ignoreX, ignoreY, endCell)
	{
		if (endpoint != null)
		{
			if (endpoint.LinkX != null && endpoint.LinkY != null)
			{
				endpoint.LinkX = Math.round(endpoint.LinkX * 1000) / 1000;
				endpoint.LinkY = Math.round(endpoint.LinkY * 1000) / 1000;
				
				if (endCell != null && endCell.style && endCell.style.indexOf('flipH=1') > -1)
				{
					endpoint.LinkX = 1 - endpoint.LinkX;
				}

				if (endCell != null && endCell.style && endCell.style.indexOf('flipV=1') > -1)
				{
					endpoint.LinkY = 1 - endpoint.LinkY;
				}
				
				cell.style += ((!ignoreX) ? ((source) ? 'exitX' : 'entryX') + '=' + endpoint.LinkX + ';' : '') +
					((!ignoreY) ? (((source) ? 'exitY' : 'entryY') + '=' + endpoint.LinkY + ';') : '') +
					((source) ? 'exitPerimeter' : 'entryPerimeter') + '=0;'; //perimeter as 0 works with both cases better
				
				if (endpoint.Inside)
				{
					return '[' + endpoint.LinkX + ',' + endpoint.LinkY + ',0]';
				}
			}
		}
	};

	function createGroup(obj, lookup, edgesGroups, blocksMap, graph)
	{
		try
		{
			if (obj.Action != null && obj.Action.Properties != null)
			{
				obj = obj.Action.Properties;
			}
			
			var group = new mxCell('', new mxGeometry(), groupStyle);
			group.vertex = true;
			//Store z-order to use it in groups
			group.zOrder = obj.ZOrder;

			var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
			var members = obj.Members, memberCells = [];
			
			for (var key in members)
			{
				var v = lookup[key];
				
				if (v != null)
				{
					memberCells.push(v);
				}
				else if (blocksMap[key] != null)
				{
					memberCells.push(blocksMap[key]);
					//Edges are not yet created, so, create a map for them
					edgesGroups[key] = group;
				}
			}
			
			memberCells.sort(function(a, b)
			{
				var ai = a.zOrder || a.ZOrder; // for edges we need ZOrder since they aren't created yet
				var bi = b.zOrder || b.ZOrder;
				
				return (ai != null && bi != null) ? (ai > bi? 1 : (ai < bi? -1 : 0)) : 0; //ZOrder can be negative
			});
			
			function updateMinMax(e, scaleIt)
			{
				if (e != null)
				{
					if (Array.isArray(e))
					{
						for (var i = 0; i < e.length; i++) 
                        {
                        	updateMinMax(e[i].p? e[i].p : e[i], scaleIt);
                        }
					}
					else
					{
						var s = scaleIt? scale : 1;
						minX = Math.min(minX, e.x * s);
						minY = Math.min(minY, e.y * s);
						maxX = Math.max(maxX, (e.x + (e.width? e.width : 0)) * s);
						maxY = Math.max(maxY, (e.y + (e.height? e.height : 0)) * s);
					}
				}
			};
			
			var index = 0;
			
			for (var i = 0; i < memberCells.length; i++)
			{
				var v = memberCells[i];
				
				if (v.vertex)
				{
					updateMinMax(v.geometry);
					v.parent = group;
					group.insert(v, index++);
				}
				else
				{
					var vProp = v.Action != null && v.Action.Properties? v.Action.Properties : v; 
					updateMinMax(vProp.Endpoint1, true);
					updateMinMax(vProp.Endpoint2, true);
					updateMinMax(vProp.ElbowPoints, true);
					updateMinMax(vProp.ElbowControlPoints, true);
					updateMinMax(vProp.BezierJoints, true);
					updateMinMax(vProp.Joints, true);
				}
			}
			
			group.geometry.x = minX;
			group.geometry.y = minY;
			group.geometry.width = maxX - minX;
			group.geometry.height = maxY - minY;
			
			if (group.children != null)
			{
				for (var i = 0; i < group.children.length; i++)
				{
					var geo = group.children[i].geometry;
					geo.x -= minX;
					geo.y -= minY;
				}
			}
			
			if (obj.IsState)
			{
				group.lucidLayerInfo = {
					name: obj.Name,
					visible: !obj.Hidden,
					locked: obj.Restrictions.b && obj.Restrictions.p && obj.Restrictions.c
				};

				group.style += 'container=1;collapsible=0;recursiveResize=0;';
			}
			else if (obj.Hidden)
			{
				group.visible = false;
			}

			group.lucidchartObject = obj;
			
			return group;
		}
		catch(e)
		{
			console.log(e);
		}
	};
	
	function importLucidPage(graph, g, noSelection)
	{
		LucidImporter.hasMath = false;
		LucidImporter.stylePointsSet = new Set();
		
		graph.getModel().beginUpdate();
		try
		{
			var select = [];
			var lookup = {};
			var edgesGroups = {};
			var blocksMap = {};
			var queue = [];

			if (g.Lines != null)
			{
				blocksMap = g.Lines;
			}
			
			// Vertices first (populates lookup table for connecting edges)
			if (g.Blocks != null)
			{
				Object.assign(blocksMap, g.Blocks);
				
				for (var key in g.Blocks)
				{
					var obj = g.Blocks[key];
					obj.id = key;
					
					var created = false;
					
					if (styleMap[obj.Class] != null)
					{
						if (styleMap[obj.Class] == 'mxCompositeShape')
						{
							lookup[obj.id] = addCompositeShape(obj, select, graph);
							queue.push(obj);
							created = true;
						}
					}
					
					if (!created)
					{
						lookup[obj.id] = createVertex(obj, graph);
						queue.push(obj);
					}
				}
				
				if (g.Generators != null)
				{
					for (var key in g.Generators)
					{
						if (g.Generators[key].ClassName == 'OrgChart2018')
						{
							LucidImporter.hasUnknownShapes = true;
							createOrgChart(key, g.Generators[key], g.Data, graph, lookup);
						}
						else
						{
							LucidImporter.hasUnknownShapes = true;
						}
					}
				}
			}
			else
			{
				for (var i = 0; i < g.Objects.length; i++)
				{
					var obj = g.Objects[i];
					blocksMap[obj.id] = obj;
					
					if (obj.Action != null && styleMap[obj.Action.Class] == 'mxCompositeShape')
					{
						lookup[obj.id] = addCompositeShape(obj, select, graph);
					}
					else if (obj.IsBlock && obj.Action != null && obj.Action.Properties != null)
					{
					    lookup[obj.id] = createVertex(obj, graph);
					}
					else if (obj.IsGenerator && obj.GeneratorData && obj.GeneratorData.p)
					{
						if (obj.GeneratorData.p.ClassName == 'OrgChart2018')
						{
							LucidImporter.hasUnknownShapes = true;
							createOrgChart(obj.GeneratorData.id, obj.GeneratorData.p, obj.GeneratorData.gs, graph, lookup);
						}
						else
						{
							LucidImporter.hasUnknownShapes = true;
						}
					}
					
					queue.push(obj);
				}
				
				//Add groups
				for (var i = 0; i < g.Objects.length; i++)
				{
					var obj = g.Objects[i];
					
					if (obj.IsGroup)
					{
						var group = createGroup(obj, lookup, edgesGroups, blocksMap, graph);
						
						if (group)
						{
							lookup[obj.id] = group;
							queue.push(obj);	
						}
					}
				}
			}
			
			//Create groups
			if (g.Groups != null)
			{
				try
				{
					for (var key in g.Groups)
					{
						var obj = g.Groups[key];
						obj.id = key;

						var group = createGroup(obj, lookup, edgesGroups, blocksMap, graph)
						
						if (group)
						{
							lookup[obj.id] = group;
							queue.push(obj);	
						}
					}
				}
				catch(e)
				{
					console.log(e);
				}
			}

			if (g.Lines != null)
			{
				for (var key in g.Lines)
				{
					var obj = g.Lines[key];
					obj.id = key;
					
					queue.push(obj);
				}
			}
			
			// Sorts all cells by ZOrder
			queue.sort(function(a, b)
			{
				a = getAction(a);
				b = getAction(b);
				
				var ai = (a.Properties != null) ? a.Properties.ZOrder : a.ZOrder;
				var bi = (b.Properties != null) ? b.Properties.ZOrder : b.ZOrder;
				
				return (ai != null && bi != null) ? (ai > bi? 1 : (ai < bi? -1 : 0)) : 0; //ZOrder can be negative
			});
			
			function addLine(obj, p)
			{
				var src = (p.Endpoint1.Block != null) ? lookup[p.Endpoint1.Block] : null;
				var trg = (p.Endpoint2.Block != null) ? lookup[p.Endpoint2.Block] : null;
				var e = createEdge(obj, graph, src, trg);

				if ((p.Endpoint1 && p.Endpoint1.Line) || (p.Endpoint2 && p.Endpoint2.Line))
				{
					console.log('Edge to Edge case');
					LucidImporter.hasUnknownShapes = true;
				}
				
				if (src == null && p.Endpoint1 != null)
				{
					e.geometry.setTerminalPoint(new mxPoint(Math.round(p.Endpoint1.x * scale),
						Math.round(p.Endpoint1.y * scale)), true);
				}
				
				if (trg == null && p.Endpoint2 != null)
				{
					e.geometry.setTerminalPoint(new mxPoint(Math.round(p.Endpoint2.x * scale),
						Math.round(p.Endpoint2.y * scale)), false);
				}
				
				var group = edgesGroups[obj.id];
				
				function fixPoint(p, px, py)
				{
					if (p != null && !p.generated)
					{
						p.x -= px;
						p.y -= py;
					}
				};
				
				if (group != null)
				{
					//Correct edge geometry
					var geo = e.geometry, px = 0, py = 0, prnt = group;
					
					while (prnt != null && prnt.geometry != null)
					{
						px += prnt.geometry.x;
						py += prnt.geometry.y;
						prnt = prnt.parent;
					}
					
					fixPoint(geo.sourcePoint, px, py);
					fixPoint(geo.targetPoint, px, py);
					fixPoint(geo.offset, px, py);
                    var points = geo.points;
                    
                    if (points != null) 
                    {
                        for (var i = 0; i < points.length; i++) 
                        {
                        	fixPoint(points[i], px, py);
                        }
                    }
				}
				
				select.push(graph.addCell(e, group, null, src, trg));
			};
			
			// Inserts cells in ZOrder and connects edges via lookup
			for (var i = 0; i < queue.length; i++)
			{
				var obj = queue[i];
				var v = lookup[obj.id];
				
				if (v != null)
				{
					if (v.parent == null)
					{
						if (v.lucidLayerInfo)
						{
							var layerCell = new mxCell();
					        graph.addCell(layerCell, graph.model.root);
					        
					        layerCell.setVisible(v.lucidLayerInfo.visible);

					        if (v.lucidLayerInfo.locked)
					        {
					            layerCell.setStyle("locked=1;");
					        }
					        
					        layerCell.setValue(v.lucidLayerInfo.name);
					        delete v.lucidLayerInfo;
					        graph.addCell(v, layerCell);
						}
						else
						{
							select.push(graph.addCell(v));
						}
					}
				}
				else if (obj.IsLine && obj.Action != null && obj.Action.Properties != null)
				{
					var p = obj.Action.Properties;
					addLine(obj, p);
				}
				else if (obj.StrokeStyle != null)
				{
					addLine(obj, obj);
				}
			}

			LucidImporter.stylePointsSet.forEach(function(v)
			{
				v.style = 'points=[' + v.stylePoints.join(',') + '];' + v.style;
				delete v.stylePoints;
			});
			
			//Cleanup added properties
			try
			{
				var allCells = graph.getModel().cells;

				// Computes absolute points and bounds
				// for edge label placement optimizer
				graph.view.validate();
				
				for (var id in allCells)
				{
					var c = allCells[id];

					if (c != null)
					{
						normalizeGroup(graph, c);
						normalizeStyle(graph, c);
						normalizeEdge(graph, c);

						if (urlParams['lucidchartObject'] == '1' &&
							c.lucidchartObject != null)
						{
							setAttributeForCell(c, 'lucidchartObject',
								JSON.stringify(c.lucidchartObject, null, 2),
								graph);
						}

						delete c.lucidchartObject;
						delete c.zOrder;
					}
				}
			}
			catch(e)
			{
				console.log(e);
			}
			
			if (!noSelection)
				graph.setSelectionCells(select);
		}
		finally
		{
			graph.getModel().endUpdate();
		}	
	};

	// Optimizes edge routing and labels
	function normalizeEdge(graph, cell)
	{
		if (graph.model.contains(cell) && cell.edge)
		{
			var state = graph.view.getState(cell);

			// Keeps labels close to the edge
			if (state != null && cell.children != null)
			{
				var box = mxRectangle.fromRectangle(state.paintBounds);
				box.grow(5);

				for (var i = 0; i < cell.children.length; i++)
				{
					var label = graph.view.getState(cell.children[i]);
					
					if (label != null && !mxUtils.contains(box,
						label.paintBounds.x, label.paintBounds.y))
					{
						label.cell.geometry.offset = new mxPoint(0, 0);
					}
				}
			}

			// Fixes simple elbow routing
			var lo = cell.lucidchartObject;

			if (lo != null && lo.Shape == 'elbow' &&
				lo.ElbowControlPoints == null &&
				lo.ElbowPoints == null &&
				state.style['exitX'] != null &&
				state.style['exitY'] != null &&
				state.style['entryX'] != null &&
				state.style['entryY'] != null)
			{
				var f = 20;
				cell.style = mxUtils.setStyle(cell.style, 'exitX', Math.round(state.style['exitX'] * f) / f);
				cell.style = mxUtils.setStyle(cell.style, 'exitY', Math.round(state.style['exitY'] * f) / f);
				cell.style = mxUtils.setStyle(cell.style, 'entryX', Math.round(state.style['entryX'] * f) / f);
				cell.style = mxUtils.setStyle(cell.style, 'entryY', Math.round(state.style['entryY'] * f) / f);
			}
		}
	};

	// Removes duplicate styles
	function normalizeStyle(graph, cell)
	{
		if (graph.model.contains(cell) &&
			cell.style != null &&
			cell.style != '')
		{
			var entries = cell.style.split(';');
			var styleMap = {};
			var result = [];

			for (var i = entries.length - 1; i >= 0; i--)
			{
				var tokens = entries[i].split('=');

				if (tokens.length != 2 || styleMap[tokens[0]] == null)
				{
					styleMap[tokens[0]] = tokens[1];

					if (entries[i] != '')
					{
						result.push(entries[i]);
					}
				}
			}

			cell.style = result.reverse().join(';') + ';';
		}
	};

	// Merges groups with background cover cells
	function normalizeGroup(graph, group)
	{
		if (graph.model.contains(group) && group.children != null &&
			group.geometry != null && group.vertex &&
			group.style == groupStyle)
		{
			var coverCell = null;

			for (var i = 0; i < group.children.length; i++)
			{
				if (group.children[i].vertex)
				{
					var geo = group.children[i].geometry;

					if (geo != null && geo.x == 0 && geo.y == 0 &&
						geo.width == group.geometry.width &&
						geo.height == group.geometry.height)
					{
						if (coverCell != null)
						{
							// Ignores multiple cover cells
							return;
						}
						else
						{	
							coverCell = group.children[i];
						}
					}
				}
			}

			removeCellFromParent(graph, coverCell);
		}
	}

	function removeCellFromParent(graph, cell)
	{
		if (cell != null)
		{
			var p = cell.parent;

			if (graph.convertValueToString(p) == '')
			{
				// Moves edges to parent
				if (cell.edges != null)
				{
					for (var i = 0; i < cell.edges.length; i++)
					{
						if (cell.edges[i].source == cell)
						{
							cell.edges[i].setTerminal(cell.parent, true);
						}

						if (cell.edges[i].target == cell)
						{
							cell.edges[i].setTerminal(cell.parent, false);
						}
					}
				}

				// Moves children to parent
				if (cell.children != null && cell.children.length > 0)
				{
					var cells = cell.children.slice();

					for (var i = 0; i < cells.length; i++)
					{
						p.insert(cells[i]);
					}
				}

				graph.cellLabelChanged(p, graph.convertValueToString(cell));
				p.style = mxUtils.setStyle(mxUtils.setStyle(
					cell.style, 'container', '1'),
					'collapsible', '0');
				cell.removeFromParent();
			}
		}
	};

	function createGraph()
	{
		//TODO Set the graph defaults
		var graph = new Graph();
        graph.setExtendParents(false);
        graph.setExtendParentsOnAdd(false);
        graph.setConstrainChildren(false);
        graph.setHtmlLabels(true);
        graph.getModel().maintainEdgeParent = false;
        return graph;
	};

	//Code adopted from vsdx importer

	/**
	 * Holds the NURBS array that is part of the VSDX NURBSTo element, together with some helper functions
	 */
    function Nurbs(x1, y1, n1x, n1y, x2, y2, n2x, n2y)
	{
        this.nurbsValues = [1, 3, 0, 0, 
			(x1 + n1x) * 100,
			100 - (1 - (y1 + n1y)) * 100,
			0, 1,
			(x2 + n2x) * 100,
			100 - (1 - (y2 + n2y)) * 100,
			0, 1
		];
    }
    /**
     * @return {number} number of points, not including the last one (which is outside of the nurbs string)
     */
    Nurbs.prototype.getSize = function () {
        return (((this.nurbsValues.length / 4 | 0)) - 1);
    };
    /**
     * @return {number} the i-th X coordinate
     * @param {number} i
     */
    Nurbs.prototype.getX = function (i) {
        return Math.round(this.nurbsValues[(i + 1) * 4] * 100.0) / 100.0;;
    };
    /**
     * @return {number} the i-th Y coordinate
     * @param {number} i
     */
    Nurbs.prototype.getY = function (i) {
        return Math.round(this.nurbsValues[(i + 1) * 4 + 1] * 100.0) / 100.0;;
    };

	//A: 0, B: 1, C: 0, D: 1 
	function NURBSTo(x, y, w, h, px1, py1, n1x, n1y, px2, py2, n2x, n2y) 
	{
        var nurbs = new Nurbs(px1, py1, n1x, n1y, px2, py2, n2x, n2y);

        if (nurbs.getSize() >= 2) 
		{
            var x1 = nurbs.getX(0);
            var y1 = nurbs.getY(0);
            var x2 = nurbs.getX(1);
            var y2 = nurbs.getY(1);
            y = y * 100.0 / h;
            x = x * 100.0 / w;
            x = Math.round(x * 100.0) / 100.0;
            y = Math.round(y * 100.0) / 100.0;

            var cp1 = ([]);
            var cp2 = ([]);
            var nut = ([]);
            var nurbsize = nurbs.getSize();
            
			for (var i = 0; i < nurbsize - 1; i = i + 3) 
			{
                cp1.push(new mxPoint(nurbs.getX(i), nurbs.getY(i)));
                cp2.push(new mxPoint(nurbs.getX(i + 1), nurbs.getY(i + 1)));
                
				if (i < nurbsize - 2) {
                    nut.push(new mxPoint(nurbs.getX(i + 2), nurbs.getY(i + 2)));
                }
                else {
                    nut.push(new mxPoint(x, y));
                }
            }
            
            var result = "";
            for (var i = 0; i < cp1.length; i++) {
                result += "<curve x1=\"" + cp1[i].x + "\" y1=\"" + cp1[i].y + "\" x2=\"" + cp2[i].x + "\" y2=\"" + cp2[i].y + "\" x3=\"" + nut[i].x + "\" y3=\"" + nut[i].y + "\"/>";
            }
            
            return result;
        }
    };

	function addStencil(id, obj)
	{
		try
		{
			var stencils = [];
			var w = obj.BoundingBox.w;
			var h = obj.BoundingBox.h;
			
			for (var i = 0; i < obj.Shapes.length; i++)
			{
				var shape = obj.Shapes[i];
				var fillClr = shape.FillColor;
				var strokeClr = shape.StrokeColor;
				var lineW = shape.LineWidth;
				var points = shape.Points;
				var lines = shape.Lines;
				var parts = ["<shape strokewidth=\"inherit\"><foreground>"];
				parts.push("<path>");
				var lastP = null;
				
				for (var j = 0; j < lines.length; j++)
				{
					var line = lines[j];
					
					if (lastP != line.p1) //Add move to when last point is different from current first poinnt
					{
						var x = points[line.p1].x, y = points[line.p1].y;
						x = x * 100.0 / w;
						y = y * 100.0 / h;
						x = Math.round(x * 100.0) / 100.0;
						y = Math.round(y * 100.0) / 100.0;
						parts.push("<move x=\"" + x + "\" y=\"" + y + "\"/>");
					}
					
					if (line.n1 != null) // Curve
					{
						var curve =  NURBSTo(points[line.p2].x, points[line.p2].y, w, h, 
								points[line.p1].x / w, points[line.p1].y / h, line.n1.x / w, line.n1.y / h, 
								points[line.p2].x / w, points[line.p2].y / h, line.n2.x / w, line.n2.y / h);
						parts.push(curve);
					}
					else //line
					{
						var x = points[line.p2].x, y = points[line.p2].y;
						x = x * 100.0 / w;
						y = y * 100.0 / h;
						x = Math.round(x * 100.0) / 100.0;
						y = Math.round(y * 100.0) / 100.0;
						parts.push("<line x=\"" + x + "\" y=\"" + y + "\"/>");
					}
					
					lastP = line.p2;
				}
				
				parts.push("</path>");
				parts.push("<fillstroke/>");
				parts.push("</foreground></shape>");
				stencils.push({
					shapeStencil: "stencil(" + Graph.compress(parts.join('')) + ")",
					FillColor: fillClr,
					LineColor: strokeClr,
					LineWidth: lineW,
				});
			}

			LucidImporter.stencilsMap[id] = {
				text: obj.Text,
				w: w,
				h: h,
				x: obj.BoundingBox.x,
				y: obj.BoundingBox.y,
				stencils: stencils
			};
		}
		catch(e)
		{
			console.log('Stencil parsing error:', e);
		}	
	};
	
	LucidImporter.importState = function(state, imgSrcRepl, advImpConfig)
	{
		dx = 0;
		dy = 0;
		LucidImporter.stencilsMap = {}; //Reset stencils cache
		LucidImporter.imgSrcRepl = imgSrcRepl; //Use LucidImporter object to store the map since it is used deep inside
		LucidImporter.advImpConfig = advImpConfig;
		LucidImporter.globalProps = {};
		LucidImporter.pageIdsMap = {};
		LucidImporter.hasUnknownShapes = false;
		LucidImporter.hasOrgChart = false;
		LucidImporter.hasTimeLine = false;
		LucidImporter.hasExtImgs = false;
		var xml = ['<?xml version=\"1.0\" encoding=\"UTF-8\"?>', '<mxfile type="Lucidchart-Import" version="' +
			EditorUi.VERSION + '" host="' + mxUtils.htmlEntities(window.location.hostname) + 
			'" agent="' + mxUtils.htmlEntities(navigator.appVersion) + 
			'" modified="' + mxUtils.htmlEntities(new Date().toISOString()) + '">'];

		if (advImpConfig && advImpConfig.transparentEdgeLabels)
		{
			labelStyle = labelStyle.replace('labelBackgroundColor=default;', 'labelBackgroundColor=none;');
		}
		
		// Extracts and sorts all pages
		var pages = [];

		function addPages(obj)
		{
			if (obj.state != null)
			{
				EditorUi.debug('convertLucidChart addPages', obj);
			}

			//Build stencils map 
			if (obj.Properties)
			{
				for (var key in obj.Properties)
				{
					if (key.substr(0, 8) == 'Stencil-')
					{
						addStencil(key.substr(8), obj.Properties[key]);
					}
				}
				
				LucidImporter.globalProps = obj.Properties;
			}
			
			for (var id in obj.Pages)
			{
				var pg = obj.Pages[id];
				pg.id = id;
				pg.Data = obj.Data;
				pages.push(pg);
			}
			
			pages.sort(function(a, b)
			{
			    if (a.Properties.Order < b.Properties.Order)
			    {
			    	return -1;
			    }
			    else if (a.Properties.Order > b.Properties.Order)
			    {
			    	return 1;
			    }
			    else
			    {
			    	return 0;
			    }
			});
			
			for (var i = 0; i < pages.length; i++)
			{
				LucidImporter.pageIdsMap[pages[i].id] = i;
			}
		};

		if (state.state != null)
		{
			addPages(JSON.parse(state.state));
		}
		else if (state.Page == null && state.Pages != null)
		{
			addPages(state);
		}
		else
		{
			pages.push(state);
		}
		
		var graph = createGraph();
		var codec = new mxCodec();
		
		for (var i = 0; i < pages.length; i++)
		{
            xml.push('<diagram');
            
            if (pages[i].Properties != null && pages[i].Properties.Title != null)
            {
            	xml.push(' name="' + mxUtils.htmlEntities(pages[i].Properties.Title) + '"');
            }
            
            xml.push(' id="' + i + '"'); //Add page ids in case it is needed in aspects
			importLucidPage(graph, pages[i], true);
            var node = codec.encode(graph.getModel());
 			
			if (pages[i].Properties != null)
            {
				if (pages[i].Properties.FillColor && pages[i].Properties.FillColor != '#ffffff')
				{
            		node.setAttribute('background', getColor(pages[i].Properties.FillColor));
				}
				
				if (pages[i].Properties.InfiniteCanvas)
				{
					node.setAttribute('page', 0);
				}
				else if (pages[i].Properties.Size != null)
				{
					node.setAttribute('page', 1);
					node.setAttribute('pageWidth', pages[i].Properties.Size.w * scale);
					node.setAttribute('pageHeight', pages[i].Properties.Size.h * scale);
				}
				
				if (pages[i].Properties.GridSpacing != null)
				{
					node.setAttribute('grid', 1);
					node.setAttribute('gridSize', pages[i].Properties.GridSpacing * scale);
				}
            }
			
			if (LucidImporter.hasMath)
			{
				node.setAttribute('math', 1);
			}

            graph.getModel().clear();

            xml.push('>' + Graph.compress(mxUtils.getXml(node)) + '</diagram>');
		}
		
		xml.push('</mxfile>');
		LucidImporter.imgSrcRepl = null; //Reset the map so it doesn't affect next calls
		
		return xml.join('');
	};

	function addRouterEdge(x, y, edge, select, graph, cells, v, cell)
	{
	   	var dummy = new mxCell('', new mxGeometry(x, y, 0, 0), 'strokeColor=none;fillColor=none;');
	   	dummy.vertex = true;
	   	v.insert(dummy);
	   	cells = [dummy];
	   	
		var e = edge.clone();
		cell.insertEdge(e, false);
		dummy.insertEdge(e, true);
		cells.push(e);
		select.push(graph.addCell(e, null, null, null, null));
	};
   	
	function addFloatingEdge(x1, y1, x2, y2, edge, select, graph, cells, v)
	{
	   	var dummy1 = new mxCell('', new mxGeometry(x1, y1, 0, 0), 'strokeColor=none;fillColor=none;');
	   	dummy1.vertex = true;
	   	v.insert(dummy1);
	   	cells = [dummy1];
	   	
	   	var dummy2 = new mxCell('', new mxGeometry(x2, y2, 0, 0), 'strokeColor=none;fillColor=none;');
	   	dummy2.vertex = true;
	   	v.insert(dummy2);
	   	cells = [dummy2];
	   	
		var e = edge.clone();
		dummy1.insertEdge(e, true);
		dummy2.insertEdge(e, false);
		cells.push(e);
		select.push(graph.addCell(e, null, null, null, null));
	};
   	
	function addGCP2ServiceCard(icon, w, h, v, p, a)
	{
		v.style = 'rounded=1;absoluteArcSize=1;fillColor=#ffffff;arcSize=2;strokeColor=#dddddd;';
		v.style += addAllStyles(v.style, p, a, v);
		
		var label = convertText(p);
    	v.vertex = true;
	    var icon1 = new mxCell(label, new mxGeometry(0, 0.5, 24, 24), 
	    		'dashed=0;connectable=0;html=1;strokeColor=none;' + mxConstants.STYLE_SHAPE + '=mxgraph.gcp2.' + icon + ';part=1;shadow=0;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;'); 
	    icon1.style += addAllStyles(icon1.style, p, a, icon1, isLastLblHTML);
	    
	    icon1.geometry.relative = true;
	    icon1.geometry.offset = new mxPoint(5, -12);
    	icon1.vertex = true;
    	v.insert(icon1);
	};
	
	function addGCP2UserDeviceCard(icon, scaleX, scaleY, w, h, v, p, a)
	{
		if (icon != 'transparent')
		{
			var s = mxConstants.STYLE_SHAPE + '=mxgraph.gcp2.';
		}
		else
		{
			var s = mxConstants.STYLE_SHAPE + '=';
		}

		v.style = 'rounded=1;absoluteArcSize=1;arcSize=2;verticalAlign=bottom;fillColor=#ffffff;strokeColor=#dddddd;whiteSpace=wrap;';
		v.style += addAllStyles(v.style, p, a, v);
		
		v.value = convertText(p);
    	v.vertex = true;
	    var icon1 = new mxCell(null, new mxGeometry(0.5, 0, w * 0.7 * scaleX, w * 0.7 * scaleY), 
	    		s + icon + ';part=1;dashed=0;connectable=0;html=1;strokeColor=none;shadow=0;'); 

	    icon1.geometry.relative = true;
	    icon1.geometry.offset = new mxPoint(- scaleX * w * 0.35, 10 + (1 - scaleY) * w * 0.35);
    	icon1.vertex = true;
    	icon1.style += addAllStyles(icon1.style, p, a, icon1, isLastLblHTML);
    	v.insert(icon1);
	};
	
	function addGCP2ExpandedProductCard(icon, scaleX, scaleY, w, h, v, p, a)
	{
		if (icon != 'transparent')
		{
			var s = mxConstants.STYLE_SHAPE + '=mxgraph.gcp.';
		}
		else
		{
			var s = mxConstants.STYLE_SHAPE + '=';
		}

		v.style = 'rounded=1;absoluteArcSize=1;arcSize=2;verticalAlign=bottom;fillColor=#ffffff;strokeColor=#dddddd;whiteSpace=wrap;';
		v.style += addAllStyles(v.style, p, a, v);
		
		v.value = convertText(p);
    	v.vertex = true;
	    var icon1 = new mxCell(null, new mxGeometry(0.5, 0, w * 0.7 * scaleX, w * 0.7 * scaleY), 
	    		s + icon + ';part=1;dashed=0;connectable=0;html=1;strokeColor=none;shadow=0;'); 

	    icon1.geometry.relative = true;
	    icon1.geometry.offset = new mxPoint(- scaleX * w * 0.35, 10 + (1 - scaleY) * w * 0.35);
    	icon1.vertex = true;
    	icon1.style += addAllStyles(icon1.style, p, a, icon1, isLastLblHTML);
    	v.insert(icon1);
	};
	
	function hasStyle(style, key)
	{
		if (style != null && key != null)
		{
			if (key == mxConstants.STYLE_ALIGN + 'Global')
			{
				key = mxConstants.STYLE_ALIGN;
			}
			
			if (style.includes(';' + key + '='))
			{
				return true;
			}
			
			if (style.substring(0,key.length + 1) == (key + '='))
			{
				return true;
			}
		}
		
		return false;
	}
	
	function getDarkerClr(clr, perc)
	{
		function modComp(comp)
		{
			var v = Math.round(parseInt('0x' + comp) * perc).toString(16);
			return v.length == 1? '0' + v : v;
		}
		
		return '#' + modComp(clr.substr(1, 2)) +
						 		modComp(clr.substr(3, 2)) +
								modComp(clr.substr(5, 2));
	};
					
	//composite shapes
	function addCompositeShape(obj, select, graph)
	{
		var a = getAction(obj);
		var p = a.Properties;
		var b = p.BoundingBox;

		var w = Math.round(b.w * scale);
		var h = Math.round(b.h * scale);
		var x = Math.round(b.x * scale + dx);
		var y = Math.round(b.y * scale + dy);

		if (obj.Class != null && 
				(obj.Class === "GCPInputDatabase" ||
				 obj.Class === "GCPInputRecord" ||
				 obj.Class === "GCPInputPayment" ||
				 obj.Class === "GCPInputGateway" ||
				 obj.Class === "GCPInputLocalCompute" ||
				 obj.Class === "GCPInputBeacon" ||
				 obj.Class === "GCPInputStorage" ||
				 obj.Class === "GCPInputList" ||
				 obj.Class === "GCPInputStream" ||
				 obj.Class === "GCPInputMobileDevices" ||
				 obj.Class === "GCPInputCircuitBoard" ||
				 obj.Class === "GCPInputLive" ||
				 obj.Class === "GCPInputUsers" ||
				 obj.Class === "GCPInputLaptop" ||
				 obj.Class === "GCPInputApplication" ||
				 obj.Class === "GCPInputLightbulb" ||
				 obj.Class === "GCPInputGame" ||
				 obj.Class === "GCPInputDesktop" ||
				 obj.Class === "GCPInputDesktopAndMobile" ||
				 obj.Class === "GCPInputWebcam" ||
				 obj.Class === "GCPInputSpeaker" ||
				 obj.Class === "GCPInputRetail" ||
				 obj.Class === "GCPInputReport" ||
				 obj.Class === "GCPInputPhone" ||
				 obj.Class === "GCPInputBlank"))
		{
			h = h + 20;
		}

		v = new mxCell('', new mxGeometry(x, y, w, h), vertexStyle);
	    v.vertex = true;

	    //Store z-order to use it in groups
		v.zOrder = p.ZOrder;
		
	    var cls = (obj.Class != null) ? obj.Class : (a != null) ? a.Class : null;
	    
	    //composite shapes
		switch (cls)
		{
			case 'BraceNoteBlock' :
			case 'UI2BraceNoteBlock' :
								
				var isRightBrace = false;
				
				if (p.BraceDirection != null)
				{
					if (p.BraceDirection == 'Right')
					{
						isRightBrace = true;
					}				
				}
				
				var brace = null;
				var label = null;
				var lbl = convertText(p);
				//TODO Handle rotation of label correctly in all cases
				var lblSize = p.Rotation? mxUtils.getSizeForString(lbl.replace(/\n/g, '<br>'), null, null, Math.abs(w - h * 0.125)) : {width: 0, height: 0};
				
				if (isRightBrace)
				{
					brace = new mxCell('', new mxGeometry(w - h * 0.125, 0,	h * 0.125, h), 'shape=curlyBracket;rounded=1;');
					label = new mxCell('', new mxGeometry(lblSize.height, -2 * lblSize.width, w - h * 0.125, h), 'strokeColor=none;fillColor=none;');
				}
				else
				{
					brace = new mxCell('', new mxGeometry(0, 0,	h * 0.125, h), 'shape=curlyBracket;rounded=1;flipH=1;');
					label = new mxCell('', new mxGeometry(h * 0.125 - lblSize.height, lblSize.width, w - h * 0.125, h), 'strokeColor=none;fillColor=none;');
				}
				
				v.style = "strokeColor=none;fillColor=none;"
				v.style += addAllStyles(v.style, p, a, v);
				
				brace.vertex = true;
				v.insert(brace);

				brace.style += 	
				addAllStyles(brace.style, p, a, brace);

				label.vertex = true;
				label.value = lbl;
				v.insert(label);
				
				label.style += 	
					addAllStyles(label.style, p, a, label, isLastLblHTML);
				break;
			case 'BPMNAdvancedPoolBlockRotated' :
			case 'UMLMultiLanePoolRotatedBlock' :
			case 'UMLMultiLanePoolBlock' :
			case 'BPMNAdvancedPoolBlock' :
			case 'AdvancedSwimLaneBlockRotated' :
			case 'AdvancedSwimLaneBlock' :
			case 'UMLSwimLaneBlockV2':
				//Lucid changed swimlanes format
				var mainTxtFld = 'MainText', laneFld = null, headerFillFld = 'HeaderFill_', bodyFillFld = 'BodyFill_';
				var mainTxtHeight = 25, laneTxtHeight = 25;
				var lanesNum = 0;
				
				if (p.Lanes != null)
				{
					lanesNum = p.Lanes.length;
				}
				else if (p.PrimaryLane != null)
				{
					lanesNum = p.PrimaryLane.length;

					//In this format, boundingBox is not accurate!
					w = 0, h = 0;
					
					for (var i = 0; i < lanesNum; i++)
					{
						w += p.PrimaryLane[i];
					}
					
					for (var i = 0; i < p.SecondaryLane.length; i++)
					{
						h += p.SecondaryLane[i];
					}
					
				    function fixTitleHeight(val)
					{
						if (!val) 
						{
							return 0;
						}
						else if (val < 32)
						{
							val = 32;
						}
						else if (val > 208)
						{
							val = 208;
						}

						return val * scale;
					};

					mainTxtHeight = fixTitleHeight(p.PrimaryPoolTitleHeight);
					laneTxtHeight = fixTitleHeight(p.PrimaryLaneTitleHeight);
					
					w = w * scale;
					h = h * scale + mainTxtHeight + laneTxtHeight;
					v.geometry.width = w;
					v.geometry.height = h;
					
					mainTxtFld = 'poolPrimaryTitleKey';
					headerFillFld = 'PrimaryLaneHeaderFill_';
					bodyFillFld = 'CellFill_0,';
					laneFld = p.PrimaryLaneTextAreaIds;
					
					if (laneFld == null)
					{
						laneFld = [];
						
						for (var i = 0; i < lanesNum; i++)
						{
							laneFld.push('Primary_' + i);
						}
					}
				}
				
				if (p.IsPrimaryLaneVertical == false)
				{
					p['Rotation'] = -1.5707963267948966; //-90
					var origX = v.geometry.x;
					var origY = v.geometry.y;
				}
				
			    var rotatedSL = p['Rotation'] != 0; 
			    var isPool = cls.indexOf('Pool') > 0;
			    var isBPMN = cls.indexOf('BPMN') == 0;
			    var hasTxt = p[mainTxtFld] != null;
				
				v.style = (isPool? 'swimlane;startSize=' + mainTxtHeight + ';' : 'fillColor=none;strokeColor=none;pointerEvents=0;fontStyle=0;') + 
					'html=1;whiteSpace=wrap;container=1;collapsible=0;childLayout=stackLayout;' +
					'resizeParent=1;dropTarget=0;' + (rotatedSL? 'horizontalStack=0;' : '');
				v.style += addAllStyles(v.style, p, a, v);
				
				if (hasTxt)
				{
					v.value = convertText(p[mainTxtFld]);
					v.style += (isLastLblHTML? 'overflow=block;blockSpacing=1;fontSize=' + defaultFontSize + ';' +
							gFontFamilyStyle
							: 
							getFontSize(p[mainTxtFld]) +
							getFontColor(p[mainTxtFld]) + 
							getFontFamily(p[mainTxtFld]) + 
							getFontStyle(p[mainTxtFld]) +
							getTextAlignment(p[mainTxtFld], v) + 
							getTextLeftSpacing(p[mainTxtFld]) +
							getTextRightSpacing(p[mainTxtFld]) + 
							getTextTopSpacing(p[mainTxtFld]) +
							getTextBottomSpacing(p[mainTxtFld]) 
							) +
							getTextGlobalSpacing(p[mainTxtFld]) +
							getTextVerticalAlignment(p[mainTxtFld]);
				}
				
				var totalOffset = 0; //relative
				var lane = new Array();

				var laneStyle = 'swimlane;html=1;whiteSpace=wrap;container=1;connectable=0;collapsible=0;fontStyle=0;startSize=' + laneTxtHeight + ';dropTarget=0;rounded=0;' + 
								(rotatedSL? 'horizontal=0;': '') +
								(isBPMN? 'swimlaneLine=0;fillColor=none;' : '');
				p['Rotation'] = 0; //Override rotation such that it doesn't mess with our coordinates
				
				for (var j = 0; j < lanesNum; j++)
				{
					if (laneFld == null)
					{
						var currOffset = parseFloat(p.Lanes[j].p);
						var i = parseInt(p.Lanes[j].tid) || j;
						var curLane = 'Lane_' + i;
					}
					else
					{
						var currOffset = (p.PrimaryLane[j] * scale)/ w;
						var i = j;
						var curLane = laneFld[j];
					}

					var childX = w * totalOffset;
					var childY = isPool? mainTxtHeight : 0;
					lane.push(new mxCell('', rotatedSL? new mxGeometry(childY, childX,	h - childY, w * currOffset) :
						new mxGeometry(childX, childY,	w * currOffset, h - childY), laneStyle));
					
					lane[j].vertex = true;
					v.insert(lane[j]);
					lane[j].value = convertText(p[curLane]);
					lane[j].style +=
									addAllStyles(lane[j].style, p, a, lane[j], isLastLblHTML) +
									(isLastLblHTML? 'fontSize=' + defaultFontSize + ';' : 
									getFontSize(p[curLane]) +
									getFontColor(p[curLane]) + 
									getFontStyle(p[curLane]) +
									getTextAlignment(p[curLane], lane[j]) + 
									getTextLeftSpacing(p[curLane]) +
									getTextRightSpacing(p[curLane]) + 
									getTextTopSpacing(p[curLane]) +
									getTextBottomSpacing(p[curLane]) 
									) +
									getTextGlobalSpacing(p[curLane]) +
									getTextVerticalAlignment(p[curLane]) +
									getHeaderColor(p[headerFillFld + i]) +
									getLaneColor(p[bodyFillFld + i]);

					totalOffset += currOffset;
				}
				
				if (origX != null)
				{
					v.geometry.x = origX;
					v.geometry.y = origY;
				}
				break;
			case 'UMLMultidimensionalSwimlane' :
				var rowsNum = 0;
				var colsNum = 0;
				var rowFld = null, colFld = null;
				
				if (p.Rows != null && p.Columns != null)
				{
					rowsNum = p.Rows.length;
					colsNum = p.Columns.length;
					var colStartSize = p.TitleHeight * scale || 25;
					var rowStartSize = p.TitleWidth  * scale || 25;
				}
				else if (p.PrimaryLane != null && p.SecondaryLane != null)
				{
					rowsNum = p.SecondaryLane.length;
					colsNum = p.PrimaryLane.length;
					var rowStartSize = p.SecondaryLaneTitleHeight  * scale || 25;
					var colStartSize = p.PrimaryLaneTitleHeight * scale || 25;
					
					//In this format, boundingBox is not accurate!
					w = 0, h = 0;
					
					for (var i = 0; i < rowsNum; i++)
					{
						h += p.SecondaryLane[i];
					}
					
					for (var i = 0; i < colsNum; i++)
					{
						w += p.PrimaryLane[i];
					}
					
					w = w * scale + rowStartSize;
					h = h * scale + colStartSize;
					v.geometry.width = w;
					v.geometry.height = h;
					
					rowFld = p.SecondaryLaneTextAreaIds;
					colFld = p.PrimaryLaneTextAreaIds;
				}
					
				v.style = 'group;';
				var contStyle = 'fillColor=none;strokeColor=none;html=1;whiteSpace=wrap;container=1;collapsible=0;childLayout=stackLayout;' +
									'resizeParent=1;dropTarget=0;';
				var rows = new mxCell('', new mxGeometry(0, colStartSize, w, h - colStartSize), contStyle + 'horizontalStack=0;');
				rows.vertex = true;
				var cols = new mxCell('', new mxGeometry(rowStartSize, 0, w - rowStartSize, h), contStyle);
				cols.vertex = true;
				
				v.insert(rows);
				v.insert(cols);
				var y = 0;
				
				var rowStyle = 'swimlane;html=1;whiteSpace=wrap;container=1;connectable=0;collapsible=0;dropTarget=0;horizontal=0;fontStyle=0;startSize=' + rowStartSize + ';';
				
				for (var j = 0; j < rowsNum; j++)
				{
					if (rowFld == null)
					{
						var rh = parseInt(p.Rows[j].height) * scale;
						var i = parseInt(p.Rows[j].id) || j;
						var curRow = 'Row_' + i;
					}
					else
					{
						var rh = p.SecondaryLane[j] * scale;
						var curRow = rowFld[j];
					}
					
					var r = new mxCell('', new mxGeometry(0, y, w, rh), rowStyle);
					y += rh;
					r.vertex = true;
					rows.insert(r);
					r.value = convertText(p[curRow]);
					r.style +=
									addAllStyles(r.style, p, a, r, isLastLblHTML) +
									(isLastLblHTML? 'fontSize=' + defaultFontSize + ';' : 
									getFontSize(p[curRow]) +
									getFontColor(p[curRow]) + 
									getFontStyle(p[curRow]) +
									getTextAlignment(p[curRow], r) + 
									getTextLeftSpacing(p[curRow]) +
									getTextRightSpacing(p[curRow]) + 
									getTextTopSpacing(p[curRow]) +
									getTextBottomSpacing(p[curRow]) 
									) +
									getTextGlobalSpacing(p[curRow]) +
									getTextVerticalAlignment(p[curRow]);
				}
				
				var colStyle = 'swimlane;html=1;whiteSpace=wrap;container=1;connectable=0;collapsible=0;dropTarget=0;fontStyle=0;startSize=' + colStartSize + ';';
				var x = 0;
				
				for (var j = 0; j < colsNum; j++)
				{
					if (colFld == null)
					{
						var cw = parseInt(p.Columns[j].width) * scale;
						var i = parseInt(p.Columns[j].id) || j;
						var curCol = 'Column_' + i;
					}
					else
					{
						var cw = p.PrimaryLane[j] * scale;
						var curCol = colFld[j];
					}
					
					var c = new mxCell('', new mxGeometry(x, 0, cw, h), colStyle);
					x += cw;
					c.vertex = true;
					cols.insert(c);
					c.value = convertText(p[curCol]);
					c.style +=
									addAllStyles(c.style, p, a, c, isLastLblHTML) +
									(isLastLblHTML? 'fontSize=' + defaultFontSize + ';' : 
									getFontSize(p[curCol]) +
									getFontColor(p[curCol]) + 
									getFontStyle(p[curCol]) +
									getTextAlignment(p[curCol], c) + 
									getTextLeftSpacing(p[curCol]) +
									getTextRightSpacing(p[curCol]) + 
									getTextTopSpacing(p[curCol]) +
									getTextBottomSpacing(p[curCol]) 
									) + 
									getTextGlobalSpacing(p[curCol]) +
									getTextVerticalAlignment(p[curCol]);
				}
				break;
			case 'UMLStateBlock' : 
				if (p.Composite == 0)
				{
					v.style = 'rounded=1;arcSize=20';
					v.value = convertText(p.State, true);
					v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				}
				else
				{
					v.style = 'swimlane;startSize=25;html=1;whiteSpace=wrap;container=1;collapsible=0;childLayout=stackLayout;' +
								'resizeParent=1;dropTarget=0;rounded=1;arcSize=20;fontStyle=0;';
					v.value = convertText(p.State, true);
					v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
					v.style += getFillColor(p, a).replace('fillColor', 'swimlaneFillColor');
					
					var content = new mxCell('', new mxGeometry(0, 25, w, h - 25), 'rounded=1;arcSize=20;strokeColor=none;fillColor=none');
					content.value = convertText(p.Action, true);
					content.style += addAllStyles(content.style, p, a, content, isLastLblHTML);
					content.vertex = true;
					v.insert(content);
				}
				break;
			case 'GSDFDProcessBlock' : 
				var startSize = Math.round(p.nameHeight * scale);
				v.style = 'shape=swimlane;html=1;rounded=1;arcSize=10;collapsible=0;fontStyle=0;startSize=' + startSize;
				v.value = convertText(p.Number, true);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				v.style += getFillColor(p, a).replace('fillColor', 'swimlaneFillColor');
				
				var content = new mxCell('', new mxGeometry(0, startSize, w, h - startSize), 'rounded=1;arcSize=10;strokeColor=none;fillColor=none');
				content.value = convertText(p.Text, true);
				content.style += addAllStyles(content.style, p, a, content, isLastLblHTML);
				content.vertex = true;
				v.insert(content);
				break;
			case 'AndroidDevice' :
				if (p.AndroidDeviceName != null)
				{
					var rotation = getRotation(p, a, v);
					v.style = "fillColor=#000000;strokeColor=#000000;";
					var background = null;
					var keyboard = null;
					var statusBar = null;
					
					if (p.AndroidDeviceName == 'Tablet' || p.AndroidDeviceName == 'Mini Tablet' ||  (p.AndroidDeviceName == 'custom' && p.CustomDeviceType == 'Tablet'))
					{
						v.style += "shape=mxgraph.android.tab2;"
						background = new mxCell('', new mxGeometry(0.112, 0.077, w * 0.77, h * 0.85), rotation);
						
						if (p.KeyboardShown)
						{
							keyboard = new mxCell('', new mxGeometry(0.112, 0.727, w * 0.77, h * 0.2), 'shape=mxgraph.android.keyboard;' + rotation);
						}

						if (!p.FullScreen)
						{
							statusBar = new mxCell('', new mxGeometry(0.112, 0.077, w * 0.77, h * 0.03), 'shape=mxgraph.android.statusBar;strokeColor=#33b5e5;fillColor=#000000;fontColor=#33b5e5;fontSize=' + h * 0.015 + ';' + rotation);
						}
					}
					else if (p.AndroidDeviceName == 'Large Phone' || p.AndroidDeviceName == 'Phone' ||  (p.AndroidDeviceName == 'custom' && p.CustomDeviceType == 'Phone'))
					{
						v.style += "shape=mxgraph.android.phone2;"
						background = new mxCell('', new mxGeometry(0.04, 0.092, w * 0.92, h * 0.816), rotation);
						
						if (p.KeyboardShown)
						{
							keyboard = new mxCell('', new mxGeometry(0.04, 0.708, w * 0.92, h * 0.2), 'shape=mxgraph.android.keyboard;' + rotation);
						}
						
						if (!p.FullScreen)
						{
							statusBar = new mxCell('', new mxGeometry(0.04, 0.092, w * 0.92, h * 0.03), 'shape=mxgraph.android.statusBar;strokeColor=#33b5e5;fillColor=#000000;fontColor=#33b5e5;fontSize=' + h * 0.015 + ';' + rotation);
						}
					}
					
					background.vertex = true;
					background.geometry.relative = true;
					v.insert(background);
					
					if (p.Scheme == "Dark")
					{
						background.style += "fillColor=#111111;"
					}
					else if (p.Scheme == "Light")
					{
						background.style += "fillColor=#ffffff;"
					}
					
					if (keyboard != null)
					{
						keyboard.vertex = true;
						keyboard.geometry.relative = true;
						v.insert(keyboard);
					}

					if (statusBar != null)
					{
						statusBar.vertex = true;
						statusBar.geometry.relative = true;
						v.insert(statusBar);
					}
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidAlertDialog' :
				var dialog = new mxCell('', new mxGeometry(0, 0, w, 30), 'strokeColor=none;fillColor=none;spacingLeft=9;');
				dialog.vertex = true;
				v.insert(dialog);
				var line = new mxCell('', new mxGeometry(0, 25, w, 10), 'shape=line;strokeColor=#33B5E5;');
				line.vertex = true;
				v.insert(line);
				var dialogText = new mxCell('', new mxGeometry(0, 30, w, h - 30), 'strokeColor=none;fillColor=none;verticalAlign=top;');
				dialogText.vertex = true;
				v.insert(dialogText);
				var cancelButton = new mxCell('', new mxGeometry(0, h - 25, w * 0.5, 25), 'fillColor=none;');
				cancelButton.vertex = true;
				v.insert(cancelButton);
				var okButton = new mxCell('', new mxGeometry(w * 0.5, h - 25, w * 0.5, 25), 'fillColor=none;');
				okButton.vertex = true;
				v.insert(okButton);
				dialog.value = convertText(p.DialogTitle);
				dialog.style += getLabelStyle(p.DialogTitle, isLastLblHTML);
				dialogText.value = convertText(p.DialogText);
				dialogText.style += getLabelStyle(p.DialogText, isLastLblHTML);
				cancelButton.value = convertText(p.Button_0);
				cancelButton.style += getLabelStyle(p.Button_0, isLastLblHTML);
				okButton.value = convertText(p.Button_1);
				okButton.style += getLabelStyle(p.Button_1, isLastLblHTML);

				if (p.Scheme == 'Dark')
				{
					v.style += 'strokeColor=#353535;fillColor=#282828;shadow=1;';
					cancelButton.style += 'strokeColor=#353535;';
					okButton.style += 'strokeColor=#353535;';
				}
				else
				{
					v.style += 'strokeColor=none;fillColor=#ffffff;shadow=1;';
					cancelButton.style += 'strokeColor=#E2E2E2;';
					okButton.style += 'strokeColor=#E2E2E2;';
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidDateDialog' :
			case 'AndroidTimeDialog' :
				var dialog = new mxCell('', new mxGeometry(0, 0, w, 30), 'strokeColor=none;fillColor=none;spacingLeft=9;');
				dialog.vertex = true;
				v.insert(dialog);
				dialog.value = convertText(p.DialogTitle);
				dialog.style += getLabelStyle(p.DialogTitle, isLastLblHTML);
				var line = new mxCell('', new mxGeometry(0, 25, w, 10), 'shape=line;strokeColor=#33B5E5;');
				line.vertex = true;
				v.insert(line);
				var cancelButton = new mxCell('', new mxGeometry(0, h - 25, w * 0.5, 25), 'fillColor=none;');
				cancelButton.vertex = true;
				v.insert(cancelButton);
				cancelButton.value = convertText(p.Button_0);
				cancelButton.style += getLabelStyle(p.Button_0, isLastLblHTML);
				var okButton = new mxCell('', new mxGeometry(w * 0.5, h - 25, w * 0.5, 25), 'fillColor=none;');
				okButton.vertex = true;
				v.insert(okButton);
				okButton.value = convertText(p.Button_1);
				okButton.style += getLabelStyle(p.Button_1, isLastLblHTML);

				var triangle1 = new mxCell('', new mxGeometry(w * 0.5 - 4, 41, 8, 4), 'shape=triangle;direction=north;');
				triangle1.vertex = true;
				v.insert(triangle1);
				var triangle2 = new mxCell('', new mxGeometry(w * 0.25 - 4, 41, 8, 4), 'shape=triangle;direction=north;');
				triangle2.vertex = true;
				v.insert(triangle2);
				var triangle3 = new mxCell('', new mxGeometry(w * 0.75 - 4, 41, 8, 4), 'shape=triangle;direction=north;');
				triangle3.vertex = true;
				v.insert(triangle3);

				var prevDate1 = new mxCell('', new mxGeometry(w * 0.375, 50, w * 0.2, 15), 'strokeColor=none;fillColor=none;');
				prevDate1.vertex = true;
				v.insert(prevDate1);
				prevDate1.value = convertText(p.Label_1);
				prevDate1.style += getLabelStyle(p.Label_1, isLastLblHTML);
				var prevDate2 = new mxCell('', new mxGeometry(w * 0.125, 50, w * 0.2, 15), 'strokeColor=none;fillColor=none;');
				prevDate2.vertex = true;
				v.insert(prevDate2);
				prevDate2.value = convertText(p.Label_0);
				prevDate2.style += getLabelStyle(p.Label_0, isLastLblHTML);

				var prevDate3 = null;
				
				if (obj.Class == 'AndroidDateDialog')
				{
					prevDate3 = new mxCell('', new mxGeometry(w * 0.625, 50, w * 0.2, 15), 'strokeColor=none;fillColor=none;');
					prevDate3.vertex = true;
					v.insert(prevDate3);
					prevDate3.value = convertText(p.Label_2);
					prevDate3.style += getLabelStyle(p.Label_2, isLastLblHTML);
				}

				var line1 = new mxCell('', new mxGeometry(w * 0.43, 60, w * 0.14, 10), 'shape=line;strokeColor=#33B5E5;');
				line1.vertex = true;
				v.insert(line1);
				var line2 = new mxCell('', new mxGeometry(w * 0.18, 60, w * 0.14, 10), 'shape=line;strokeColor=#33B5E5;');
				line2.vertex = true;
				v.insert(line2);
				var line3 = new mxCell('', new mxGeometry(w * 0.68, 60, w * 0.14, 10), 'shape=line;strokeColor=#33B5E5;');
				line3.vertex = true;
				v.insert(line3);

				var date1 = new mxCell('', new mxGeometry(w * 0.375, 65, w * 0.2, 15), 'strokeColor=none;fillColor=none;');
				date1.vertex = true;
				v.insert(date1);
				date1.value = convertText(p.Label_4);
				date1.style += getLabelStyle(p.Label_4, isLastLblHTML);
				
				var sep = null;
				
				if (obj.Class == 'AndroidTimeDialog')
				{
					sep = new mxCell('', new mxGeometry(w * 0.3, 65, w * 0.1, 15), 'strokeColor=none;fillColor=none;');
					sep.vertex = true;
					v.insert(sep);
					sep.value = convertText(p.Label_Colon);
					sep.style += getLabelStyle(p.Label_Colon, isLastLblHTML);
				}
				
				var date2 = new mxCell('', new mxGeometry(w * 0.125, 65, w * 0.2, 15), 'strokeColor=none;fillColor=none;');
				date2.vertex = true;
				v.insert(date2);
				date2.value = convertText(p.Label_3);
				date2.style += getLabelStyle(p.Label_3, isLastLblHTML);
				var date3 = new mxCell('', new mxGeometry(w * 0.625, 65, w * 0.2, 15), 'strokeColor=none;fillColor=none;');
				date3.vertex = true;
				v.insert(date3);
				date3.value = convertText(p.Label_5);
				date3.style += getLabelStyle(p.Label_5, isLastLblHTML);

				var line4 = new mxCell('', new mxGeometry(w * 0.43, 75, w * 0.14, 10), 'shape=line;strokeColor=#33B5E5;');
				line4.vertex = true;
				v.insert(line4);
				var line5 = new mxCell('', new mxGeometry(w * 0.18, 75, w * 0.14, 10), 'shape=line;strokeColor=#33B5E5;');
				line5.vertex = true;
				v.insert(line5);
				var line6 = new mxCell('', new mxGeometry(w * 0.68, 75, w * 0.14, 10), 'shape=line;strokeColor=#33B5E5;');
				line6.vertex = true;
				v.insert(line6);

				var nextDate1 = new mxCell('', new mxGeometry(w * 0.375, 80, w * 0.2, 15), 'strokeColor=none;fillColor=none;');
				nextDate1.vertex = true;
				v.insert(nextDate1);
				nextDate1.value = convertText(p.Label_7);
				nextDate1.style += getLabelStyle(p.Label_7, isLastLblHTML);
				var nextDate2 = new mxCell('', new mxGeometry(w * 0.125, 80, w * 0.2, 15), 'strokeColor=none;fillColor=none;');
				nextDate2.vertex = true;
				v.insert(nextDate2);
				nextDate2.value = convertText(p.Label_6);
				nextDate2.style += getLabelStyle(p.Label_6, isLastLblHTML);
				var nextDate3 = new mxCell('', new mxGeometry(w * 0.625, 80, w * 0.2, 15), 'strokeColor=none;fillColor=none;');
				nextDate3.vertex = true;
				v.insert(nextDate3);
				nextDate3.value = convertText(p.Label_8);
				nextDate3.style += getLabelStyle(p.Label_8, isLastLblHTML);
				
				var triangle4 = new mxCell('', new mxGeometry(w * 0.5 - 4, 99, 8, 4), 'shape=triangle;direction=south;');
				triangle4.vertex = true;
				v.insert(triangle4);
				var triangle5 = new mxCell('', new mxGeometry(w * 0.25 - 4, 99, 8, 4), 'shape=triangle;direction=south;');
				triangle5.vertex = true;
				v.insert(triangle5);
				var triangle6 = new mxCell('', new mxGeometry(w * 0.75 - 4, 99, 8, 4), 'shape=triangle;direction=south;');
				triangle6.vertex = true;
				v.insert(triangle6);

				if (p.Scheme == 'Dark')
				{
					v.style += 'strokeColor=#353535;fillColor=#282828;shadow=1;';
					cancelButton.style += 'strokeColor=#353535;';
					okButton.style += 'strokeColor=#353535;';
					triangle1.style += 'strokeColor=none;fillColor=#7E7E7E;';
					triangle2.style += 'strokeColor=none;fillColor=#7E7E7E;';
					triangle3.style += 'strokeColor=none;fillColor=#7E7E7E;';
					triangle4.style += 'strokeColor=none;fillColor=#7E7E7E;';
					triangle5.style += 'strokeColor=none;fillColor=#7E7E7E;';
					triangle6.style += 'strokeColor=none;fillColor=#7E7E7E;';
				}
				else
				{
					v.style += 'strokeColor=none;fillColor=#ffffff;shadow=1;';
					cancelButton.style += 'strokeColor=#E2E2E2;';
					okButton.style += 'strokeColor=#E2E2E2;';
					triangle1.style += 'strokeColor=none;fillColor=#939393;';
					triangle2.style += 'strokeColor=none;fillColor=#939393;';
					triangle3.style += 'strokeColor=none;fillColor=#939393;';
					triangle4.style += 'strokeColor=none;fillColor=#939393;';
					triangle5.style += 'strokeColor=none;fillColor=#939393;';
					triangle6.style += 'strokeColor=none;fillColor=#939393;';
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidListItems' :
				var itemFullH = h;
				var startH = 0;
				
				if (p.ShowHeader)
				{
					startH = 8;
					
					var header = new mxCell('', new mxGeometry(0, 0, w, startH), 'strokeColor=none;fillColor=none;');
					header.vertex = true;
					v.insert(header);
					header.value = convertText(p.Header);
					header.style += getLabelStyle(p.Header, isLastLblHTML);
					
					itemFullH -= startH;
					
					var lineH = new mxCell('', new mxGeometry(0, startH - 2, w, 4), 'shape=line;strokeColor=#999999;');
					lineH.vertex = true;
					v.insert(lineH);
				}
				
				var numItems = parseInt(p.Items);
				
				if (numItems > 0)
				{
					itemFullH = itemFullH / numItems;
				}
				
				var item = new Array();
				var line = new Array();
				
				for (var i = 0; i < numItems; i++)
				{
					item[i] = new mxCell('', new mxGeometry(0, startH + i * itemFullH, w, itemFullH), 'strokeColor=none;fillColor=none;');
					item[i].vertex = true;
					v.insert(item[i]);
					item[i].value = convertText(p["Item_" + i]);
					item[i].style += getLabelStyle(p["Item_" + i], isLastLblHTML);
					
					if (i > 0)
					{
						line[i] = new mxCell('', new mxGeometry(0, startH + i * itemFullH - 2, w, 4), 'shape=line;');
						line[i].vertex = true;
						v.insert(line[i]);
						
						if (p.Scheme == 'Dark')
						{
							line[i].style += 'strokeColor=#ffffff;';
						}
						else
						{
							line[i].style += 'strokeColor=#D9D9D9;';
						}
					}
				}
				
				if (p.Scheme == 'Dark')
				{
					v.style += 'strokeColor=none;fillColor=#111111;';
				}
				else
				{
					v.style += 'strokeColor=none;fillColor=#ffffff;';
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidTabs' :
				var numTabs = parseInt(p.Tabs);
				var tabFullW = w;
				
				if (numTabs > 0)
				{
					tabFullW = tabFullW / numTabs;
				}
				
				var tab = new Array();
				var line = new Array();
				
				for (var i = 0; i < numTabs; i++)
				{
					tab[i] = new mxCell('', new mxGeometry(i * tabFullW, 0, tabFullW, h), 'strokeColor=none;fillColor=none;');
					tab[i].vertex = true;
					v.insert(tab[i]);
					tab[i].value = convertText(p["Tab_" + i]);
					tab[i].style += getLabelStyle(p["Tab_" + i], isLastLblHTML);
					
					if (i > 0)
					{
						line[i] = new mxCell('', new mxGeometry(i * tabFullW - 2, h * 0.2, 4, h * 0.6), 'shape=line;direction=north;');
						line[i].vertex = true;
						v.insert(line[i]);
						
						if (p.Scheme == 'Dark')
						{
							line[i].style += 'strokeColor=#484848;';
						}
						else
						{
							line[i].style += 'strokeColor=#CCCCCC;';
						}
					}
				}

				var selectedMarker = new mxCell('', new mxGeometry(p.Selected * tabFullW + 2, h - 3, tabFullW - 4, 3), 'strokeColor=none;fillColor=#33B5E5;');
				selectedMarker.vertex = true;
				v.insert(selectedMarker);

				if (p.Scheme == 'Dark')
				{
					v.style += 'strokeColor=none;fillColor=#333333;';
				}
				else
				{
					v.style += 'strokeColor=none;fillColor=#DDDDDD;';
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidProgressBar' :
				v = new mxCell('', new mxGeometry(Math.round(x), Math.round(y + h * 0.25), Math.round(w), Math.round(h * 0.5)), vertexStyle);
			    v.vertex = true;
				
				var progressBar = new mxCell('', new mxGeometry(0, 0, w * p.BarPosition, Math.round(h * 0.5)), 'strokeColor=none;fillColor=#33B5E5;');
				progressBar.vertex = true;
				v.insert(progressBar);

				if (p.Scheme == 'Dark')
				{
					v.style += 'strokeColor=none;fillColor=#474747;';
				}
				else
				{
					v.style += 'strokeColor=none;fillColor=#BBBBBB;';
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidImageBlock' :
				if (p.Scheme == 'Dark')
				{
					v.style += 'shape=mxgraph.mockup.graphics.simpleIcon;strokeColor=#7E7E7E;fillColor=#111111;';
				}
				else
				{
					v.style += 'shape=mxgraph.mockup.graphics.simpleIcon;strokeColor=#939393;fillColor=#ffffff;';
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidTextBlock' :
				if (p.Scheme == 'Dark')
				{
					if (p.ShowBorder)
					{
						v.style += 'fillColor=#111111;strokeColor=#ffffff;';
					}
					else
					{
						v.style += 'fillColor=#111111;strokeColor=none;';
					}
				}
				else
				{
					if (p.ShowBorder)
					{
						v.style += 'fillColor=#ffffff;strokeColor=#000000;';
					}
					else
					{
						v.style += 'fillColor=#ffffff;strokeColor=none;';
					}
				}
				
				v.value = convertText(p.Label);
				v.style += getLabelStyle(p.Label, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				break;

			case 'AndroidActionBar' :
				v.style += 'strokeColor=none;';
				
				switch (p.BarBackground)
				{
					case 'Blue' :
						v.style += 'fillColor=#002E3E;';
						break;
					case 'Gray' :
						v.style += 'fillColor=#DDDDDD;';
						break;
					case 'Dark Gray' :
						v.style += 'fillColor=#474747;';
						break;
					case 'White' :
						v.style += 'fillColor=#ffffff;';
						break;
				}
				
				if (p.HighlightShow)
				{
					var highlight = null;
					
					if (p.HighlightTop)
					{
						highlight = new mxCell('', new mxGeometry(0, 0, w, 2), 'strokeColor=none;');
					}
					else
					{
						highlight = new mxCell('', new mxGeometry(0, h - 2, w, 2), 'strokeColor=none;');
					}

					highlight.vertex = true;
					v.insert(highlight);

					switch (p.HighlightColor)
					{
						case 'Blue' :
							highlight.style += 'fillColor=#33B5E5;';
							break;
						case 'Dark Gray' :
							highlight.style += 'fillColor=#B0B0B0;';
							break;
						case 'White' :
							highlight.style += 'fillColor=#ffffff;';
							break;
					}
				}
				
				if (p.VlignShow)
				{
					var vLine = new mxCell('', new mxGeometry(20, 5, 2, h - 10), 'shape=line;direction=north;');
					vLine.vertex = true;
					v.insert(vLine);

					switch (p.VlignColor)
					{
						case 'Blue' :
							vLine.style += 'strokeColor=#244C5A;';
							break;
						case 'White' :
							vLine.style += 'strokeColor=#ffffff;';
							break;
					}
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidButton' :
				v.value = convertText(p.Label);
				v.style += getLabelStyle(p.Label, isLastLblHTML) + 'shape=partialRectangle;left=0;right=0;';

				if (p.Scheme == 'Dark')
				{
					v.style += 'fillColor=#474747;strokeColor=#C6C5C6;bottom=0;';
				}
				else
				{
					v.style += 'fillColor=#DFE0DF;strokeColor=#C6C5C6;top=0;';
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidTextBox' :
				v.value = convertText(p.Label);
				v.style += getLabelStyle(p.Label, isLastLblHTML);

				var underline = new mxCell('', new mxGeometry(2, h - 6, w - 4, 4), 'shape=partialRectangle;top=0;fillColor=none;');
				underline.vertex = true;
				v.insert(underline);

				if (p.Scheme == 'Dark')
				{
					v.style += 'fillColor=#111111;strokeColor=none;';
				}
				else
				{
					v.style += 'fillColor=#ffffff;strokeColor=none;';
				}
				
				if (p.TextFocused)
				{
					underline.style += 'strokeColor=#33B5E5;';
				}
				else
				{
					underline.style += 'strokeColor=#A9A9A9;';
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidRadioButton' :
				var dot = null;
				
				if (p.Checked)
				{
					dot = new mxCell('', new mxGeometry(w * 0.15, h * 0.15, w * 0.7, h * 0.7), 'ellipse;fillColor=#33B5E5;strokeWidth=1;');
					dot.vertex = true;
					v.insert(dot);
				}

				if (p.Scheme == 'Dark')
				{
					v.style += 'shape=ellipse;perimeter=ellipsePerimeter;strokeWidth=1;strokeColor=#272727;';
					
					if (p.Checked)
					{
						dot.style += 'strokeColor=#1F5C73;';
						v.style += 'fillColor=#193C49;';
					}
					else
					{
						v.style += 'fillColor=#111111;';
					}
				}
				else
				{
					v.style += 'shape=ellipse;perimeter=ellipsePerimeter;strokeWidth=1;fillColor=#ffffff;strokeColor=#5C5C5C;';
					
					if (p.Checked)
					{
						dot.style += 'strokeColor=#999999;';
					}
				}

				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidCheckBox' :
				var check = null;
				if (p.Checked)
				{
					check = new mxCell('', new mxGeometry(w * 0.25, - h * 0.05, w, h * 0.8), 'shape=mxgraph.ios7.misc.check;strokeColor=#33B5E5;strokeWidth=2;');
					check.vertex = true;
					v.insert(check);
				}

				if (p.Scheme == 'Dark')
				{
					v.style += 'strokeWidth=1;strokeColor=#272727;fillColor=#111111;';
				}
				else
				{
					v.style += 'strokeWidth=1;strokeColor=#5C5C5C;fillColor=#ffffff;';
				}

				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidToggle' :
				if (p.Scheme == 'Dark')
				{
					if (p.Checked)
					{
						v.style += 'shape=mxgraph.android.switch_on;fillColor=#666666;';
					}
					else
					{
						v.style += 'shape=mxgraph.android.switch_off;fillColor=#666666;';
					}
				}
				else
				{
					if (p.Checked)
					{
						v.style += 'shape=mxgraph.android.switch_on;fillColor=#E6E6E6;';
					}
					else
					{
						v.style += 'shape=mxgraph.android.switch_off;fillColor=#E6E6E6;';
					}
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'AndroidSlider' :
				v.style += 'shape=mxgraph.android.progressScrubberFocused;dx=' + p.BarPosition + ';fillColor=#33b5e5;';
				v.style += addAllStyles(v.style, p, a, v);
				
				break;
				
			case 'iOSSegmentedControl' :
				var numTabs = parseInt(p.Tabs);
				var tabFullW = w;
				v.style += 'strokeColor=none;fillColor=none;';
				
				if (numTabs > 0)
				{
					tabFullW = tabFullW / numTabs;
				}
				
				var tab = new Array();
				var line = new Array();
				
				for (var i = 0; i < numTabs; i++)
				{
					tab[i] = new mxCell('', new mxGeometry(i * tabFullW, 0, tabFullW, h), 'strokeColor=' + p.FillColor + ';');
					tab[i].vertex = true;
					v.insert(tab[i]);
					tab[i].value = convertText(p["Tab_" + i]);
					tab[i].style += getLabelStyle(p["Tab_" + i], isLastLblHTML);
					
					if (p.Selected == i)
					{
						tab[i].style += getFillColor(p, a);
					}
					else
					{
						tab[i].style += 'fillColor=none;';
					}
				}

				v.style += addAllStyles(v.style, p, a, v);
				break;

			case 'iOSSlider' :
				v.style += 'shape=mxgraph.ios7ui.slider;strokeColor=' + p.FillColor + ';fillColor=#ffffff;strokeWidth=2;barPos=' + p.BarPosition * 100 + ';';
				v.style += addAllStyles(v.style, p, a, v);
				
				break;

			case 'iOSProgressBar':
				v = new mxCell('', new mxGeometry(Math.round(x), Math.round(y + h * 0.25), Math.round(w), Math.round(h * 0.5)), vertexStyle + 'strokeColor=none;fillColor=#B5B5B5;');
			    v.vertex = true;
				
				var progressBar = new mxCell('', new mxGeometry(0, 0, w * p.BarPosition, Math.round(h * 0.5)), 'strokeColor=none;' + getFillColor(p, a));
				progressBar.vertex = true;
				v.insert(progressBar);

				v.style += addAllStyles(v.style, p, a, v);
				break;

			case 'iOSPageControls' :
				v.style += 'shape=mxgraph.ios7ui.pageControl;strokeColor=#D6D6D6;';
				v.style += addAllStyles(v.style, p, a, v);
				
				break;

			case 'iOSStatusBar' :
				v.style += 'shape=mxgraph.ios7ui.appBar;strokeColor=#000000;';

				var text1 = new mxCell(convertText(p.Text), new mxGeometry(w * 0.35, 0, w * 0.3, h), 'strokeColor=none;fillColor=none;');
				text1.vertex = true;
				v.insert(text1);
				text1.style += getLabelStyle(p.Text, isLastLblHTML);
				
				var text2 = new mxCell(convertText(p.Carrier), new mxGeometry(w * 0.09, 0, w * 0.2, h), 'strokeColor=none;fillColor=none;');
				text2.vertex = true;
				v.insert(text2);
				text2.style += getLabelStyle(p.Carrier, isLastLblHTML);
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
				
			case 'iOSSearchBar' :
				v.value = convertText(p.Search);

				v.style += 'strokeColor=none;';
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML) +
					getLabelStyle(p.Search, isLastLblHTML);
				
				var icon1 = new mxCell('', new mxGeometry(w * 0.3, h * 0.3, h * 0.4, h * 0.4), 'shape=mxgraph.ios7.icons.looking_glass;strokeColor=#000000;fillColor=none;');
				icon1.vertex = true;
				v.insert(icon1);
				
				break;
				
			case 'iOSNavBar' :
				v.value = convertText(p.Title);
				v.style += 'shape=partialRectangle;top=0;right=0;left=0;strokeColor=#979797;'
					+ getLabelStyle(p.Title, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				var text1 = new mxCell(convertText(p.LeftText), new mxGeometry(w * 0.03, 0, w * 0.3, h), 'strokeColor=none;fillColor=none;');
				text1.vertex = true;
				v.insert(text1);
				text1.style += getLabelStyle(p.LeftText, isLastLblHTML);
				
				var text2 = new mxCell(convertText(p.RightText), new mxGeometry(w * 0.65, 0, w * 0.3, h), 'strokeColor=none;fillColor=none;');
				text2.vertex = true;
				v.insert(text2);
				text2.style += getLabelStyle(p.RightText, isLastLblHTML);
				
				var icon1 = new mxCell('', new mxGeometry(w * 0.02, h * 0.2, h * 0.3, h * 0.5), 'shape=mxgraph.ios7.misc.left;strokeColor=#007AFF;strokeWidth=2;');
				icon1.vertex = true;
				v.insert(icon1);
				
				break;
				
			case 'iOSTabs' :
				var numTabs = parseInt(p.Tabs);
				var tabFullW = w;
				v.style += 'shape=partialRectangle;right=0;left=0;bottom=0;strokeColor=#979797;';
				v.style += addAllStyles(v.style, p, a, v);
				
				if (numTabs > 0)
				{
					tabFullW = tabFullW / numTabs;
				}
				
				var tab = new Array();
				var line = new Array();
				
				for (var i = 0; i < numTabs; i++)
				{
					tab[i] = new mxCell('', new mxGeometry(i * tabFullW, 0, tabFullW, h), 'strokeColor=none;');
					tab[i].vertex = true;
					v.insert(tab[i]);
					tab[i].value = convertText(p["Tab_" + i]);
					
					tab[i].style += (isLastLblHTML? 'overflow=block;blockSpacing=1;html=1;fontSize=' + defaultFontSize + ';' +
									gFontFamilyStyle
									:
									getFontSize(p["Tab_" + i]) +
									getFontFamily(p["Tab_" + i]) +
									getFontColor(p["Tab_" + i]) + 
									getFontStyle(p["Tab_" + i]) +
									getTextAlignment(p["Tab_" + i]) + 
									getTextLeftSpacing(p["Tab_" + i]) +
									getTextRightSpacing(p["Tab_" + i]) + 
									getTextTopSpacing(p["Tab_" + i]) +
									getTextBottomSpacing(p["Tab_" + i]) + 
									getTextGlobalSpacing(p["Tab_" + i]));
					
					tab[i].style += 'verticalAlign=bottom;';
					
					if (p.Selected == i)
					{
						tab[i].style += 'fillColor=#BBBBBB;';
					}
					else
					{
						tab[i].style += 'fillColor=none;';
					}
				}

				break;

			case 'iOSDatePicker' :
				var firstDate1 = new mxCell('', new mxGeometry(0, 0, w * 0.5, h * 0.2), 'strokeColor=none;fillColor=none;');
				firstDate1.vertex = true;
				v.insert(firstDate1);
				firstDate1.value = convertText(p.Option11);
				firstDate1.style += getLabelStyle(p.Option11, isLastLblHTML);
				var firstDate2 = new mxCell('', new mxGeometry(w * 0.5, 0, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				firstDate2.vertex = true;
				v.insert(firstDate2);
				firstDate2.value = convertText(p.Option21);
				firstDate2.style += getLabelStyle(p.Option21, isLastLblHTML);
				var firstDate3 = new mxCell('', new mxGeometry(w * 0.65, 0, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				firstDate3.vertex = true;
				v.insert(firstDate3);
				firstDate3.value = convertText(p.Option31);
				firstDate3.style += getLabelStyle(p.Option31, isLastLblHTML);

				var secondDate1 = new mxCell('', new mxGeometry(0, h * 0.2, w * 0.5, h * 0.2), 'strokeColor=none;fillColor=none;');
				secondDate1.vertex = true;
				v.insert(secondDate1);
				secondDate1.value = convertText(p.Option12);
				secondDate1.style += getLabelStyle(p.Option12, isLastLblHTML);
				var secondDate2 = new mxCell('', new mxGeometry(w * 0.5, h * 0.2, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				secondDate2.vertex = true;
				v.insert(secondDate2);
				secondDate2.value = convertText(p.Option22);
				secondDate2.style += getLabelStyle(p.Option22, isLastLblHTML);
				var secondDate3 = new mxCell('', new mxGeometry(w * 0.65, h * 0.2, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				secondDate3.vertex = true;
				v.insert(secondDate3);
				secondDate3.value = convertText(p.Option32);
				secondDate3.style += getLabelStyle(p.Option32, isLastLblHTML);

				var currDate1 = new mxCell('', new mxGeometry(0, h * 0.4, w * 0.5, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate1.vertex = true;
				v.insert(currDate1);
				currDate1.value = convertText(p.Option13);
				currDate1.style += getLabelStyle(p.Option13, isLastLblHTML);
				var currDate2 = new mxCell('', new mxGeometry(w * 0.5, h * 0.4, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate2.vertex = true;
				v.insert(currDate2);
				currDate2.value = convertText(p.Option23);
				currDate2.style += getLabelStyle(p.Option23, isLastLblHTML);
				var currDate3 = new mxCell('', new mxGeometry(w * 0.65, h * 0.4, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate3.vertex = true;
				v.insert(currDate3);
				currDate3.value = convertText(p.Option33);
				currDate3.style += getLabelStyle(p.Option33, isLastLblHTML);
				var currDate4 = new mxCell('', new mxGeometry(w * 0.80, h * 0.4, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate4.vertex = true;
				v.insert(currDate4);
				currDate4.value = convertText(p.Option43);
				currDate4.style += getLabelStyle(p.Option43, isLastLblHTML);

				var fourthDate1 = new mxCell('', new mxGeometry(0, h * 0.6, w * 0.5, h * 0.2), 'strokeColor=none;fillColor=none;');
				fourthDate1.vertex = true;
				v.insert(fourthDate1);
				fourthDate1.value = convertText(p.Option14);
				fourthDate1.style += getLabelStyle(p.Option14, isLastLblHTML);
				var fourthDate2 = new mxCell('', new mxGeometry(w * 0.5, h * 0.6, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				fourthDate2.vertex = true;
				v.insert(fourthDate2);
				fourthDate2.value = convertText(p.Option24);
				fourthDate2.style += getLabelStyle(p.Option24, isLastLblHTML);
				var fourthDate3 = new mxCell('', new mxGeometry(w * 0.65, h * 0.6, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				fourthDate3.vertex = true;
				v.insert(fourthDate3);
				fourthDate3.value = convertText(p.Option34);
				fourthDate3.style += getLabelStyle(p.Option34, isLastLblHTML);
				var fourthDate4 = new mxCell('', new mxGeometry(w * 0.8, h * 0.6, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				fourthDate4.vertex = true;
				v.insert(fourthDate4);
				fourthDate4.value = convertText(p.Option44);
				fourthDate4.style += getLabelStyle(p.Option44, isLastLblHTML);

				var fifthDate1 = new mxCell('', new mxGeometry(0, h * 0.8, w * 0.5, h * 0.2), 'strokeColor=none;fillColor=none;');
				fifthDate1.vertex = true;
				v.insert(fifthDate1);
				fifthDate1.value = convertText(p.Option15);
				fifthDate1.style += getLabelStyle(p.Option15, isLastLblHTML);
				var fifthDate2 = new mxCell('', new mxGeometry(w * 0.5, h * 0.8, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				fifthDate2.vertex = true;
				v.insert(fifthDate2);
				fifthDate2.value = convertText(p.Option25);
				fifthDate2.style += getLabelStyle(p.Option25, isLastLblHTML);
				var fifthDate3 = new mxCell('', new mxGeometry(w * 0.65, h * 0.8, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				fifthDate3.vertex = true;
				v.insert(fifthDate3);
				fifthDate3.value = convertText(p.Option35);
				fifthDate3.style += getLabelStyle(p.Option35, isLastLblHTML);

				var line1 = new mxCell('', new mxGeometry(0, h * 0.4 - 2, w, 4), 'shape=line;strokeColor=#888888;');
				line1.vertex = true;
				v.insert(line1);
				var line2 = new mxCell('', new mxGeometry(0, h * 0.6 - 2, w, 4), 'shape=line;strokeColor=#888888;');
				line2.vertex = true;
				v.insert(line2);

				v.style += 'strokeColor=none;';
				v.style += addAllStyles(v.style, p, a, v);
				
				break;
				
			case 'iOSTimePicker' :
				var firstDate1 = new mxCell('', new mxGeometry(0, 0, w * 0.25, h * 0.2), 'strokeColor=none;fillColor=none;');
				firstDate1.vertex = true;
				v.insert(firstDate1);
				firstDate1.value = convertText(p.Option11);
				firstDate1.style += getLabelStyle(p.Option11, isLastLblHTML);
				var firstDate2 = new mxCell('', new mxGeometry(w * 0.25, 0, w * 0.3, h * 0.2), 'strokeColor=none;fillColor=none;');
				firstDate2.vertex = true;
				v.insert(firstDate2);
				firstDate2.value = convertText(p.Option21);
				firstDate2.style += getLabelStyle(p.Option21, isLastLblHTML);

				var secondDate1 = new mxCell('', new mxGeometry(0, h * 0.2, w * 0.25, h * 0.2), 'strokeColor=none;fillColor=none;');
				secondDate1.vertex = true;
				v.insert(secondDate1);
				secondDate1.value = convertText(p.Option12);
				secondDate1.style += getLabelStyle(p.Option12, isLastLblHTML);
				var secondDate2 = new mxCell('', new mxGeometry(w * 0.25, h * 0.2, w * 0.3, h * 0.2), 'strokeColor=none;fillColor=none;');
				secondDate2.vertex = true;
				v.insert(secondDate2);
				secondDate2.value = convertText(p.Option22);
				secondDate2.style += getLabelStyle(p.Option22, isLastLblHTML);

				var currDate1 = new mxCell('', new mxGeometry(0, h * 0.4, w * 0.25, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate1.vertex = true;
				v.insert(currDate1);
				currDate1.value = convertText(p.Option13);
				currDate1.style += getLabelStyle(p.Option13, isLastLblHTML);
				var currDate2 = new mxCell('', new mxGeometry(w * 0.25, h * 0.4, w * 0.3, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate2.vertex = true;
				v.insert(currDate2);
				currDate2.value = convertText(p.Option23);
				currDate2.style += getLabelStyle(p.Option23, isLastLblHTML);
				var currDate4 = new mxCell('', new mxGeometry(w * 0.7, h * 0.4, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate4.vertex = true;
				v.insert(currDate4);
				currDate4.value = convertText(p.Option33);
				currDate4.style += getLabelStyle(p.Option33, isLastLblHTML);

				var fourthDate1 = new mxCell('', new mxGeometry(0, h * 0.6, w * 0.25, h * 0.2), 'strokeColor=none;fillColor=none;');
				fourthDate1.vertex = true;
				v.insert(fourthDate1);
				fourthDate1.value = convertText(p.Option14);
				fourthDate1.style += getLabelStyle(p.Option14, isLastLblHTML);
				var fourthDate2 = new mxCell('', new mxGeometry(w * 0.25, h * 0.6, w * 0.3, h * 0.2), 'strokeColor=none;fillColor=none;');
				fourthDate2.vertex = true;
				v.insert(fourthDate2);
				fourthDate2.value = convertText(p.Option24);
				fourthDate2.style += getLabelStyle(p.Option24, isLastLblHTML);
				var fourthDate4 = new mxCell('', new mxGeometry(w * 0.7, h * 0.6, w * 0.15, h * 0.2), 'strokeColor=none;fillColor=none;');
				fourthDate4.vertex = true;
				v.insert(fourthDate4);
				fourthDate4.value = convertText(p.Option34);
				fourthDate4.style += getLabelStyle(p.Option34, isLastLblHTML);

				var fifthDate1 = new mxCell('', new mxGeometry(0, h * 0.8, w * 0.25, h * 0.2), 'strokeColor=none;fillColor=none;');
				fifthDate1.vertex = true;
				v.insert(fifthDate1);
				fifthDate1.value = convertText(p.Option15);
				fifthDate1.style += getLabelStyle(p.Option15, isLastLblHTML);
				var fifthDate2 = new mxCell('', new mxGeometry(w * 0.25, h * 0.8, w * 0.3, h * 0.2), 'strokeColor=none;fillColor=none;');
				fifthDate2.vertex = true;
				v.insert(fifthDate2);
				fifthDate2.value = convertText(p.Option25);
				fifthDate2.style += getLabelStyle(p.Option25, isLastLblHTML);

				var line1 = new mxCell('', new mxGeometry(0, h * 0.4 - 2, w, 4), 'shape=line;strokeColor=#888888;');
				line1.vertex = true;
				v.insert(line1);
				var line2 = new mxCell('', new mxGeometry(0, h * 0.6 - 2, w, 4), 'shape=line;strokeColor=#888888;');
				line2.vertex = true;
				v.insert(line2);

				v.style += 'strokeColor=none;';
				v.style += addAllStyles(v.style, p, a, v);
				
				break;
				
			case 'iOSCountdownPicker' :
				var firstDate3 = new mxCell('', new mxGeometry(w * 0.45, 0, w * 0.2, h * 0.2), 'strokeColor=none;fillColor=none;');
				firstDate3.vertex = true;
				v.insert(firstDate3);
				firstDate3.value = convertText(p.Option31);
				firstDate3.style += getLabelStyle(p.Option31, isLastLblHTML);

				var secondDate3 = new mxCell('', new mxGeometry(w * 0.45, h * 0.2, w * 0.2, h * 0.2), 'strokeColor=none;fillColor=none;');
				secondDate3.vertex = true;
				v.insert(secondDate3);
				secondDate3.value = convertText(p.Option32);
				secondDate3.style += getLabelStyle(p.Option32, isLastLblHTML);

				var currDate1 = new mxCell('', new mxGeometry(0, h * 0.4, w * 0.25, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate1.vertex = true;
				v.insert(currDate1);
				currDate1.value = convertText(p.Option13);
				currDate1.style += getLabelStyle(p.Option13, isLastLblHTML);
				var currDate2 = new mxCell('', new mxGeometry(w * 0.2, h * 0.4, w * 0.25, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate2.vertex = true;
				v.insert(currDate2);
				currDate2.value = convertText(p.Option23);
				currDate2.style += getLabelStyle(p.Option23, isLastLblHTML);
				var currDate3 = new mxCell('', new mxGeometry(w * 0.45, h * 0.4, w * 0.2, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate3.vertex = true;
				v.insert(currDate3);
				currDate3.value = convertText(p.Option33);
				currDate3.style += getLabelStyle(p.Option33, isLastLblHTML);
				var currDate4 = new mxCell('', new mxGeometry(w * 0.6, h * 0.4, w * 0.2, h * 0.2), 'strokeColor=none;fillColor=none;');
				currDate4.vertex = true;
				v.insert(currDate4);
				currDate4.value = convertText(p.Option43);
				currDate4.style += getLabelStyle(p.Option43, isLastLblHTML);

				var fourthDate1 = new mxCell('', new mxGeometry(0, h * 0.6, w * 0.25, h * 0.2), 'strokeColor=none;fillColor=none;');
				fourthDate1.vertex = true;
				v.insert(fourthDate1);
				fourthDate1.value = convertText(p.Option14);
				fourthDate1.style += getLabelStyle(p.Option14, isLastLblHTML);
				var fourthDate3 = new mxCell('', new mxGeometry(w * 0.45, h * 0.6, w * 0.2, h * 0.2), 'strokeColor=none;fillColor=none;');
				fourthDate3.vertex = true;
				v.insert(fourthDate3);
				fourthDate3.value = convertText(p.Option34);
				fourthDate3.style += getLabelStyle(p.Option34, isLastLblHTML);

				var fifthDate1 = new mxCell('', new mxGeometry(0, h * 0.8, w * 0.25, h * 0.2), 'strokeColor=none;fillColor=none;');
				fifthDate1.vertex = true;
				v.insert(fifthDate1);
				fifthDate1.value = convertText(p.Option15);
				fifthDate1.style += getLabelStyle(p.Option15, isLastLblHTML);
				var fifthDate3 = new mxCell('', new mxGeometry(w * 0.45, h * 0.8, w * 0.2, h * 0.2), 'strokeColor=none;fillColor=none;');
				fifthDate3.vertex = true;
				v.insert(fifthDate3);
				fifthDate3.value = convertText(p.Option35);
				fifthDate3.style += getLabelStyle(p.Option35, isLastLblHTML);

				var line1 = new mxCell('', new mxGeometry(0, h * 0.4 - 2, w, 4), 'shape=line;strokeColor=#888888;');
				line1.vertex = true;
				v.insert(line1);
				var line2 = new mxCell('', new mxGeometry(0, h * 0.6 - 2, w, 4), 'shape=line;strokeColor=#888888;');
				line2.vertex = true;
				v.insert(line2);

				v.style += 'strokeColor=none;';
				v.style += addAllStyles(v.style, p, a, v);
				
				break;
				
			case 'iOSBasicCell' :
				v.value = convertText(p.text);
				v.style += 'shape=partialRectangle;left=0;top=0;right=0;fillColor=#ffffff;strokeColor=#C8C7CC;spacing=0;align=left;spacingLeft=' + (p.SeparatorInset * scale) + ';';
				v.style += (isLastLblHTML? 'fontSize=' + defaultFontSize + ';' : 
					getFontSize(p.text) +
					getFontColor(p.text) + 
					getFontStyle(p.text)) +
					getTextVerticalAlignment(p.text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				switch (p.AccessoryIndicatorType) 
				{
					case 'Disclosure' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.91, h * 0.35, h * 0.15, h * 0.3), 'shape=mxgraph.ios7.misc.right;strokeColor=#D2D2D6;');
						icon1.vertex = true;
						v.insert(icon1);
						
						break;
						
					case 'DetailDisclosure' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.91, h * 0.35, h * 0.15, h * 0.3), 'shape=mxgraph.ios7.misc.right;strokeColor=#D2D2D6;');
						icon1.vertex = true;
						v.insert(icon1);
						
						var icon2 = new mxCell('', new mxGeometry(w * 0.79, h * 0.25, h * 0.5, h * 0.5), 'shape=mxgraph.ios7.icons.info;strokeColor=#007AFF;fillColor=#ffffff;');
						icon2.vertex = true;
						v.insert(icon2);
						
						break;
						
					case 'DetailIndicator' :
						var icon2 = new mxCell('', new mxGeometry(w * 0.87, h * 0.25, h * 0.5, h * 0.5), 'shape=mxgraph.ios7.icons.info;strokeColor=#007AFF;fillColor=#ffffff;');
						icon2.vertex = true;
						v.insert(icon2);
						
						break;
						
					case 'CheckMark' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.89, h * 0.37, h * 0.4, h * 0.26), 'shape=mxgraph.ios7.misc.check;strokeColor=#007AFF;strokeWidth=2;');
						icon1.vertex = true;
						v.insert(icon1);
						
						break;
				}

				break;
				
			case 'iOSSubtitleCell' :
				v.style += 'shape=partialRectangle;left=0;top=0;right=0;fillColor=#ffffff;strokeColor=#C8C7CC;align=left;spacing=0;verticalAlign=top;spacingLeft=' + (p.SeparatorInset * scale) + ';';
				v.value = convertText(p.subtext);
				v.style += (isLastLblHTML? 'fontSize=' + defaultFontSize + ';' : 
					getFontSize(p.subtext) +
					getFontColor(p.subtext) + 
					getFontStyle(p.subtext));
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var subtext = new mxCell('', new mxGeometry(0, h * 0.4, w, h * 0.6), 'fillColor=none;strokeColor=none;spacing=0;align=left;verticalAlign=bottom;spacingLeft=' + (p.SeparatorInset * scale) + ';');
				subtext.vertex = true;
				v.insert(subtext);
				subtext.value = convertText(p.text);
				subtext.style += (isLastLblHTML? 'html=1;fontSize=' + defaultFontSize + ';' +
					gFontFamilyStyle
					: 
					getFontSize(p.text) +
					getFontFamily(p.text) + 
					getFontColor(p.text) + 
					getFontStyle(p.text));

				switch (p.AccessoryIndicatorType) 
				{
					case 'Disclosure' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.91, h * 0.35, h * 0.15, h * 0.3), 'shape=mxgraph.ios7.misc.right;strokeColor=#D2D2D6;');
						icon1.vertex = true;
						v.insert(icon1);
						
						break;
						
					case 'DetailDisclosure' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.91, h * 0.35, h * 0.15, h * 0.3), 'shape=mxgraph.ios7.misc.right;strokeColor=#D2D2D6;');
						icon1.vertex = true;
						v.insert(icon1);
						
						var icon2 = new mxCell('', new mxGeometry(w * 0.79, h * 0.25, h * 0.5, h * 0.5), 'shape=mxgraph.ios7.icons.info;strokeColor=#007AFF;fillColor=#ffffff;');
						icon2.vertex = true;
						v.insert(icon2);
						
						break;
						
					case 'DetailIndicator' :
						var icon2 = new mxCell('', new mxGeometry(w * 0.87, h * 0.25, h * 0.5, h * 0.5), 'shape=mxgraph.ios7.icons.info;strokeColor=#007AFF;fillColor=#ffffff;');
						icon2.vertex = true;
						v.insert(icon2);
						
						break;
						
					case 'CheckMark' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.89, h * 0.37, h * 0.4, h * 0.26), 'shape=mxgraph.ios7.misc.check;strokeColor=#007AFF;strokeWidth=2;');
						icon1.vertex = true;
						v.insert(icon1);
						
						break;
				}

				break;
				
			case 'iOSRightDetailCell' :
				v.style += 'shape=partialRectangle;left=0;top=0;right=0;fillColor=#ffffff;strokeColor=#C8C7CC;align=left;spacing=0;verticalAlign=middle;spacingLeft=' + (p.SeparatorInset * scale) + ';';
				v.value = convertText(p.subtext);
				v.style += (isLastLblHTML? 'fontSize=' + defaultFontSize + ';' :
					getFontSize(p.subtext) + 
					getFontColor(p.subtext) + 
					getFontStyle(p.subtext));
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
					
				var subtext = null;
				
				switch (p.AccessoryIndicatorType) 
				{
					case 'Disclosure' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.91, h * 0.35, h * 0.15, h * 0.3), 'shape=mxgraph.ios7.misc.right;strokeColor=#D2D2D6;');
						icon1.vertex = true;
						v.insert(icon1);

						subtext = new mxCell('', new mxGeometry(w * 0.55, 0, w * 0.3, h), 'fillColor=none;strokeColor=none;spacing=0;align=right;');

						break;
						
					case 'DetailDisclosure' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.91, h * 0.35, h * 0.15, h * 0.3), 'shape=mxgraph.ios7.misc.right;strokeColor=#D2D2D6;');
						icon1.vertex = true;
						v.insert(icon1);
						
						var icon2 = new mxCell('', new mxGeometry(w * 0.79, h * 0.25, h * 0.5, h * 0.5), 'shape=mxgraph.ios7.icons.info;strokeColor=#007AFF;fillColor=#ffffff;');
						icon2.vertex = true;
						v.insert(icon2);

						subtext = new mxCell('', new mxGeometry(w * 0.45, 0, w * 0.3, h), 'fillColor=none;strokeColor=none;spacing=0;align=right;');

						break;
						
					case 'DetailIndicator' :
						var icon2 = new mxCell('', new mxGeometry(w * 0.87, h * 0.25, h * 0.5, h * 0.5), 'shape=mxgraph.ios7.icons.info;strokeColor=#007AFF;fillColor=#ffffff;');
						icon2.vertex = true;
						v.insert(icon2);

						subtext = new mxCell('', new mxGeometry(w * 0.52, 0, w * 0.3, h), 'fillColor=none;strokeColor=none;spacing=0;align=right;');

						break;
						
					case 'CheckMark' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.89, h * 0.37, h * 0.4, h * 0.26), 'shape=mxgraph.ios7.misc.check;strokeColor=#007AFF;strokeWidth=2;');
						icon1.vertex = true;
						v.insert(icon1);

						subtext = new mxCell('', new mxGeometry(w * 0.55, 0, w * 0.3, h), 'fillColor=none;strokeColor=none;spacing=0;align=right;');

						break;
						
					default :
						subtext = new mxCell('', new mxGeometry(w * 0.65, 0, w * 0.3, h), 'fillColor=none;strokeColor=none;spacing=0;align=right;');
				}

				subtext.vertex = true;
				v.insert(subtext);
				subtext.value = convertText(p.text);
				subtext.style += (isLastLblHTML? 'html=1;fontSize=' + defaultFontSize + ';' +
					gFontFamilyStyle
					:
					getFontSize(p.text) + 
					getFontFamily(p.text) +
					getFontColor(p.text) + 
					getFontStyle(p.text));

				break;
				
			case 'iOSLeftDetailCell' :
				v.style += 'shape=partialRectangle;left=0;top=0;right=0;fillColor=#ffffff;strokeColor=#C8C7CC;';
				v.style += addAllStyles(v.style, p, a, v);
				
				var text = new mxCell('', new mxGeometry(0, 0, w * 0.25, h), 'fillColor=none;strokeColor=none;spacing=0;align=right;verticalAlign=middle;spacingRight=3;');
				text.vertex = true;
				v.insert(text);
				text.value = convertText(p.subtext);
				text.style += (isLastLblHTML? 'html=1;fontSize=' + defaultFontSize + ';' +
					gFontFamilyStyle
					:
					getFontSize(p.subtext) + 
					getFontFamily(p.subtext) +
					getFontColor(p.subtext) + 
					getFontStyle(p.subtext));

				var subtext = new mxCell('', new mxGeometry(w * 0.25, 0, w * 0.5, h), 'fillColor=none;strokeColor=none;spacing=0;align=left;verticalAlign=middle;spacingLeft=3;');
				subtext.vertex = true;
				v.insert(subtext);
				subtext.value = convertText(p.text);
				subtext.style += (isLastLblHTML? 'html=1;fontSize=' + defaultFontSize + ';' +
					gFontFamilyStyle
					:
					getFontSize(p.text) + 
					getFontFamily(p.text) +
					getFontColor(p.text) + 
					getFontStyle(p.text));

				switch (p.AccessoryIndicatorType) 
				{
					case 'Disclosure' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.91, h * 0.35, h * 0.15, h * 0.3), 'shape=mxgraph.ios7.misc.right;strokeColor=#D2D2D6;');
						icon1.vertex = true;
						v.insert(icon1);
						
						break;
						
					case 'DetailDisclosure' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.91, h * 0.35, h * 0.15, h * 0.3), 'shape=mxgraph.ios7.misc.right;strokeColor=#D2D2D6;');
						icon1.vertex = true;
						v.insert(icon1);
						
						var icon2 = new mxCell('', new mxGeometry(w * 0.79, h * 0.25, h * 0.5, h * 0.5), 'shape=mxgraph.ios7.icons.info;strokeColor=#007AFF;fillColor=#ffffff;');
						icon2.vertex = true;
						v.insert(icon2);
						
						break;
						
					case 'DetailIndicator' :
						var icon2 = new mxCell('', new mxGeometry(w * 0.87, h * 0.25, h * 0.5, h * 0.5), 'shape=mxgraph.ios7.icons.info;strokeColor=#007AFF;fillColor=#ffffff;');
						icon2.vertex = true;
						v.insert(icon2);
						
						break;
						
					case 'CheckMark' :
						var icon1 = new mxCell('', new mxGeometry(w * 0.89, h * 0.37, h * 0.4, h * 0.26), 'shape=mxgraph.ios7.misc.check;strokeColor=#007AFF;strokeWidth=2;');
						icon1.vertex = true;
						v.insert(icon1);
						
						break;
				}

				break;
				
			case 'iOSTableGroupedSectionBreak' :
				v.style += 'shape=partialRectangle;left=0;right=0;fillColor=#EFEFF4;strokeColor=#C8C7CC;';
				
				var text1 = new mxCell('', new mxGeometry(0, 0, w, h * 0.4), 'fillColor=none;strokeColor=none;spacing=10;align=left;');
				text1.vertex = true;
				v.insert(text1);
				text1.value = convertText(p.text);
				text1.style += (isLastLblHTML? 'html=1;fontSize=' + defaultFontSize + ';' +
					gFontFamilyStyle
					:
					getFontSize(p.text) +
					getFontFamily(p.text) +
					getFontColor(p.text) + 
					getFontStyle(p.text));

				var text2 = new mxCell('', new mxGeometry(0, h * 0.6, w, h * 0.4), 'fillColor=none;strokeColor=none;spacing=10;align=left;');
				text2.vertex = true;
				v.insert(text2);
				text2.value = convertText(p["bottom-text"]);
				text2.style += (isLastLblHTML? 'html=1;fontSize=' + defaultFontSize + ';' +
					gFontFamilyStyle
					:
					getFontSize(p["bottom-text"]) +
					getFontFamily(p["bottom-text"]) +
					getFontColor(p["bottom-text"]) + 
					getFontStyle(p["bottom-text"]));

				break;
				
			case 'iOSTablePlainHeaderFooter' :
				v.style += 'fillColor=#F7F7F7;strokeColor=none;align=left;spacingLeft=5;spacing=0;';
				v.value = convertText(p.text);
				v.style += (isLastLblHTML? 'fontSize=' + defaultFontSize + ';' :
					getFontSize(p.text) + 
					getFontColor(p.text) + 
					getFontStyle(p.text));
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				break;
				
			case 'SMPage' :
			//TODO Link icon (p.Url != "")
				if (p.Group)
				{
					v.style += 'strokeColor=none;fillColor=none;'
						
					var item1 = new mxCell('', new mxGeometry(0, 0, w * 0.9, h * 0.9), 'rounded=1;arcSize=3;part=1;');
					item1.vertex = true;
					v.insert(item1);
					
					item1.style += 	getStrokeColor(p, a) + 
						getFillColor(p, a) +
						getOpacity(p, a, item1) + 
						getShadow(p) +
						getStrokeWidth(p); 

					var item2 = new mxCell('', new mxGeometry(w * 0.1, h * 0.1, w * 0.9, h * 0.9), 'rounded=1;arcSize=3;part=1;');
					item2.vertex = true;
					v.insert(item2);
					
					item2.value = convertText(p.Text);
					item2.style += 	getStrokeColor(p, a) + 
						getFillColor(p, a) +
						getOpacity(p, a, item2) + 
						getShadow(p) +
						getStrokeWidth(p) +
						getLabelStyle(p, isLastLblHTML);
					
					if (p.Future)
					{
						item1.style += 'dashed=1;fixDash=1;';
						item2.style += 'dashed=1;fixDash=1;';
					}
				}
				else
				{
					v.style += 'rounded=1;arcSize=3;';
					
					if (p.Future)
					{
						v.style += 'dashed=1;fixDash=1;';
					}
					
					v.value = convertText(p.Text);
					v.style += 	getStrokeColor(p, a) + 
						getFillColor(p, a) +
						getOpacity(p, a, v) + 
						getShadow(p) +
						getStrokeWidth(p) + 
						getLabelStyle(p, isLastLblHTML);
				}
				
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				break;
				
			case 'SMHome' :
			case 'SMPrint' :
			case 'SMSearch' :
			case 'SMSettings' :
			case 'SMSitemap' :
			case 'SMSuccess' :
			case 'SMVideo' :
			case 'SMAudio' :
			case 'SMCalendar' :
			case 'SMChart' :
			case 'SMCloud' :
			case 'SMDocument' :
			case 'SMForm' :
			case 'SMGame' :
			case 'SMUpload' :
				
				var item1 = null;
				
				switch (obj.Class)
				{
					case 'SMHome' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.4, h * 0.1, h * 0.8, h * 0.8), 'part=1;shape=mxgraph.office.concepts.home;flipH=1;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMPrint' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.4, h * 0.19, h * 0.8, h * 0.62), 'part=1;shape=mxgraph.office.devices.printer;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMSearch' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.4, h * 0.1, h * 0.8, h * 0.8), 'part=1;shape=mxgraph.office.concepts.search;flipH=1;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMSettings' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.35, h * 0.15, h * 0.7, h * 0.7), 'part=1;shape=mxgraph.mscae.enterprise.settings;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMSitemap' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.35, h * 0.2, h * 0.7, h * 0.6), 'part=1;shape=mxgraph.office.sites.site_collection;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMSuccess' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.3, h * 0.25, h * 0.6, h * 0.5), 'part=1;shape=mxgraph.mscae.general.checkmark;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMVideo' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.4, h * 0.2, h * 0.8, h * 0.6), 'part=1;shape=mxgraph.office.concepts.video_play;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMAudio' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.3, h * 0.2, h * 0.6, h * 0.6), 'part=1;shape=mxgraph.mscae.general.audio;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMCalendar' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.4, h * 0.15, h * 0.8, h * 0.7), 'part=1;shape=mxgraph.office.concepts.form;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMChart' :
						var fc = getFillColor(p, a);
						
						if (fc == '')
						{
							fc = '#ffffff;'
						}
						else
						{
							fc = fc.replace('fillColor=', '');
						}
						
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.35, h * 0.15, h * 0.7, h * 0.7), 'part=1;shape=mxgraph.ios7.icons.pie_chart;fillColor=#e6e6e6;fillOpacity=50;strokeWidth=4;strokeColor=' + fc);
						break;
					case 'SMCloud' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.4, h * 0.27, h * 0.8, h * 0.46), 'part=1;shape=mxgraph.networks.cloud;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMDocument' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.25, h * 0.15, h * 0.5, h * 0.7), 'part=1;shape=mxgraph.mscae.enterprise.document;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMForm' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.4, h * 0.15, h * 0.8, h * 0.7), 'part=1;shape=mxgraph.office.concepts.form;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMGame' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.4, h * 0.2, h * 0.8, h * 0.6), 'part=1;shape=mxgraph.mscae.general.game_controller;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
					case 'SMUpload' :
						item1 = new mxCell('', new mxGeometry(w * 0.5 - h * 0.4, h * 0.2, h * 0.8, h * 0.6), 'part=1;shape=mxgraph.mscae.enterprise.backup_online;fillColor=#e6e6e6;opacity=50;strokeColor=none;');
						break;
				}
					
				item1.vertex = true;
				v.insert(item1);
				
				item1.value = convertText(p.Text);
				item1.style += 	getLabelStyle(p, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v);
				
				break;
			case 'UMLMultiplicityBlock' :
				v.style += 'strokeColor=none;fillColor=none;'
					
					var item1 = new mxCell('', new mxGeometry(w * 0.1, 0, w * 0.9, h * 0.9), 'part=1;');
					item1.vertex = true;
					v.insert(item1);
					
					item1.style += addAllStyles(item1.style, p, a, item1);

					var item2 = new mxCell('', new mxGeometry(0, h * 0.1, w * 0.9, h * 0.9), 'part=1;');
					item2.vertex = true;
					v.insert(item2);
					
					item2.value = convertText(p.Text);
					item2.style += 	
						getLabelStyle(p.Text, isLastLblHTML);
					item2.style += addAllStyles(item2.style, p, a, item2, isLastLblHTML);
				break;

			case 'UMLConstraintBlock' :				
				
				var brace1 = new mxCell('', new mxGeometry(0, 0,	h * 0.25, h), 'shape=curlyBracket;rounded=1;');
				brace1.vertex = true;
				v.insert(brace1);

				var brace2 = new mxCell('', new mxGeometry(w - h * 0.25, 0,	h * 0.25, h), 'shape=curlyBracket;rounded=1;flipH=1;');
				brace2.vertex = true;
				v.insert(brace2);

				var label = new mxCell('', new mxGeometry(h * 0.25, 0,	w - h * 0.5, h), 'strokeColor=none;fillColor=none;');
				label.vertex = true;
				label.value = convertText(p);
				v.insert(label);
				
				v.style = "strokeColor=none;fillColor=none;"
				v.style += addAllStyles(v.style, p, a, v);
					

				brace1.style += 
								getOpacity(p, a, brace1); 
				brace2.style += 
								getOpacity(p, a, brace2); 
				label.style += 	
								getFontColor(p, label);
				brace1.style += addAllStyles(brace1.style, p, a, brace1);
				brace2.style += addAllStyles(brace2.style, p, a, brace2);
				label.style += addAllStyles(label.style, p, a, label, isLastLblHTML);
				break;

			case 'UMLTextBlock' : 
				v.value = convertText(p.Text);
				v.style += 'strokeColor=none;' +
					getLabelStyle(p.Text, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				break;
			case 'UMLProvidedInterfaceBlock' :
			case 'UMLProvidedInterfaceBlockV2' :
				var rotation = getRotation(p, a, v);
				p.Rotatio = null;
				var allStyle = addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				if (allStyle.indexOf(mxConstants.STYLE_STROKEWIDTH) == -1)
				{
					allStyle = mxConstants.STYLE_STROKEWIDTH + '=1;' + allStyle;
				}
				
				v.style = groupStyle + rotation;
				var circleW = w * 0.8;
				var lineW = w - circleW;
				var circle = new mxCell('', new mxGeometry(0.2, 0, circleW, h), 'shape=ellipse;' + allStyle);
				circle.vertex = true;
				circle.geometry.relative = true;
				v.insert(circle);
				var line = new mxCell('', new mxGeometry(0, 0.5, lineW, 1), 'line;' + allStyle);
				line.geometry.relative = true;
				line.vertex = true;
				v.insert(line);
				break;
			case 'UMLComponentBoxBlock' :
			case 'UMLComponentBoxBlockV2':
				v.value = convertText(p);
				v.style = 'html=1;dropTarget=0;' + addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var icon = new mxCell('', new mxGeometry(1, 0, 15, 15), 'shape=component;jettyWidth=8;jettyHeight=4;');
				icon.geometry.relative = true;
				icon.geometry.offset = new mxPoint(-20, 5);
				icon.vertex = true;
				v.insert(icon);
				break;
			case 'UMLAssemblyConnectorBlock':
			case 'UMLAssemblyConnectorBlockV2':
				var rotation = getRotation(p, a, v);
				p.Rotatio = null;
				var allStyle = addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				if (allStyle.indexOf(mxConstants.STYLE_STROKEWIDTH) == -1)
				{
					allStyle = mxConstants.STYLE_STROKEWIDTH + '=1;' + allStyle;
				}
				
				v.style = groupStyle + rotation;
				var line1W = w * 0.225;
				var line2W = w * 0.1;
				var circleW = w - line1W - line2W;
				var circle = new mxCell('', new mxGeometry(0.225, 0, circleW, h), 'shape=providedRequiredInterface;verticalLabelPosition=bottom;' + allStyle);
				circle.vertex = true;
				circle.geometry.relative = true;
				v.insert(circle);
				var line1 = new mxCell('', new mxGeometry(0, 0.5, line1W, 1), 'line;' + allStyle);
				line1.geometry.relative = true;
				line1.vertex = true;
				v.insert(line1);
				var line2 = new mxCell('', new mxGeometry(0.9, 0.5, line2W, 1), 'line;' + allStyle);
				line2.geometry.relative = true;
				line2.vertex = true;
				v.insert(line2);
				break;
			case 'BPMNActivity' :
				v.value = convertText(p.Text);
				
				switch (p.bpmnActivityType)
				{
					case 1:
						v.style += 
							getLabelStyle(p.Text, isLastLblHTML);
						break
					case 2:
						v.style += 'shape=ext;double=1;' +
							getLabelStyle(p.Text, isLastLblHTML);
						break
					case 3:
						v.style += 'shape=ext;dashed=1;dashPattern=2 5;' +
							getLabelStyle(p.Text, isLastLblHTML);
						break
					case 4:
						v.style += 'shape=ext;strokeWidth=2;' + 
							getLabelStyle(p.Text, isLastLblHTML);
						break
				}

				if (p.bpmnTaskType != 0)
				{
					switch (p.bpmnTaskType)
					{
						case 1:
							var item1 = new mxCell('', new mxGeometry(0, 0, 19, 12), 'shape=message;');
							item1.geometry.offset = new mxPoint(4, 7);
							break;
						case 2:
							var item1 = new mxCell('', new mxGeometry(0, 0, 19, 12), 'shape=message;');
							item1.geometry.offset = new mxPoint(4, 7);
							break;
						case 3:
							var item1 = new mxCell('', new mxGeometry(0, 0, 15, 15), 'shape=mxgraph.bpmn.user_task;');
							item1.geometry.offset = new mxPoint(4, 5);
							break;
						case 4:
							var item1 = new mxCell('', new mxGeometry(0, 0, 15, 10), 'shape=mxgraph.bpmn.manual_task;');
							item1.geometry.offset = new mxPoint(4, 7);
							break;
						case 5:
							var item1 = new mxCell('', new mxGeometry(0, 0, 18, 13), 'shape=mxgraph.bpmn.business_rule_task;');
							item1.geometry.offset = new mxPoint(4, 7);
							break;
						case 6:
							var item1 = new mxCell('', new mxGeometry(0, 0, 15, 15), 'shape=mxgraph.bpmn.service_task;');
							item1.geometry.offset = new mxPoint(4, 5);
							break;
						case 7:
							var item1 = new mxCell('', new mxGeometry(0, 0, 15, 15), 'shape=mxgraph.bpmn.script_task;');
							item1.geometry.offset = new mxPoint(4, 5);
							break;
					}
					
					if (p.bpmnTaskType == 1)
					{
						var sc = getFillColor(p, a);
						var fc = getStrokeColor(p, a);
							
						fc = fc.replace('strokeColor', 'fillColor');
						sc = sc.replace('fillColor', 'strokeColor');
						
						if (fc == '')
						{
							fc = 'fillColor=#000000;'
						}
						
						if (sc == '')
						{
							sc = 'strokeColor=#ffffff;'
						}
						
						item1.style += sc + fc + 'part=1;';

					}
					else
					{
						item1.style += getFillColor(p, a) + getStrokeColor(p, a) + 'part=1;';
					}
					
					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
				}

				var numIcons = 0;
				
				if (p.bpmnActivityMarker1 != 0)
				{
					numIcons++;
				}
				
				if (p.bpmnActivityMarker2 != 0)
				{
					numIcons++;
				}
				
				var iconX = 0;
				var iconY = h - 20;
				
				if (numIcons == 1)
				{
					iconX = -7.5;
				}
				else if (numIcons == 2)
				{
					iconX = -19;
				}

				if (p.bpmnActivityMarker1 != 0)
				{
					switch (p.bpmnActivityMarker1)
					{
						case 1:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=plus;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							item1.style += getFillColor(p, a) + getStrokeColor(p, a);
							break;
						case 2:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=mxgraph.bpmn.loop;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							item1.style += getFillColor(p, a) + getStrokeColor(p, a);
							break;
						case 3:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=parallelMarker;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							item1.style += getFillColor(p, a) + getStrokeColor(p, a);
							break;
						case 4:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=parallelMarker;direction=south;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							item1.style += getFillColor(p, a) + getStrokeColor(p, a);
							break;
						case 5:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 10), 'shape=mxgraph.bpmn.ad_hoc;strokeColor=none;flipH=1;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -17);
							var fc = getStrokeColor(p, a);
							fc = fc.replace('strokeColor', 'fillColor');
							
							if (fc == '')
							{
								fc = 'fillColor=#000000;'
							}
							
							item1.style += fc;
							break;
						case 6:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 11), 'shape=mxgraph.bpmn.compensation;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -18);
							item1.style += getFillColor(p, a) + getStrokeColor(p, a);
							break;
					}
					
					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
				}
				
				if (numIcons == 2)
				{
					iconX = 5;
				}

				if (p.bpmnActivityMarker2 != 0)
				{
					switch (p.bpmnActivityMarker2)
					{
						case 1:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=plus;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							item1.style += getFillColor(p, a) + getStrokeColor(p, a);
							break;
						case 2:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=mxgraph.bpmn.loop;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							item1.style += getFillColor(p, a) + getStrokeColor(p, a);
							break;
						case 3:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=parallelMarker;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							item1.style += getFillColor(p, a) + getStrokeColor(p, a);
							break;
						case 4:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=parallelMarker;direction=south;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							item1.style += getFillColor(p, a) + getStrokeColor(p, a);
							break;
						case 5:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 10), 'shape=mxgraph.bpmn.ad_hoc;strokeColor=none;flipH=1;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -17);
							var fc = getStrokeColor(p, a);
							fc = fc.replace('strokeColor', 'fillColor');
							
							if (fc == '')
							{
								fc = 'fillColor=#000000;'
							}
							
							item1.style += fc;
							break;
						case 6:
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 11), 'shape=mxgraph.bpmn.compensation;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -18);
							item1.style += getFillColor(p, a) + getStrokeColor(p, a);
							break;
					}

					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
				}

				v.style += addAllStyles(v.style, p, a, v);

				break;
				
			case 'BPMNEvent' :
				v.style += 'shape=mxgraph.bpmn.shape;verticalLabelPosition=bottom;verticalAlign=top;';
			
				v.value = convertText(p.Text);
				
				if (p.bpmnDashed == true)
				{
					switch (p.bpmnEventGroup)
					{
						case 0:
							v.style += 'outline=eventNonint;';
							break;
						case 1:
							v.style += 'outline=boundNonint;';
							break;
						case 2:
							v.style += 'outline=end;';
							break;
					}
				}
				else 
				{
					switch (p.bpmnEventGroup)
					{
						case 0:
							v.style += 'outline=standard;';
							break;
						case 1:
							v.style += 'outline=throwing;';
							break;
						case 2:
							v.style += 'outline=end;';
							break;
					}
				}
				
				switch(p.bpmnEventType)
				{
					case 1:
						v.style += 'symbol=message;';
						break;
					case 2:
						v.style += 'symbol=timer;';
						break;
					case 3:
						v.style += 'symbol=escalation;';
						break;
					case 4:
						v.style += 'symbol=conditional;';
						break;
					case 5:
						v.style += 'symbol=link;';
						break;
					case 6:
						v.style += 'symbol=error;';
						break;
					case 7:
						v.style += 'symbol=cancel;';
						break;
					case 8:
						v.style += 'symbol=compensation;';
						break;
					case 9:
						v.style += 'symbol=signal;';
						break;
					case 10:
						v.style += 'symbol=multiple;';
						break;
					case 11:
						v.style += 'symbol=parallelMultiple;';
						break;
					case 12:
						v.style += 'symbol=terminate;';
						break;
					
				}

				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				break;
			case 'BPMNChoreography' :
				try
				{
					var st = getColor(p.FillColor);
					var darkerClr = getDarkerClr(st, 0.75);
					
					var fz = getFontSize(p.Name).match(/\d+/);
					var th = Math.max(mxUtils.getSizeForString(p.Name.t, fz? fz[0] : defaultFontSize, null, w - 10).height, 24);
					st = 'swimlaneFillColor=' + darkerClr + ';'
					
					v.value = convertText(p.Name);
					v.style += 'swimlane;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;' + st +
						'startSize=' + th + ';spacingLeft=3;spacingRight=3;fontStyle=0;' +
						getLabelStyle(p.Name, isLastLblHTML);
					v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
					
					var curY = th;
					var fz = getFontSize(p.TaskName).match(/\d+/);
					var curH = p.TaskHeight? p.TaskHeight * scale : Math.max(mxUtils.getSizeForString(p.TaskName.t, fz? fz[0] : defaultFontSize, null, w - 10).height + 15, 24);
					var task = new mxCell('', new mxGeometry(0, curY, w, curH), 'part=1;html=1;resizeHeight=0;spacingTop=-1;spacingLeft=3;spacingRight=3;');
					task.value = convertText(p.TaskName);
					task.vertex = true;
					v.insert(task);
					task.style += getLabelStyle(p.TaskName, isLastLblHTML);
					task.style += addAllStyles(task.style, p, a, task, isLastLblHTML);
					curY += curH;
					
					var item = [];
					
					for (var i = 0; i < p.Fields; i++)
					{
						var pTxt = p['Participant' + (i + 1)];
						var fz = getFontSize(pTxt).match(/\d+/);
						var curH =  Math.max(mxUtils.getSizeForString(pTxt.t, fz? fz[0] : defaultFontSize, null, w - 10).height, 24);
						item[i] = new mxCell('', new mxGeometry(0, curY, w, curH), 'part=1;html=1;resizeHeight=0;fillColor=none;spacingTop=-1;spacingLeft=3;spacingRight=3;');
						curY += curH;
						item[i].vertex = true;
						v.insert(item[i]);
						item[i].style += getLabelStyle(pTxt, isLastLblHTML);
						item[i].style += addAllStyles(item[i].style, p, a, item[i], isLastLblHTML);
						item[i].value = convertText(pTxt);
					}
	/*
	TODO: Add support for the following
					"bpmnChoreographyType": 0, //Plus sign
	                "initiatingMessage": 0, //Envelop before
	                "responseMessage": 0, //Envelop after
	*/
				}
				catch(e)
				{
					//Ignore
					console.log(e);
				}
				break;
			case 'BPMNConversation' :
				v.style += 'shape=hexagon;perimeter=hexagonPerimeter2;';
		
				v.value = convertText(p.Text);
				
				if (p.bpmnConversationType == 0)
				{
					v.style += getStrokeWidth(p);
				}
				else
				{
					v.style += 'strokeWidth=2;';
				}
				
				if (p.bpmnIsSubConversation)
				{
					var item1 = new mxCell('', new mxGeometry(0.5, 1, 12, 12), 'shape=plus;part=1;');
					item1.geometry.offset = new mxPoint(-6, -17);
					item1.style += getFillColor(p, a) + getStrokeColor(p, a);
					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
				}

				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				break;
			case 'BPMNGateway' :
				v.style += 'shape=mxgraph.bpmn.shape;perimeter=rhombusPerimeter;background=gateway;verticalLabelPosition=bottom;verticalAlign=top;'; 
				
				switch (p.bpmnGatewayType)
				{
					case 0:
						v.style += 'outline=none;symbol=general;';
						break;
					case 1:
						v.style += 'outline=none;symbol=exclusiveGw;';
						break;
					case 2:
						v.style += 'outline=catching;symbol=multiple;';
						break;
					case 3:
						v.style += 'outline=none;symbol=parallelGw;';
						break;
					case 4:
						v.style += 'outline=end;symbol=general;';
						break;
					case 5:
						v.style += 'outline=standard;symbol=multiple;';
						break;
					case 6:
						v.style += 'outline=none;symbol=complexGw;';
						break;
					case 7:
						v.style += 'outline=standard;symbol=parallelMultiple;';
						break;
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				v.value = convertText(p.Text);
				v.style += getLabelStyle(p, isLastLblHTML);
				break;
			case 'BPMNData' :
				v.style += 'shape=note;size=14;'; 

				switch (p.bpmnDataType)
				{
					case 0:
						v.value = convertText(p.Text);
						
						if (p.Text && !p.Text.t)
						{
							p.Text.t = ' '; //Such that Title is catched and added later!
						}
						break;
					case 1:
						var item1 = new mxCell('', new mxGeometry(0.5, 1, 12, 10), 'shape=parallelMarker;part=1;');
						item1.geometry.offset = new mxPoint(-6, -15);
						item1.style += getFillColor(p, a) + getStrokeColor(p, a);
						item1.geometry.relative = true;
						item1.vertex = true;
						v.insert(item1);
						break;
					case 2:
						var item1 = new mxCell('', new mxGeometry(0, 0, 12, 10), 'shape=singleArrow;part=1;arrowWidth=0.4;arrowSize=0.4;');
						item1.geometry.offset = new mxPoint(3, 3);
						item1.style += getFillColor(p, a) + getStrokeColor(p, a);
						item1.geometry.relative = true;
						item1.vertex = true;
						v.insert(item1);
						v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
						
						var text1 = new mxCell('', new mxGeometry(0, 0, w, 20), 'strokeColor=none;fillColor=none;');
						text1.geometry.offset = new mxPoint(0, 14);
						text1.geometry.relative = true;
						text1.vertex = true;
						v.insert(text1);
						text1.value = convertText(p.Text);
						text1.style += getLabelStyle(p, isLastLblHTML);
						break;
					case 3:
						var item1 = new mxCell('', new mxGeometry(0, 0, 12, 10), 'shape=singleArrow;part=1;arrowWidth=0.4;arrowSize=0.4;');
						item1.geometry.offset = new mxPoint(3, 3);
						item1.style += getStrokeColor(p, a);
						item1.geometry.relative = true;
						item1.vertex = true;
						v.insert(item1);
						
						var fc = getStrokeColor(p, a);
						fc = fc.replace('strokeColor', 'fillColor');
						
						if (fc == '')
						{
							fc = 'fillColor=#000000;'
						}
						
						item1.style += fc;
						
						var text1 = new mxCell('', new mxGeometry(0, 0, w, 20), 'strokeColor=none;fillColor=none;');
						text1.geometry.offset = new mxPoint(0, 14);
						text1.geometry.relative = true;
						text1.vertex = true;
						v.insert(text1);
						text1.value = convertText(p.Text);
						text1.style += getLabelStyle(p, isLastLblHTML);
						break;
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				
				break;
			case 'BPMNBlackPool' :
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				var item1 = new mxCell('', new mxGeometry(0, 0, w, h), 'fillColor=#000000;strokeColor=none;opacity=30;');
				item1.vertex = true;
				v.insert(item1);
				
				break;
				
			case 'DFDExternalEntityBlock' :
				
				v.style += 'strokeColor=none;fillColor=none;';
				v.style += addAllStyles(v.style, p, a, v);
					
				var item1 = new mxCell('', new mxGeometry(0, 0, w * 0.95, h * 0.95), 'part=1;');
				item1.vertex = true;
				v.insert(item1);
				
				item1.style += addAllStyles(item1.style, p, a, item1);

				var item2 = new mxCell('', new mxGeometry(w * 0.05, h * 0.05, w * 0.95, h * 0.95), 'part=1;');
				item2.vertex = true;
				v.insert(item2);
				item2.value = convertText(p.Text);
				item2.style += 	
					getLabelStyle(p.Text, isLastLblHTML);
				item2.style += addAllStyles(item2.style, p, a, item2, isLastLblHTML);
				
				break;
				
			case 'GSDFDDataStoreBlock' :
				v.value = convertText(p.Text);
				v.style += 'shape=partialRectangle;right=0;' + 
					getLabelStyle(p.Text, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
			
				var item1 = new mxCell('', new mxGeometry(0, 0, w * 0.2, h), 'part=1;');
				item1.vertex = true;
				v.insert(item1);
				
				item1.value = convertText(p.Number);
				item1.style += 	
					getLabelStyle(p.Number, isLastLblHTML);
				item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);

				break;
			case 'OrgBlock' :
				var lbls = '';
				
				for (var key in p.Active)
				{
					if (key == 'Photo' || !p.Active[key]) continue;
					
					lbls += convertText(p[key], true);
				}
				
				if (p.Active.Photo)
				{
					var imgSize = w * 0.4;
					v.style += 'spacingLeft=' + imgSize + ';imageWidth=' + (imgSize - 4) + ';imageHeight=' + (imgSize - 4) + 
						';imageAlign=left;imageVerticalAlign=top;image=' + mapImgUrl(p.Photo);
				}
				
				v.value = lbls;
				v.style += addAllStyles(v.style, p, a, v, true);

				break;				
			case 'DefaultTableBlock' :
				try
				{
					var rowsNum = p.RowHeights.length;
					var colsNum = p.ColWidths.length;
					var rowHs = [], colWs = [];
					
					for (var i = 0; i < rowsNum; i++)
					{
						rowHs[i] = p.RowHeights[i] * scale;
					}
					
					for (var j = 0; j < colsNum; j++)
					{
						colWs[j] = p.ColWidths[j] * scale;
					}
					
					//TODO Apply table layout when it's ready
					v.style = groupStyle;
					
					var bandedClr1 = p['BandedColor1'];
					var bandedClr2 = p['BandedColor2'];
					var bandedRows = p['BandedRows'];
					var bandedCols = p['BandedCols'];
					var hideH = p['HideH'];
					var hideV = p['HideV'];
					var tblVAlign = p['TextVAlign'];
					var tblFillClr = p['FillColor'];
					var tblStrokeStyle = p['StrokeStyle'];
					delete p['StrokeStyle'];
					var tblFillOp = getOpacity2(tblFillClr, 'fillOpacity');
					var tblLnClr = p['LineColor'];
					var tblLnOp = getOpacity2(tblLnClr, 'strokeOpacity');
					var y = 0;
					var skipCells = {};
					
					for (var i = 0; i < rowsNum; i++)
					{
						var x = 0;
						var h = rowHs[i];
						
						for (var j = 0; j < colsNum; j++)
						{
							var cellIndex = i + ',' + j;
							
							if (skipCells[cellIndex])
							{
								x += colWs[j];
								continue;
							}
							
							var fillClr = p['CellFill_' + cellIndex];
							var noBand = p['NoBand_' + cellIndex];
							var spans = p['CellSize_' + cellIndex];
							var cellLbl = p['Cell_' + cellIndex];
							var vAlign = p['Cell_' + cellIndex + '_VAlign'];
							var txtRot = p['Cell_' + cellIndex + '_TRotation'];
							var borderWH = p['CellBorderWidthH_' + cellIndex];
							var borderClrH = p['CellBorderColorH_' + cellIndex];
							var borderStyleH = p['CellBorderStrokeStyleH_' + cellIndex];
							var borderWV = p['CellBorderWidthV_' + cellIndex];
							var borderClrV = p['CellBorderColorV_' + cellIndex];
							var borderStyleV = p['CellBorderStrokeStyleV_' + cellIndex];
							var borderClr = hideH? borderClrV : borderClrH; //TODO Border color, width & opacity in more complex especially with different border color for horizontal and vertical
							var lnOp = getOpacity2(borderClr, 'strokeOpacity');
							var borderW = hideH? borderWV : borderWH;
							var borderStyle = hideH? borderStyleV : borderStyleH;
							
							fillClr = bandedRows && !noBand? (i % 2 == 0? bandedClr1: (bandedCols && !noBand? 
									(j % 2 == 0? bandedClr1 : bandedClr2) : bandedClr2)) : (bandedCols && !noBand? 
									(j % 2 == 0? bandedClr1 : bandedClr2) : fillClr);
							var fillOp = getOpacity2(fillClr, 'fillOpacity') || tblFillOp;
							
							var w = colWs[j];
							var ch = h;
							var cw = w;
							
							//Spans
							for (var k = i + 1; k < i + spans.h; k++)
							{
								if (rowHs[k] == null) continue;
								
								ch += rowHs[k];
								skipCells[k + ',' + j] = true;
								
								for (var l = j + 1; l < j + spans.w; l++)
								{
									skipCells[k + ',' + l] = true;
								}
							}
							
							for (var k = j + 1; k < j + spans.w; k++)
							{
								if (colWs[k] == null) continue;
								
								cw += colWs[k];
								skipCells[i + ',' + k] = true;
								
								for (var l = i + 1; l < i + spans.h; l++)
								{
									skipCells[l + ',' + k] = true;
								}
							}

							var cell = new mxCell('', new mxGeometry(x, y, cw, ch), 'shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;'
									+ (hideV? 'left=0;right=0;' : '') + (hideH? 'top=0;bottom=0;' : '')
									+ getFillColor({FillColor: fillClr || tblFillClr})
									+ createStyle(mxConstants.STYLE_STROKECOLOR, getColor(borderClr), getColor(tblLnClr))
									+ (borderW != null ? createStyle(mxConstants.STYLE_STROKEWIDTH, Math.round(parseFloat(borderW) * scale), '1') : '')
									+ (lnOp? lnOp : tblLnOp) 
									+ fillOp
									+ 'verticalAlign=' + (vAlign? vAlign : (tblVAlign? tblVAlign : 'middle')) + ';'
									+ getStrokeStyle({StrokeStyle : borderStyle? borderStyle : (tblStrokeStyle? tblStrokeStyle : 'solid')})
									+ (txtRot? 'horizontal=0;' : ''));
							
							cell.vertex = true;
							cell.value = convertText(cellLbl);
							cell.style +=
								addAllStyles(cell.style, p, a, cell, isLastLblHTML) +
							  (isLastLblHTML? 'fontSize=' + defaultFontSize + ';' : 
								getFontSize(cellLbl) +
								getFontColor(cellLbl) + 
								getFontStyle(cellLbl) +
								getTextAlignment(cellLbl, cell) + 
								getTextLeftSpacing(cellLbl) +
								getTextRightSpacing(cellLbl) + 
								getTextTopSpacing(cellLbl) +
								getTextBottomSpacing(cellLbl)
							  ) + 
								getTextGlobalSpacing(cellLbl) +
								getTextVerticalAlignment(cellLbl);
							v.insert(cell);
							x += w;
						}
						
						y += h;
					}
				}
				catch(e)
				{
					console.log(e);
				}
				break;
			case 'VSMDedicatedProcessBlock' :
			case 'VSMProductionControlBlock' :
				v.style += 'shape=mxgraph.lean_mapping.manufacturing_process;spacingTop=15;';

				if (obj.Class == 'VSMDedicatedProcessBlock')
				{
					v.value = convertText(p.Text);
				}
				else if (obj.Class == 'VSMProductionControlBlock')
				{
					v.value = convertText(p.Resources);
				}

				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				if (obj.Class == 'VSMDedicatedProcessBlock')
				{
					var item1 = new mxCell('', new mxGeometry(0, 1, 11, 9), 'part=1;shape=mxgraph.lean_mapping.operator;');
					item1.geometry.relative = true;
					item1.geometry.offset = new mxPoint(4, -13);
					item1.vertex = true;
					v.insert(item1);
					
					item1.style += addAllStyles(item1.style, p, a, item1);
				}

				var text1 = new mxCell('', new mxGeometry(0, 0, w, 15), 'strokeColor=none;fillColor=none;part=1;');
				text1.vertex = true;
				v.insert(text1);
				text1.value = convertText(p.Title);
				text1.style += getLabelStyle(p.Title, isLastLblHTML);
				p.Text = null;
				break;
				
			case 'VSMSharedProcessBlock' :
				v.style += 'shape=mxgraph.lean_mapping.manufacturing_process_shared;spacingTop=-5;verticalAlign=top;';

				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var text1 = new mxCell('', new mxGeometry(w * 0.1, h * 0.3, w * 0.8, h * 0.6), 'part=1;');
				text1.vertex = true;
				v.insert(text1);
				text1.value = convertText(p.Resource);
				text1.style += 	
					getLabelStyle(p.Resource, isLastLblHTML);
				text1.style += addAllStyles(text1.style, p, a, text1, isLastLblHTML);

				break;
				
			case 'VSMWorkcellBlock' :
				v.style += 'shape=mxgraph.lean_mapping.work_cell;verticalAlign=top;spacingTop=-2;';
				v.value = convertText(p.Text);				
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
		
				break;
			case 'VSMSafetyBufferStockBlock' :
			case 'VSMDatacellBlock' :
				v.style += 'strokeColor=none;fillColor=none;';
				v.style += addAllStyles(v.style, p, a, v);
				
				var itemFullH = h;
				
				var numItems = parseInt(p.Cells);

				var st = addAllStyles('part=1;', p, a, v);

				if (numItems > 0)
				{
					itemFullH = itemFullH / numItems;
				}
				
				var item = new Array();
				var line = new Array();
				
				for (var i = 1; i <= numItems; i++)
				{
					item[i] = new mxCell('', new mxGeometry(0, (i - 1) * itemFullH, w, itemFullH), st);
					item[i].vertex = true;
					v.insert(item[i]);
					item[i].value = convertText(p["cell_" + i]);
					item[i].style += getLabelStyle(p["cell_" + i], isLastLblHTML);
				}
				
				break;
			case 'VSMInventoryBlock' : 
				v.style += 'shape=mxgraph.lean_mapping.inventory_box;verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
		
				break;
			case 'VSMSupermarketBlock' :
				v.style += 'strokeColor=none;';
				v.style += addAllStyles(v.style, p, a, v);
				
				var itemFullH = h;
				
				var numItems = parseInt(p.Cells);

				var st = addAllStyles('part=1;fillColor=none;', p, a, v);

				if (numItems > 0)
				{
					itemFullH = itemFullH / numItems;
				}
				
				var item = new Array();
				var text = new Array();
				
				for (var i = 1; i <= numItems; i++)
				{
					item[i] = new mxCell('', new mxGeometry(w * 0.5, (i - 1) * itemFullH, w * 0.5, itemFullH), 'shape=partialRectangle;left=0;' + st);
					item[i].vertex = true;
					v.insert(item[i]);
					
					text[i] = new mxCell('', new mxGeometry(0, (i - 1) * itemFullH, w, itemFullH), 'strokeColor=none;fillColor=none;part=1;');
					text[i].vertex = true;
					v.insert(text[i]);
					text[i].value = convertText(p["cell_" + i]);
					text[i].style += getLabelStyle(p["cell_" + i], isLastLblHTML);
				}
				
				break;
			case 'VSMFIFOLaneBlock' : 
				v.style += 'shape=mxgraph.lean_mapping.fifo_sequence_flow;fontStyle=0;fontSize=18';
				v.style += addAllStyles(v.style, p, a, v);
				v.value = 'FIFO';
				break;
			case 'VSMGoSeeProductionBlock' :
				v.style += 'shape=ellipse;perimeter=ellipsePerimeter;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(w * 0.17, h * 0.2, 13, 6), 'shape=mxgraph.lean_mapping.go_see_production_scheduling;flipH=1;part=1;whiteSpace=wrap;html=1;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);
				
				break;
			case 'VSMProductionKanbanBatchBlock' :
				v.style += 'strokeColor=none;fillColor=none;'

				var st = 'shape=card;size=18;flipH=1;part=1;';
				
				var item1 = new mxCell('', new mxGeometry(w * 0.1, 0, w * 0.9, h * 0.8), 'shape=mxgraph.lean_mapping.go_see_production_scheduling;flipH=1;part=1;' + st);
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);

				var item2 = new mxCell('', new mxGeometry(w * 0.05, h * 0.1, w * 0.9, h * 0.8), 'shape=mxgraph.lean_mapping.go_see_production_scheduling;flipH=1;part=1;' + st);
				item2.vertex = true;
				v.insert(item2);
				item2.style += addAllStyles(item2.style, p, a, item2);

				var item3 = new mxCell('', new mxGeometry(0, h * 0.2, w * 0.9, h * 0.8), 'shape=mxgraph.lean_mapping.go_see_production_scheduling;flipH=1;part=1;whiteSpace=wrap;html=1;spacing=2;' + st);
				item3.vertex = true;
				v.insert(item3);
				item3.value = convertText(p.Text);
				item3.style += addAllStyles(item3.style, p, a, item3, isLastLblHTML);
				
				break;
			case 'VSMElectronicInformationArrow' : 
				v.style = 'group;';
				v.value = convertText(p.Title);
				v.style += getLabelStyle(p.Title, isLastLblHTML);
				var edge = new mxCell('', new mxGeometry(0, 0, w, h), 'shape=mxgraph.lean_mapping.electronic_info_flow_edge;html=1;entryX=0;entryY=1;exitX=1;exitY=0;');
				edge.edge = true;
				edge.geometry.relative = 1;
				graph.addCell(edge, v, null, v, v);
				break;
			case 'AWSRoundedRectangleContainerBlock2' :
			case 'AWSRoundedRectangleContainerBlock' :
				v.style += 'strokeColor=none;fillColor=none;';
				
				if (p.Spotfleet)
				{
					var item1 = new mxCell('', new mxGeometry(0, 0, w, h - 20), 'resizeWidth=1;resizeHeight=1;fillColor=none;align=center;verticalAlign=bottom;spacing=2;rounded=1;arcSize=10;');
					item1.geometry.offset = new mxPoint(0, 20);
					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
					item1.value = convertText(p.Title);
					item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
					
					var item2 = new mxCell('', new mxGeometry(0, 0, 35, 40), 'strokeColor=none;shape=mxgraph.aws3.spot_instance;fillColor=#f58536;');
					item2.geometry.relative = true;
					item2.geometry.offset = new mxPoint(30, 0);
					item2.vertex = true;
					v.insert(item2);
				}
				else if (p.Beanstalk)
				{
					var item1 = new mxCell('', new mxGeometry(0, 0, w, h - 20), 'resizeWidth=1;resizeHeight=1;fillColor=none;align=center;verticalAlign=bottom;spacing=2;rounded=1;arcSize=10;');
					item1.geometry.offset = new mxPoint(0, 20);
					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
					item1.value = convertText(p.Title);
					item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
					
					var item2 = new mxCell('', new mxGeometry(0, 0, 30, 40), 'strokeColor=none;shape=mxgraph.aws3.elastic_beanstalk;fillColor=#759C3E;');
					item2.geometry.relative = true;
					item2.geometry.offset = new mxPoint(30, 0);
					item2.vertex = true;
					v.insert(item2);
				}
				else if (p.EC2)
				{
					var item1 = new mxCell('', new mxGeometry(0, 0, w, h - 20), 'resizeWidth=1;resizeHeight=1;fillColor=none;align=center;verticalAlign=bottom;spacing=2;rounded=1;arcSize=10;');
					item1.geometry.offset = new mxPoint(0, 20);
					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
					item1.value = convertText(p.Title);
					item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
					
					var item2 = new mxCell('', new mxGeometry(0, 0, 32, 40), 'strokeColor=none;shape=mxgraph.aws3.ec2;fillColor=#F58534;');
					item2.geometry.relative = true;
					item2.geometry.offset = new mxPoint(30, 0);
					item2.vertex = true;
					v.insert(item2);
				}
				else if (p.Subnet)
				{
					var item1 = new mxCell('', new mxGeometry(0, 0, w, h - 20), 'resizeWidth=1;resizeHeight=1;fillColor=none;align=center;verticalAlign=bottom;spacing=2;rounded=1;arcSize=10;');
					item1.geometry.offset = new mxPoint(0, 20);
					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
					item1.value = convertText(p.Title);
					item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
					
					var item2 = new mxCell('', new mxGeometry(0, 0, 32, 40), 'strokeColor=none;shape=mxgraph.aws3.permissions;fillColor=#146EB4;');
					item2.geometry.relative = true;
					item2.geometry.offset = new mxPoint(30, 0);
					item2.vertex = true;
					v.insert(item2);
				}
				else if (p.VPC)
				{
					var item1 = new mxCell('', new mxGeometry(0, 0, w, h - 20), 'resizeWidth=1;resizeHeight=1;fillColor=none;align=center;verticalAlign=bottom;spacing=2;rounded=1;arcSize=10;');
					item1.geometry.offset = new mxPoint(0, 20);
					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
					item1.value = convertText(p.Title);
					item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
					
					var item2 = new mxCell('', new mxGeometry(0, 0, 60, 40), 'strokeColor=none;shape=mxgraph.aws3.virtual_private_cloud;fillColor=#146EB4;');
					item2.geometry.relative = true;
					item2.geometry.offset = new mxPoint(30, 0);
					item2.vertex = true;
					v.insert(item2);
				}
				else if (p.AWS)
				{
					var item1 = new mxCell('', new mxGeometry(0, 0, w, h - 20), 'resizeWidth=1;resizeHeight=1;fillColor=none;align=center;verticalAlign=bottom;spacing=2;rounded=1;arcSize=10;');
					item1.geometry.offset = new mxPoint(0, 20);
					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
					item1.value = convertText(p.Title);
					item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
					
					var item2 = new mxCell('', new mxGeometry(0, 0, 60, 40), 'strokeColor=none;shape=mxgraph.aws3.cloud;fillColor=#F58534;');
					item2.geometry.relative = true;
					item2.geometry.offset = new mxPoint(30, 0);
					item2.vertex = true;
					v.insert(item2);
				}
				else if (p.Corporate)
				{
					var item1 = new mxCell('', new mxGeometry(0, 0, w, h - 20), 'resizeWidth=1;resizeHeight=1;fillColor=none;align=center;verticalAlign=bottom;spacing=2;rounded=1;arcSize=10;');
					item1.geometry.offset = new mxPoint(0, 20);
					item1.geometry.relative = true;
					item1.vertex = true;
					v.insert(item1);
					item1.value = convertText(p.Title);
					item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
					
					var item2 = new mxCell('', new mxGeometry(0, 0, 25, 40), 'strokeColor=none;shape=mxgraph.aws3.corporate_data_center;fillColor=#7D7C7C;');
					item2.geometry.relative = true;
					item2.geometry.offset = new mxPoint(30, 0);
					item2.vertex = true;
					v.insert(item2);
				}
				else
				{
					v.style = 'resizeWidth=1;resizeHeight=1;fillColor=none;align=center;verticalAlign=bottom;spacing=2;rounded=1;arcSize=10;';
					v.value = convertText(p.Title);
					v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				}

				break;
			case 'AWSElasticComputeCloudBlock2' :
				v.style += 'strokeColor=none;shape=mxgraph.aws3.ec2;verticalLabelPosition=bottom;align=center;verticalAlign=top;';
				v.value = convertText(p.Title);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				break;
				
			case 'AWSRoute53Block2' :
				v.style += 'strokeColor=none;shape=mxgraph.aws3.route_53;verticalLabelPosition=bottom;align=center;verticalAlign=top;';
				v.value = convertText(p.Title);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				break;
				
			case 'AWSRDBSBlock2' :
				v.style += 'strokeColor=none;shape=mxgraph.aws3.rds;verticalLabelPosition=bottom;align=center;verticalAlign=top;';
				v.value = convertText(p.Title);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				break;
				
			case 'NET_RingNetwork' :
				v.style += 'strokeColor=none;fillColor=none;';
				
			   	var cell = new mxCell('', new mxGeometry(w * 0.25, h * 0.25, w * 0.5, h * 0.5), 'ellipse;html=1;strokeColor=#29AAE1;strokeWidth=2;');
			   	cell.vertex = true;
			   	v.insert(cell);
			   	var cells = [cell];
			   	cell.style += getFillColor(p, a);
			   	
			   	var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=none;rounded=0;endArrow=none;dashed=0;html=1;strokeColor=#29AAE1;strokeWidth=2;');
			   	edge.geometry.relative = true;
		    	edge.edge = true;
		    	
		    	addRouterEdge(w * 0.5, 0, edge, select, graph, cells, v, cell);
		    	addRouterEdge(w * 0.855, h * 0.145, edge, select, graph, cells, v, cell);
		    	addRouterEdge(w, h * 0.5, edge, select, graph, cells, v, cell);
		    	addRouterEdge(w * 0.855, h * 0.855, edge, select, graph, cells, v, cell);
		    	addRouterEdge(w * 0.5, h, edge, select, graph, cells, v, cell);
		    	addRouterEdge(w * 0.145, h * 0.855, edge, select, graph, cells, v, cell);
		    	addRouterEdge(0, h * 0.5, edge, select, graph, cells, v, cell);
		    	addRouterEdge(w * 0.145, h * 0.145, edge, select, graph, cells, v, cell);
				break;
				
			case 'NET_Ethernet' :
				v.style += 'strokeColor=none;fillColor=none;';
				
			   	var cell = new mxCell('', new mxGeometry(0, h * 0.5 - 10, w, 20), 'shape=mxgraph.networks.bus;gradientColor=none;gradientDirection=north;fontColor=#ffffff;perimeter=backbonePerimeter;backboneSize=20;fillColor=#29AAE1;strokeColor=#29AAE1;');
			   	cell.vertex = true;
			   	v.insert(cell);
			   	var cells = [cell];

				var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'strokeColor=#29AAE1;edgeStyle=none;rounded=0;endArrow=none;html=1;strokeWidth=2;');
				edge.geometry.relative = true;
				edge.edge = true;

			   	var cells = [cell];
		    	var stepX = w / p.NumTopNodes;
		    	
			   	for (var i = 0; i < p.NumTopNodes; i++)
			   	{
			   		addRouterEdge(stepX * 0.5 + i * stepX, 0, edge, select, graph, cells, v, cell);
			   	}
			   	
		    	stepX = w / p.NumBottomNodes;
		    	
			   	for (var i = 0; i < p.NumBottomNodes; i++)
			   	{
			   		addRouterEdge(stepX * 0.5 + i * stepX, h, edge, select, graph, cells, v, cell);
			   	}
			   	
				break;
				
			case 'EE_OpAmp' :
				v.style += 'shape=mxgraph.electrical.abstract.operational_amp_1;'; 
				v.value = convertText(p.Title);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				if (p.ToggleCharge)
				{
					v.style += 'flipV=1;';
				}
				
				break;
				
			case 'EIMessageChannelBlock' :
			case 'EIDatatypeChannelBlock' :
			case 'EIInvalidMessageChannelBlock' :
			case 'EIDeadLetterChannelBlock' :
			case 'EIGuaranteedDeliveryBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				if (obj.Class == 'EIMessageChannelBlock')
				{
					var item1 = new mxCell('', new mxGeometry(0.5, 0.5, w * 0.9, 20), 'shape=mxgraph.eip.messageChannel;fillColor=#818181;part=1;');
					item1.geometry.offset = new mxPoint( - w * 0.45, 0);
				}
				else if (obj.Class == 'EIDatatypeChannelBlock')
				{
					var item1 = new mxCell('', new mxGeometry(0.5, 0.5, w * 0.9, 20), 'shape=mxgraph.eip.dataChannel;fillColor=#818181;part=1;');
					item1.geometry.offset = new mxPoint( - w * 0.45, 0);
				}
				else if (obj.Class == 'EIInvalidMessageChannelBlock')
				{
					var item1 = new mxCell('', new mxGeometry(0.5, 0.5, w * 0.9, 20), 'shape=mxgraph.eip.invalidMessageChannel;fillColor=#818181;part=1;');
					item1.geometry.offset = new mxPoint( - w * 0.45, 0);
				}
				else if (obj.Class == 'EIDeadLetterChannelBlock')
				{
					var item1 = new mxCell('', new mxGeometry(0.5, 0.5, w * 0.9, 20), 'shape=mxgraph.eip.deadLetterChannel;fillColor=#818181;part=1;');
					item1.geometry.offset = new mxPoint( - w * 0.45, 0);
				}
				else if (obj.Class == 'EIGuaranteedDeliveryBlock')
				{
					var item1 = new mxCell('', new mxGeometry(0.5, 0.5, 20, 27), 'shape=cylinder;fillColor=#818181;part=1;');
					item1.geometry.offset = new mxPoint( -10, -7);
				}
				
				item1.geometry.relative = true;
				item1.vertex = true;
				v.insert(item1);

				item1.style += addAllStyles(item1.style, p, a, item1);

			   	var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=none;rounded=0;endArrow=block;dashed=0;html=1;strokeColor=#818181;strokeWidth=1;endFill=1;endSize=6;');
			   	edge.geometry.relative = true;
		    	edge.edge = true;
		    	
		    	addFloatingEdge(w * 0.15, h * 0.25, w * 0.85, h * 0.25, edge, select, graph, cells, v, cell);
		    	
				break;

			case 'EIChannelAdapterBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(0, h * 0.07, w * 0.21, h * 0.86), 'fillColor=#FFFF33;part=1;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);
				
				var item2 = new mxCell('', new mxGeometry(w * 0.26, h * 0.09, w * 0.2, h * 0.82), 'shape=mxgraph.eip.channel_adapter;fillColor=#4CA3D9;part=1;');
				item2.vertex = true;
				v.insert(item2);
				item2.style += addAllStyles(item2.style, p, a, item2);
				
				var item3 = new mxCell('', new mxGeometry(1, 0.5, w * 0.35, 20), 'shape=mxgraph.eip.messageChannel;fillColor=#818181;part=1;');
				item3.geometry.relative = true;
				item3.geometry.offset = new mxPoint( - w * 0.4, -10);
				item3.vertex = true;
				v.insert(item3);
				item3.style += addAllStyles(item3.style, p, a, item3);
				
				edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=1;exitY=0.5;entryX=0;entryY=0.5;endArrow=none;dashed=0;html=1;strokeWidth=1;endFill=1;endSize=2;');
		    	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	item1.insertEdge(edge1, true);
		    	item2.insertEdge(edge1, false);
				edge1.style += getStrokeColor(p, a); 

				select.push(graph.addCell(edge1, null, null, null, null));

				edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=1;exitY=0.5;entryX=0;entryY=0.5;endArrow=block;startArrow=block;dashed=0;html=1;strokeColor=#818181;strokeWidth=1;endFill=1;endSize=2;startFill=1;startSize=2;');
		    	edge2.geometry.relative = true;
		    	edge2.edge = true;
		    	item2.insertEdge(edge2, true);
		    	item3.insertEdge(edge2, false);

				select.push(graph.addCell(edge2, null, null, null, null));
				
				break;
				
			case 'EIMessageBlock' :
			case 'EICommandMessageBlock' :
			case 'EIDocumentMessageBlock' :
			case 'EIEventMessageBlock' :
				v.style += 'strokeColor=none;fillColor=none;verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(0, 0, 17, 17), 'ellipse;fillColor=#808080;part=1;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);
				
				var messagesNum = p.Messages;
				var oneH = (h - 17) / messagesNum;
				var item2 = new Array();
				var edge = new Array();
				
				for (var i = 0; i < messagesNum; i++)
				{
					var currY = oneH * (i + 1) - 3;
 					item2[i] = new mxCell('', new mxGeometry(w - 20, currY, 20, 20), 'part=1;');
					item2[i].vertex = true;
					v.insert(item2[i]);
					
					switch(obj.Class)
					{
						case 'EIMessageBlock' :
							item2[i].value = convertText(p['message_' + (i + 1)]);
							item2.style += getLabelStyle(p['message_' + (i + 1)], isLastLblHTML);
							break;
						case 'EICommandMessageBlock' :
							item2[i].value = 'C';
							item2[i].style += 'fontStyle=1;fontSize=' + defaultFontSize + ';';
							break;
						case 'EIDocumentMessageBlock' :
							item2[i].value = 'D';
							item2[i].style += 'fontStyle=1;fontSize=' + defaultFontSize + ';';
							break;
						case 'EIEventMessageBlock' :
							item2[i].value = 'E';
							item2[i].style += 'fontStyle=1;fontSize=' + defaultFontSize + ';';
							break;
					}

					item2[i].style += addAllStyles(item2[i].style, p, a, item2[i]);
					edge[i] = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;');
			    	edge[i].geometry.relative = true;
			    	edge[i].edge = true;
			    	item1.insertEdge(edge[i], false);
			    	item2[i].insertEdge(edge[i], true);
			    	edge[i].style += addAllStyles(edge[i].style, p, a, edge[i]);

					var wp = new Array();
					wp.push(new mxPoint(x + 8.5, y + currY + 10));
					
					edge[i].geometry.points = wp;
					select.push(graph.addCell(edge[i], null, null, null, null));
				}

				break;
				
			case 'EIMessageEndpointBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
		    	v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(w * 0.45, h * 0.25, w * 0.3, h * 0.5), 'part=1;fillColor=#ffffff');
				item1.vertex = true;
				v.insert(item1);
	
				item1.style += addAllStyles(item1.style, p, a, item1);
	
			   	var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=none;rounded=0;endArrow=block;dashed=0;html=1;strokeColor=#818181;strokeWidth=1;endFill=1;endSize=6;');
			   	edge.geometry.relative = true;
		    	edge.edge = true;
		    	
		    	addFloatingEdge(0, h * 0.5, w * 0.4, h * 0.5, edge, select, graph, cells, v, cell);
		    	
				break;
			case 'EIPublishSubscribeChannelBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
		    	v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=none;rounded=0;endArrow=block;dashed=0;html=1;strokeColor=#818181;strokeWidth=1;endFill=1;endSize=6;');
			   	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	addFloatingEdge(w * 0.05, h * 0.5, w * 0.85, h * 0.5, edge1, select, graph, cells, v, cell);
		    	
			   	var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;rounded=0;endArrow=block;dashed=0;html=1;strokeColor=#818181;strokeWidth=1;endFill=1;endSize=6;');
			   	edge2.geometry.relative = true;
		    	edge2.edge = true;
		    	addFloatingEdge(w * 0.05, h * 0.5, w * 0.85, h * 0.15, edge2, select, graph, cells, v, cell);
		    	
			   	var edge3 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;rounded=0;endArrow=block;dashed=0;html=1;strokeColor=#818181;strokeWidth=1;endFill=1;endSize=6;');
			   	edge3.geometry.relative = true;
		    	edge3.edge = true;
		    	addFloatingEdge(w * 0.05, h * 0.5, w * 0.85, h * 0.85, edge3, select, graph, cells, v, cell);
	    	
				break;
				
			case 'EIMessageBusBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
		    	v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=none;rounded=0;endArrow=block;dashed=0;html=1;strokeWidth=1;endFill=1;endSize=4;startArrow=block;startFill=1;startSize=4;');
			   	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	edge1.style += getStrokeColor(p, a);
		    	addFloatingEdge(w * 0.05, h * 0.5, w * 0.95, h * 0.5, edge1, select, graph, cells, v, cell);
		    	
			   	var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;rounded=0;endArrow=block;dashed=0;html=1;strokeWidth=1;endFill=1;endSize=4;startArrow=block;startFill=1;startSize=4;');
			   	edge2.geometry.relative = true;
		    	edge2.edge = true;
		    	edge2.style += getStrokeColor(p, a);
		    	addFloatingEdge(w * 0.3, h * 0.1, w * 0.3, h * 0.5, edge2, select, graph, cells, v, cell);
		    	
			   	var edge3 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;rounded=0;endArrow=block;dashed=0;html=1;strokeWidth=1;endFill=1;endSize=4;startArrow=block;startFill=1;startSize=4;');
			   	edge3.geometry.relative = true;
		    	edge3.edge = true;
		    	edge3.style += getStrokeColor(p, a);
		    	addFloatingEdge(w * 0.7, h * 0.1, w * 0.7, h * 0.5, edge3, select, graph, cells, v, cell);
		    	
			   	var edge4 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;rounded=0;endArrow=block;dashed=0;html=1;strokeWidth=1;endFill=1;endSize=4;startArrow=block;startFill=1;startSize=4;');
			   	edge4.geometry.relative = true;
		    	edge4.edge = true;
		    	edge4.style += getStrokeColor(p, a);
		    	addFloatingEdge(w * 0.5, h * 0.5, w * 0.5, h * 0.9, edge4, select, graph, cells, v, cell);
	    	
				break;
				
			case 'EIRequestReplyBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
		    	v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(w * 0.2, h * 0.21, w * 0.16, h * 0.24), 'part=1;fillColor=#ffffff;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);

			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=none;rounded=0;endArrow=block;dashed=0;html=1;strokeColor=#818181;strokeWidth=1;endFill=1;endSize=6;');
			   	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	
		    	addFloatingEdge(w * 0.45, h * 0.33, w * 0.8, h * 0.33, edge1, select, graph, cells, v, cell);
		    	
				var item2 = new mxCell('', new mxGeometry(w * 0.64, h * 0.55, w * 0.16, h * 0.24), 'part=1;fillColor=#ffffff;');
				item2.vertex = true;
				v.insert(item2);
				item2.style += addAllStyles(item2.style, p, a, item2);

			   	var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=none;rounded=0;endArrow=block;dashed=0;html=1;strokeColor=#818181;strokeWidth=1;endFill=1;endSize=6;');
			   	edge2.geometry.relative = true;
		    	edge2.edge = true;
		    	
		    	addFloatingEdge(w * 0.55, h * 0.67, w * 0.2, h * 0.67, edge2, select, graph, cells, v, cell);
		    	
				break;

			case 'EIReturnAddressBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(w * 0.1, h * 0.15, w * 0.8, h * 0.7), 'part=1;shape=mxgraph.eip.retAddr;fillColor=#FFE040;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);
				
				break;
				
			case 'EICorrelationIDBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(w * 0.04, h * 0.06, w * 0.18, h * 0.28), 'ellipse;fillColor=#808080;part=1;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);
				
				item2 = new mxCell('', new mxGeometry(w * 0.2, h * 0.56, w * 0.2, h * 0.32), 'part=1;');
				item2.vertex = true;
				v.insert(item2);

				item2.value = 'A';
				item2.style += 'fontStyle=1;fontSize=' + defaultFontSize + ';';
				item1.style += addAllStyles(item1.style, p, a, item1);

				edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;part=1;');
		    	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	item1.insertEdge(edge1, false);
		    	item2.insertEdge(edge1, true);
		    	edge1.style += addAllStyles(edge1.style, p, a, edge1);

				var wp = new Array();
				wp.push(new mxPoint(x + w * 0.13, y + h * 0.72));
				
				edge1.geometry.points = wp;
				select.push(graph.addCell(edge1, null, null, null, null));
	
				var item3 = new mxCell('', new mxGeometry(w * 0.6, h * 0.06, w * 0.18, h * 0.28), 'ellipse;fillColor=#808080;part=1;');
				item3.vertex = true;
				v.insert(item3);
				item3.style += 
					getStrokeColor(p, a) + 
					getStrokeWidth(p);
				item3.style += addAllStyles(item3.style, p, a, item3);
				
				item4 = new mxCell('', new mxGeometry(w * 0.76, h * 0.56, w * 0.2, h * 0.32), 'part=1;');
				item4.vertex = true;
				v.insert(item4);
				item4.style += 
					getStrokeColor(p, a) + 
					getOpacity(p, a, item4) + 
					getStrokeWidth(p) +
					getStrokeStyle(p);

				item4.value = 'B';
				item4.style += 'fontStyle=1;fontSize=' + defaultFontSize + ';fillColor=#ffffff;';
				item4.style += addAllStyles(item4.style, p, a, item4);

				edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;part=1;');
		    	edge2.geometry.relative = true;
		    	edge2.edge = true;
		    	item3.insertEdge(edge2, false);
		    	item4.insertEdge(edge2, true);
		    	edge2.style += addAllStyles(edge2.style, p, a, edge2);

				var wp2 = new Array();
				wp2.push(new mxPoint(x + w * 0.69, y + h * 0.72));
				
				edge2.geometry.points = wp2;
				select.push(graph.addCell(edge2, null, null, null, null));
	
				edge3 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;endArrow=block;endFill=1;endSize=6;part=1;');
		    	edge3.geometry.relative = true;
		    	edge3.edge = true;
		    	item1.insertEdge(edge3, false);
		    	item3.insertEdge(edge3, true);
				edge3.style += addAllStyles(edge3.style, p, a, edge3);

				select.push(graph.addCell(edge3, null, null, null, null));
				
				break;

			case 'EIMessageSequenceBlock' :
				
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('1', new mxGeometry(w * 0.2, h * 0.4, w * 0.1, h * 0.19), 'fontStyle=1;fillColor=#ffffff;fontSize=' + defaultFontSize + ';part=1;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);
				
				var item2 = new mxCell('2', new mxGeometry(w * 0.45, h * 0.4, w * 0.1, h * 0.19), 'fontStyle=1;fillColor=#ffffff;fontSize=' + defaultFontSize + ';part=1;');
				item2.vertex = true;
				v.insert(item2);
				item2.style += addAllStyles(item2.style, p, a, item2);
				
				var item3 = new mxCell('3', new mxGeometry(w * 0.7, h * 0.4, w * 0.1, h * 0.19), 'fontStyle=1;fillColor=#ffffff;fontSize=' + defaultFontSize + ';part=1;');
				item3.vertex = true;
				v.insert(item3);
				item3.style += addAllStyles(item3.style, p, a, item3);
				
				var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'curved=1;endArrow=block;html=1;endSize=3;part=1;');
				item1.insertEdge(edge1, false);
				item2.insertEdge(edge1, true);
				
				edge1.geometry.points = [new mxPoint(x + w * 0.375, y + h * 0.15)];
				edge1.geometry.relative = true;
				edge1.edge = true;
				edge1.style += addAllStyles(edge1.style, p, a, edge1);
				select.push(graph.addCell(edge1, null, null, null, null));
				
				var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'curved=1;endArrow=block;html=1;endSize=3;part=1;');
				item2.insertEdge(edge2, false);
				item3.insertEdge(edge2, true);
				edge2.geometry.points = [new mxPoint(x + w * 0.675, y + h * 0.15)];
				edge2.geometry.relative = true;
				edge2.edge = true;
				edge2.style += addAllStyles(edge2.style, p, a, edge2);
				select.push(graph.addCell(edge2, null, null, null, null));
				
				break;
				
			case 'EIMessageExpirationBlock' :
				
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(w * 0.3, h * 0.2, w * 0.4, h * 0.6), 'shape=mxgraph.ios7.icons.clock;fillColor=#ffffff;flipH=1;part=1;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);
				
				break;
				
			case 'EIMessageBrokerBlock' :
				v.style += 'strokeColor=none;fillColor=none;verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(w * 0.38, h * 0.42, w * 0.24, h * 0.16), 'part=1;fillColor=#aefe7d;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);

				var item2 = new mxCell('', new mxGeometry(w * 0.38, 0, w * 0.24, h * 0.16), 'part=1;');
				item2.vertex = true;
				v.insert(item2);
				item2.style += addAllStyles(item2.style, p, a, item2);

				var item3 = new mxCell('', new mxGeometry(w * 0.76, h * 0.23, w * 0.24, h * 0.16), '');
				item3.vertex = true;
				v.insert(item3);
				item3.style = item2.style;

				var item4 = new mxCell('', new mxGeometry(w * 0.76, h * 0.61, w * 0.24, h * 0.16), '');
				item4.vertex = true;
				v.insert(item4);
				item4.style = item2.style;

				var item5 = new mxCell('', new mxGeometry(w * 0.38, h * 0.84, w * 0.24, h * 0.16), '');
				item5.vertex = true;
				v.insert(item5);
				item5.style = item2.style;

				var item6 = new mxCell('', new mxGeometry(0, h * 0.61, w * 0.24, h * 0.16), '');
				item6.vertex = true;
				v.insert(item6);
				item6.style = item2.style;

				var item7 = new mxCell('', new mxGeometry(0, h * 0.23, w * 0.24, h * 0.16), '');
				item7.vertex = true;
				v.insert(item7);
				item7.style = item2.style;

				var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=none;part=1;');
				item1.insertEdge(edge1, false);
				item2.insertEdge(edge1, true);
				edge1.edge = true;
				edge1.style += addAllStyles(edge1.style, p, a, edge1);
				select.push(graph.addCell(edge1, null, null, null, null));
				
				var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=none;part=1;');
				item1.insertEdge(edge2, false);
				item3.insertEdge(edge2, true);
				edge2.edge = true;
				edge2.style += addAllStyles(edge2.style, p, a, edge2);
				select.push(graph.addCell(edge2, null, null, null, null));
				
				var edge3 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=none;part=1;');
				item1.insertEdge(edge3, false);
				item4.insertEdge(edge3, true);
				edge3.edge = true;
				edge3.style += addAllStyles(edge3.style, p, a, edge3);
				select.push(graph.addCell(edge3, null, null, null, null));
				
				var edge4 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=none;part=1;');
				item1.insertEdge(edge4, false);
				item5.insertEdge(edge4, true);
				edge4.edge = true;
				edge4.style += addAllStyles(edge4.style, p, a, edge4);
				select.push(graph.addCell(edge4, null, null, null, null));
				
				var edge5 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=none;part=1;');
				item1.insertEdge(edge5, false);
				item6.insertEdge(edge5, true);
				edge5.edge = true;
				edge5.style += addAllStyles(edge5.style, p, a, edge5);
				select.push(graph.addCell(edge5, null, null, null, null));
				
				var edge6 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=none;part=1;');
				item1.insertEdge(edge6, false);
				item7.insertEdge(edge6, true);
				edge6.edge = true;
				edge6.style += addAllStyles(edge6.style, p, a, edge6);
				select.push(graph.addCell(edge6, null, null, null, null));

				break;
			case 'EIDurableSubscriberBlock' :	
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;rounded=0;endArrow=block;endFill=1;endSize=6;');
			   	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	addFloatingEdge(w * 0.05, h * 0.5, w * 0.6, h * 0.25, edge1, select, graph, cells, v, cell);
		    	
			   	var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;rounded=0;endArrow=block;endFill=1;endSize=6;');
			   	edge2.geometry.relative = true;
		    	edge2.edge = true;
		    	addFloatingEdge(w * 0.05, h * 0.5, w * 0.6, h * 0.75, edge2, select, graph, cells, v, cell);
		    	
				var item1 = new mxCell('', new mxGeometry(w * 0.7, h * 0.1, w * 0.15, h * 0.32), 'shape=mxgraph.eip.durable_subscriber;part=1;fillColor=#818181;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);

				break;
				
			case 'EIControlBusBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(w * 0.25, h * 0.25, w * 0.5, h * 0.5), 'shape=mxgraph.eip.control_bus;part=1;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);
	
				break;
				
			case 'EIMessageHistoryBlock' :
				v.style += 'strokeColor=none;fillColor=none;verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(0, 0, 17, 17), 'ellipse;fillColor=#808080;part=1;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);
				
				var item3 = new mxCell('', new mxGeometry(w - 45, 30, 30, 20), 'shape=mxgraph.mockup.misc.mail2;fillColor=#FFE040;part=1;');
				item3.vertex = true;
				v.insert(item3);
				item3.style += addAllStyles(item3.style, p, a, item3);
				
				edge3 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;');
		    	edge3.geometry.relative = true;
		    	edge3.edge = true;
		    	item1.insertEdge(edge3, false);
		    	item3.insertEdge(edge3, true);
		    	edge3.style += addAllStyles(edge3.style, p, a, edge3);

				edge3.geometry.points = [new mxPoint(x + 8.5, y + 40)];
				select.push(graph.addCell(edge3, null, null, null, null));

				var item4 = new mxCell('', new mxGeometry(w - 45, h - 20, 20, 20), 'part=1;');
				item4.vertex = true;
				v.insert(item4);
				item4.value = convertText(p.message_0);
				item4.style += getLabelStyle(p.message_0, isLastLblHTML);
				
				item4.style += addAllStyles(item4.style, p, a, item4, isLastLblHTML);

				edge4 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;');
		    	edge4.geometry.relative = true;
		    	edge4.edge = true;

		    	item1.insertEdge(edge4, false);
		    	item4.insertEdge(edge4, true);
		    	edge4.style += addAllStyles(edge4.style, p, a, edge4);

				edge4.geometry.points = [new mxPoint(x + 8.5, y + h - 10)];
				select.push(graph.addCell(edge4, null, null, null, null));

				var messagesNum = p.HistoryMessages;
				var oneH = (h - 75) / messagesNum;
				var item2 = new Array();
				var edge = new Array();
				
				for (var i = 0; i < messagesNum; i++)
				{
					var currY = oneH * (i + 1) + 30;
						item2[i] = new mxCell('', new mxGeometry(w - 20, currY, 20, 20), 'part=1;');
					item2[i].vertex = true;
					item2[i].value = convertText(p['message_' + (i + 1)]);
					item2.style += getLabelStyle(p['message_' + (i + 1)], isLastLblHTML);
					v.insert(item2[i]);
					
					item2[i].style += addAllStyles(item2[i].style, p, a, item2[i], isLastLblHTML);
	
					edge[i] = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;');
			    	edge[i].geometry.relative = true;
			    	edge[i].edge = true;
			    	item3.insertEdge(edge[i], false);
			    	item2[i].insertEdge(edge[i], true);
			    	edge[i].style += addAllStyles(edge[i].style, p, a, edge[i]);
	
					var wp = new Array();
					wp.push(new mxPoint(x + w - 30, y + currY + 10));
					
					edge[i].geometry.points = wp;
					select.push(graph.addCell(edge[i], null, null, null, null));
				}
	
				break;
				
			case 'Equation' :
				LucidImporter.hasMath = true;
				v.style += 'strokeColor=none;';
				v.style += addAllStyles(v.style, p, a, v);
				v.value = '$$' + p.Latex + '$$';
				break;
			case 'fpDoor' :
				v.style += 'shape=mxgraph.floorplan.doorRight;';

				if (p.DoorAngle < 0)
				{
					v.style += 'flipV=1;'
				}

		    	v.style += addAllStyles(v.style, p, a, v);

				break;
			case 'fpWall' :
				v.style += 'labelPosition=center;verticalAlign=bottom;verticalLabelPosition=top;';
				v.value = convertText(p);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				v.style = v.style.replace('rotation=180;', ''); //180 rotation cause the labels to be upside down which doesn't match Lucid 
			break;
			case 'fpDoubleDoor' :
				v.style += 'shape=mxgraph.floorplan.doorDouble;';

				if (p.DoorAngle > 0)
				{
					v.style += 'flipV=1;'
				}
	
		    	v.style += addAllStyles(v.style, p, a, v);

				break;
				
			case 'fpRestroomLights' :
				v.style += 'strokeColor=none;fillColor=none;';
		    	v.style += addAllStyles(v.style, p, a, v);
				
				var item1 = new mxCell('', new mxGeometry(0, 0, w, h * 0.25), 'part=1;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);

				var item2 = new Array();
				var lightOffset = w * 0.02;
				var lightW = (w - lightOffset * 2) / p.LightCount;
				var trueW = lightW * 0.8;
				
				for (var i = 0; i < p.LightCount; i++)
				{
					item2[i] = new mxCell('', new mxGeometry(lightOffset + lightW * i + (lightW - trueW) / 2, h * 0.25, trueW, h * 0.75), 'ellipse;part=1;');
					item2[i].vertex = true;
					v.insert(item2[i]);
					item2[i].style += addAllStyles(item2[i].style, p, a, item2[i]);
				}
				
				break;
				
			case 'fpRestroomSinks' :
				v.style += 'strokeColor=none;fillColor=none;';
		    	v.style += addAllStyles(v.style, p, a, v);
				
				var item1 = new Array();
				var sinkW = w / p.SinkCount;
				
				for (var i = 0; i < p.SinkCount; i++)
				{
					item1[i] = new mxCell('', new mxGeometry(sinkW * i, 0, sinkW, h), 'part=1;shape=mxgraph.floorplan.sink_2;');
					item1[i].vertex = true;
					v.insert(item1[i]);
					item1[i].style += addAllStyles(item1[i].style, p, a, item1[i]);
				}
				
				break;
				
			case 'fpRestroomStalls' :
				v.style += 'strokeColor=none;fillColor=none;';
				
				var wallW = w * 0.1 / p.StallCount;
				
				var item1 = new mxCell('', new mxGeometry(0, 0, wallW, h), 'fillColor=#000000;part=1;');
				item1.vertex = true;
				v.insert(item1);
		    	item1.style += addAllStyles(item1.style, p, a, item1);
				
				var stallW = (w - wallW) / p.StallCount;
				
				var wall = new Array();
				var toilet = new Array();
				var door = new Array();
				var paper = new Array();
				
				var fc = getStrokeColor(p, a);
				
				if (fc == '')
				{
					fc = '#000000;'
				}
				else
				{
					fc = fc.replace('stokreColor=', '');
				}
				
				var wallStyle = 'part=1;fillColor=' + fc; 
				wallStyle += addAllStyles(wallStyle, p, a, v);
				var otherStyle = addAllStyles('', p, a, v);
				
				for (var i = 0; i < p.StallCount; i++)
				{
					wall[i] = new mxCell('', new mxGeometry((i + 1) * stallW, 0, wallW, h), wallStyle);
					wall[i].vertex = true;
					v.insert(wall[i]);

					door[i] = new mxCell('', new mxGeometry(wallW + i * stallW + (stallW - wallW) * 0.05, h - (stallW - wallW) * 0.92, (stallW - wallW) * 0.9, (stallW - wallW) * 0.92), 'shape=mxgraph.floorplan.doorRight;flipV=1;part=1;');
					door[i].vertex = true;
					v.insert(door[i]);
					door[i].style += otherStyle;
					
					toilet[i] = new mxCell('', new mxGeometry(wallW + i * stallW + (stallW - wallW) * 0.2, 0, (stallW - wallW) * 0.6, (stallW - wallW) * 0.8), 'shape=mxgraph.floorplan.toilet;part=1;');
					toilet[i].vertex = true;
					v.insert(toilet[i]);
					toilet[i].style += otherStyle;
					
					paper[i] = new mxCell('', new mxGeometry(wallW + i * stallW, h * 0.42, (stallW - wallW) * 0.15, (stallW - wallW) * 0.12), 'part=1;');
					paper[i].vertex = true;
					v.insert(paper[i]);
					paper[i].style += otherStyle;
				}
				
				break;
			case 'PEOneToMany' :
				v.style += 'strokeColor=none;fillColor=none;';
				
		    	var edgeStyle = 'edgeStyle=none;endArrow=none;part=1;';

				var fc = getStrokeColor(p, a);
				
				if (fc == '')
				{
					fc = '#000000;'
				}
				else
				{
					fc = fc.replace('strokeColor=', '');
				}
				
				var endStyle = 'shape=triangle;part=1;fillColor=' + fc;
				endStyle += addAllStyles(endStyle, p, a, v);
		    	
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), edgeStyle);
			   	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	
		    	addFloatingEdge(0, h * 0.5, w * 0.65, h * 0.5, edge1, select, graph, cells, v, cell);
		    	
		    	var itemH = h / p.numLines;
		    	var edge2 = new Array();
		    	var endArrow = new Array();
		    	
		    	for (var i = 0; i < p.numLines; i++)
		    	{
				   	edge2[i] = new mxCell('', new mxGeometry(0, 0, 0, 0), edgeStyle);
				   	edge2[i].geometry.relative = true;
			    	edge2[i].edge = true;
			    	
			    	addFloatingEdge(w * 0.65, h * 0.5, w * 0.96, (i + 0.5) * itemH, edge2[i], select, graph, cells, v, cell);

			    	endArrow[i] = new mxCell('', new mxGeometry(w * 0.95, (i + 0.2) * itemH, w * 0.05, itemH * 0.6), endStyle);
			    	endArrow[i].vertex = true;
					v.insert(endArrow[i]);
		    	}
				
				break;
				
			case 'PEMultilines' :
				v.style += 'strokeColor=none;fillColor=none;';
				
		    	var edgeStyle = 'edgeStyle=none;endArrow=none;part=1;';

				var fc = getStrokeColor(p, a);
				
				if (fc == '')
				{
					fc = '#000000;'
				}
				else
				{
					fc = fc.replace('strokeColor=', '');
				}
				
				var endStyle = 'shape=triangle;part=1;fillColor=' + fc;
				endStyle += addAllStyles(endStyle, p, a, v);
		    	
		    	var itemH = h / p.numLines;
		    	var edge2 = new Array();
		    	var endArrow = new Array();
		    	
		    	for (var i = 0; i < p.numLines; i++)
		    	{
				   	edge2[i] = new mxCell('', new mxGeometry(0, 0, 0, 0), edgeStyle);
				   	edge2[i].geometry.relative = true;
			    	edge2[i].edge = true;
			    	
			    	addFloatingEdge(0, (i + 0.5) * itemH, w * 0.96, (i + 0.5) * itemH, edge2[i], select, graph, cells, v, cell);

			    	endArrow[i] = new mxCell('', new mxGeometry(w * 0.95, (i + 0.2) * itemH, w * 0.05, itemH * 0.6), endStyle);
			    	endArrow[i].vertex = true;
					v.insert(endArrow[i]);
		    	}
				
				break;
				
			case 'PEVesselBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);
				
				switch (p.vesselType)
				{
					case 1 :
						v.style += 'shape=mxgraph.pid.vessels.pressurized_vessel;';
						break;
					case 2 :
						v.style += 'shape=hexagon;perimeter=hexagonPerimeter2;size=0.10;direction=south;';
						break;
				}

		    	v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				break;
				
			case 'PEClosedTankBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);

				if (p.peakedRoof == 1 && p.stumpType == 0)
				{
					v.style += 'shape=mxgraph.pid.vessels.tank_(conical_roof);';
				}
				else if (p.stumpType == 1)
				{
					v.style += 'shape=mxgraph.pid.vessels.tank_(boot);';
				}
				
		    	v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				break;
				
			case 'PEColumnBlock' :
				v.style += 'verticalLabelPosition=bottom;verticalAlign=top;';
				v.value = convertText(p.Text);

				if (p.columnType == 0)
				{
					v.style += 'shape=mxgraph.pid.vessels.pressurized_vessel;';
				}
				else
				{
					v.style += 'shape=mxgraph.pid.vessels.tank;';
				}
				
		    	v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				break;
				
			case 'PECompressorTurbineBlock' :
				v.style += 'strokeColor=none;fillColor=none;'; 
				v.value = convertText(p.Text);
		    	v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(0, h * 0.2, w, h * 0.6), 'part=1;shape=trapezoid;perimeter=trapezoidPerimeter;direction=south;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += st; 
				item1.style += addAllStyles(item1.style, p, a, item1);

				var st = 'endSize=4;endArrow=block;endFill=1;';
				
				if (p.compressorType == 0)
				{
				   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), '');
				   	edge1.geometry.relative = true;
			    	edge1.edge = true;
					edge1.style += st; 
					edge1.style += addAllStyles(edge1.style, p, a, edge1);
			    	
			    	addFloatingEdge(0, 0, 0, h * 0.2, edge1, select, graph, cells, v, cell);
					
				   	var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), '');
				   	edge2.geometry.relative = true;
			    	edge2.edge = true;
					edge2.style += st; 
					edge2.style += addAllStyles(edge2.style, p, a, edge2);
			    	
			    	addFloatingEdge(w, h * 0.67, w, h, edge2, select, graph, cells, v, cell);
				}
				else
				{
					
					item1.style += 'flipH=1;'
				   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), '');
				   	edge1.geometry.relative = true;
			    	edge1.edge = true;
					edge1.style += st; 
					edge1.style += addAllStyles(edge1.style, p, a, edge1);
			    	
			    	addFloatingEdge(0, 0, 0, h * 0.33, edge1, select, graph, cells, v, cell);
					
				   	var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), '');
				   	edge2.geometry.relative = true;
			    	edge2.edge = true;
					edge2.style += st; 
					edge2.style += addAllStyles(edge2.style, p, a, edge2);
			    	
			    	addFloatingEdge(w, h * 0.8, w, h, edge2, select, graph, cells, v, cell);
				}

		    	if (p.centerLineType == 1)
		    	{
				   	var edge3 = new mxCell('', new mxGeometry(0, 0, 0, 0), '');
				   	edge3.geometry.relative = true;
			    	edge3.edge = true;
					edge3.style += st; 
					edge3.style += addAllStyles(edge3.style, p, a, edge3);
			    	
			    	addFloatingEdge(w * 0.2, h * 0.5, w * 0.8, h * 0.5, edge3, select, graph, cells, v, cell);
		    	}
		    	
				break;
				
			case 'PEMotorDrivenTurbineBlock' :
				
				v.style += 'shape=ellipse;perimeter=ellipsePerimeter;'; 
				v.value = convertText(p.Text);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item1 = new mxCell('', new mxGeometry(w * 0.2, h * 0.2, w * 0.6, h * 0.6), 'part=1;shape=trapezoid;perimeter=trapezoidPerimeter;direction=south;');
				item1.vertex = true;
				v.insert(item1);
				item1.style += addAllStyles(item1.style, p, a, item1);
			
				break;
				
			case 'PEFanBlades2Block' :
				break;
			case 'PECentrifugalPumpBlock' :
				break;
			case 'PEIndicatorBlock' :
			case 'PEIndicator2Block' :
			case 'PESharedIndicatorBlock' :
			case 'PEComputerIndicatorBlock' :
			case 'PESharedIndicator2Block' :
			case 'PEProgrammableIndicatorBlock' :
				switch(obj.Class)
				{
					case 'PEIndicatorBlock' :
						v.style += 'shape=mxgraph.pid2inst.discInst;';
						break;
					case 'PEIndicator2Block' :
						v.style += 'shape=mxgraph.pid2inst.indicator;indType=inst;';
						break;
					case 'PESharedIndicatorBlock' :
						v.style += 'shape=mxgraph.pid2inst.sharedCont;';
						break;
					case 'PEComputerIndicatorBlock' :
						v.style += 'shape=mxgraph.pid2inst.compFunc;';
						break;
					case 'PESharedIndicator2Block' :
						v.style += 'shape=mxgraph.pid2inst.indicator;indType=ctrl;';
						break;
					case 'PEProgrammableIndicatorBlock' :
						v.style += 'shape=mxgraph.pid2inst.progLogCont;';
						break;
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				
				if (obj.Class == 'PEIndicator2Block' || obj.Class == 'PESharedIndicator2Block')
				{
					//scale labels to width
					var item1 = new mxCell('', new mxGeometry(0, 0, w, w * 0.5), 'part=1;strokeColor=none;fillColor=none;');
					item1.vertex = true;
					v.insert(item1);
					item1.value = convertText(p.TopText);
					item1.style += getLabelStyle(p.TopText, isLastLblHTML);
					item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
					
					var item2 = new mxCell('', new mxGeometry(0, w * 0.5, w, w * 0.5), 'part=1;strokeColor=none;fillColor=none;');
					item2.vertex = true;
					v.insert(item2);
					item2.value = convertText(p.BotText);
					item2.style += getLabelStyle(p.BotText, isLastLblHTML);
					item2.style += addAllStyles(item2.style, p, a, item2, isLastLblHTML);
				}
				else
				{
					//scale labels as usual
					var item1 = new mxCell('', new mxGeometry(0, 0, w, h * 0.5), 'part=1;strokeColor=none;fillColor=none;');
					item1.vertex = true;
					v.insert(item1);
					item1.value = convertText(p.TopText);
					item1.style += getLabelStyle(p.TopText, isLastLblHTML);
					item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
					
					var item2 = new mxCell('', new mxGeometry(0, h * 0.5, w, h * 0.5), 'part=1;strokeColor=none;fillColor=none;');
					item2.vertex = true;
					v.insert(item2);
					item2.value = convertText(p.BotText);
					item2.style += getLabelStyle(p.BotText, isLastLblHTML);
					item2.style += addAllStyles(item2.style, p, a, item2, isLastLblHTML);
				}
				
				switch(p.instrumentLocation)
				{
					case 0 :
						v.style += 'mounting=field;';
						break;
					case 1 :
						v.style += 'mounting=inaccessible;';
						break;
					case 2 :
						v.style += 'mounting=room;';
						break;
					case 3 :
						v.style += 'mounting=local;';
						break;
				}
				
				break;
				
			case 'PEGateValveBlock' :
			case 'PEGlobeValveBlock' :
			case 'PEAngleValveBlock' :
			case 'PEAngleGlobeValveBlock' :
			case 'PEPoweredValveBlock' :
				
				var actuator = false;
				
				if (obj.Class == 'PEPoweredValveBlock')
				{
					if (p.poweredHandOperated != 1)
					{
						actuator = true;
					}
				}
				else
				{
					if (p.handOperated != 1)
					{
						actuator = true;
					}
				}

				if (actuator)
				{
					var p = getAction(obj).Properties;
					var b = p.BoundingBox;

					var oldH = b.h;
					
					if (obj.Class == 'PEAngleValveBlock' || obj.Class == 'PEAngleGlobeValveBlock')
					{
						b.h = b.h * 0.7;
					}
					else
					{
						b.h = b.h * 0.6;
					}
					
					v = new mxCell('', new mxGeometry(Math.round(b.x * scale + dx), Math.round((b.y + oldH - b.h) * scale + dy),
							Math.round(b.w * scale), Math.round(b.h * scale)), '');
				    v.vertex = true;
				    updateCell(v, obj, graph);
				}
				
				if (obj.Class == 'PEPoweredValveBlock')
				{
					v.style += 'shape=mxgraph.pid2valves.valve;verticalLabelPosition=bottom;verticalAlign=top;'; 
					v.style += addAllStyles(v.style, p, a, v);
					
						if (p.poweredHandOperated == 1)
						{
							v.style += 'valveType=gate;actuator=powered;';
							
							var item1 = new mxCell('', new mxGeometry(w * 0.325, 0, w * 0.35, h * 0.35), 'part=1;strokeColor=none;fillColor=none;spacingTop=2;');
							item1.vertex = true;
							v.insert(item1);
							item1.value = convertText(p.PoweredText);
							item1.style += (isLastLblHTML? '' : 
								getFontColor(p.PoweredText) + 
								getFontStyle(p.PoweredText) +
								getTextAlignment(p.PoweredText) + 
								getTextLeftSpacing(p.PoweredText) +
								getTextRightSpacing(p.PoweredText) + 
								getTextBottomSpacing(p.PoweredText) + 
								getTextGlobalSpacing(p.PoweredText)
								) +
								'fontSize=6;' + 
								getTextVerticalAlignment(p.PoweredText);
							item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
						}
						else
						{
							v.style += 'valveType=gate;';
						}
				}
				else
				{
					v.style += 'verticalLabelPosition=bottom;verticalAlign=top;shape=mxgraph.pid2valves.valve;';
					
					v.value = convertText(p.Text);
					
					switch (obj.Class)
					{
						case 'PEGateValveBlock' :
								v.style += 'valveType=gate;';
							break;
							
						case 'PEGlobeValveBlock' :
								v.style += 'valveType=globe;';
							break;
							
						case 'PEAngleValveBlock' :
								v.style += 'valveType=angle;';
							break;
							
						case 'PEAngleGlobeValveBlock' :
								v.style += 'valveType=angleGlobe;flipH=1;';
							break;
					}

					
					if (p.handOperated == 1)
					{
						v.style += 'actuator=man;';
					}
				}
				
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				break;

			case 'UI2BrowserBlock' :
				v.style += 'shape=mxgraph.mockup.containers.browserWindow;mainText=;';

				if (p.vScroll == 1)
				{
					if (p.hScroll == 1)
					{
						var item3 = new mxCell('', new mxGeometry(1, 0, 20, h - 130), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					else
					{
						var item3 = new mxCell('', new mxGeometry(1, 0, 20, h - 110), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					
				   	item3.geometry.relative = true;
				   	item3.geometry.offset = new mxPoint(-20, 110);
					item3.vertex = true;
					v.insert(item3);
					
					v.style += 'spacingRight=20;';
				}
				
				if (p.hScroll == 1)
				{
					if (p.vScroll == 1)
					{
						var item4 = new mxCell('', new mxGeometry(0, 1, w - 20, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					else
					{
						var item4 = new mxCell('', new mxGeometry(0, 1, w, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					
				   	item4.geometry.relative = true;
				   	item4.geometry.offset = new mxPoint(0, -20);
					item4.vertex = true;
					v.insert(item4);
				}
				
				v.style += addAllStyles(v.style, p, a, v);
				break;
			case 'UI2WindowBlock' :
				v.value = convertText(p.Title);
				v.style += 'shape=mxgraph.mockup.containers.window;mainText=;align=center;verticalAlign=top;spacing=5;' +
					(isLastLblHTML? 'fontSize=' + defaultFontSize + ';' :	
					getFontSize(p.Title) +
					getFontColor(p.Title) + 
					getFontStyle(p.Title));

				if (p.vScroll == 1)
				{
					if (p.hScroll == 1)
					{
						var item3 = new mxCell('', new mxGeometry(1, 0, 20, h - 50), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					else
					{
						var item3 = new mxCell('', new mxGeometry(1, 0, 20, h - 30), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					
				   	item3.geometry.relative = true;
				   	item3.geometry.offset = new mxPoint(-20, 30);
					item3.vertex = true;
					v.insert(item3);
					
					v.style += 'spacingRight=20;';
				}
				
				if (p.hScroll == 1)
				{
					if (p.vScroll == 1)
					{
						var item4 = new mxCell('', new mxGeometry(0, 1, w - 20, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					else
					{
						var item4 = new mxCell('', new mxGeometry(0, 1, w, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					
				   	item4.geometry.relative = true;
				   	item4.geometry.offset = new mxPoint(0, -20);
					item4.vertex = true;
					v.insert(item4);
				}

				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				break;
			case 'UI2DialogBlock' :
				v.value = convertText(p.Text);
				v.style += 
					getLabelStyle(p.Text, isLastLblHTML);

				var item1 = new mxCell('', new mxGeometry(0, 0, w, 30), 'part=1;resizeHeight=0;');
				item1.vertex = true;
				v.insert(item1);
				item1.value = convertText(p.Title);
				item1.style += getLabelStyle(p.Title, isLastLblHTML);
				item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
				
				var item2 = new mxCell('', new mxGeometry(1, 0.5, 20, 20), 'ellipse;part=1;strokeColor=#008cff;resizable=0;fillColor=none;html=1;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-25, -10);
				item2.vertex = true;
				item1.insert(item2);

				if (p.vScroll == 1)
				{
					if (p.hScroll == 1)
					{
						var item3 = new mxCell('', new mxGeometry(1, 0, 20, h - 50), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					else
					{
						var item3 = new mxCell('', new mxGeometry(1, 0, 20, h - 30), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					
				   	item3.geometry.relative = true;
				   	item3.geometry.offset = new mxPoint(-20, 30);
					item3.vertex = true;
					v.insert(item3);
					
					v.style += 'spacingRight=20;';
				}
				
				if (p.hScroll == 1)
				{
					if (p.vScroll == 1)
					{
						var item4 = new mxCell('', new mxGeometry(0, 1, w - 20, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					else
					{
						var item4 = new mxCell('', new mxGeometry(0, 1, w, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					
				   	item4.geometry.relative = true;
				   	item4.geometry.offset = new mxPoint(0, -20);
					item4.vertex = true;
					v.insert(item4);
				}

				v.style += addAllStyles(v.style, p, a, v);
				p.Text = null;
				break;
			case 'UI2AccordionBlock' :
				
				var item1 = new Array();
				var itemH = 25;
				
				for (var i = 0; i <= (p.Panels - 1); i++)
				{
					if (i < (p.Selected - 1))
					{
						item1[i] = new mxCell('', new mxGeometry(0, i * itemH, w, itemH), 'part=1;fillColor=#000000;fillOpacity=25;');
						item1[i].vertex = true;
						v.insert(item1[i]);
						item1[i].value = convertText(p['Panel_' + (i + 1)]);
						item1[i].style += 
							getLabelStyle(p['Panel_' + (i + 1)], isLastLblHTML);
					}
					else if (i == (p.Selected - 1))
					{
						item1[i] = new mxCell('', new mxGeometry(0, i * itemH, w, itemH), 'part=1;fillColor=none;');
						item1[i].vertex = true;
						v.insert(item1[i]);
						item1[i].value = convertText(p['Panel_' + (i + 1)]);
						item1[i].style += 
							getLabelStyle(p['Panel_' + (i + 1)], isLastLblHTML);
					}
					else
					{
						item1[i] = new mxCell('', new mxGeometry(0, h - (p.Panels - p.Selected) * itemH + (i - p.Selected) * itemH, w, itemH), 'part=1;fillColor=#000000;fillOpacity=25;');
						item1[i].vertex = true;
						v.insert(item1[i]);
						item1[i].value = convertText(p['Panel_' + (i + 1)]);
						item1[i].style += 
							getLabelStyle(p['Panel_' + (i + 1)], isLastLblHTML);
					}

					if (item1[i].style.indexOf(';align=') < 0)
					{
						item1[i].style += 'align=left;spacingLeft=5;';
					}
				}
				
				var fc2 = getStrokeColor(p, a);
				fc2 = fc2.replace('strokeColor', 'fillColor2');
				
				if (fc2 == '')
				{
					fc2 = 'fillColor2=#000000;'
				}
				
				if (p.vScroll == 1)
				{
					if (p.hScroll == 1)
					{
						var item2 = new mxCell('', new mxGeometry(1, 0, 20, h - p.Selected * itemH -20 - (p.Panels - p.Selected) * itemH), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					else
					{
						var item2 = new mxCell('', new mxGeometry(1, 0, 20, h - p.Selected * itemH - (p.Panels - p.Selected) * itemH), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					
				   	item2.geometry.relative = true;
				   	item2.geometry.offset = new mxPoint(-20, p.Selected * itemH);
					item2.vertex = true;
					v.insert(item2);
					
					v.style += 'spacingRight=20;';
					
					item2.style += fc2;
					item2.style += addAllStyles(item2.style, p, a, item2);
				}
				
				if (p.hScroll == 1)
				{
					if (p.vScroll == 1)
					{
						var item3 = new mxCell('', new mxGeometry(0, 1, w - 20, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					else
					{
						var item3 = new mxCell('', new mxGeometry(0, 1, w, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					
				   	item3.geometry.relative = true;
				   	item3.geometry.offset = new mxPoint(0, -20 - (p.Panels - p.Selected) * itemH);
					item3.vertex = true;
					v.insert(item3);

					item3.style += fc2; 
					item3.style += addAllStyles(item3.style, p, a, item3);
				}
				
				if (p.vScroll == 1)
				{
					item4 = new mxCell('', new mxGeometry(0, p.Selected * itemH, w - 20, h - p.Selected * itemH -20 - (p.Panels - p.Selected) * itemH), 'part=1;fillColor=none;strokeColor=none;');
				}
				else
				{
					item4 = new mxCell('', new mxGeometry(0, p.Selected * itemH, w - 20, h - p.Selected * itemH - (p.Panels - p.Selected) * itemH), 'part=1;fillColor=none;strokeColor=none;');
				}
				item4.vertex = true;
				v.insert(item4);
				item4.value = convertText(p['Content_1']);
				item4.style += 
					getLabelStyle(p['Content_1'], isLastLblHTML);
				
				if (!isLastLblHTML && item4.style.indexOf(';align=') < 0)
				{
					item4.style += 'align=left;spacingLeft=5;';
				}
				
				v.style += addAllStyles(v.style, p, a, v);

				break;
			case 'UI2TabBarContainerBlock' :
				v.style += 'strokeColor=none;fillColor=none;';

				var item1 = new Array();
				var item2 = new Array();
				var itemH = 25;
				var itemS = 3; // tab spacing
				var itemW = (w + itemS) / (p.Tabs + 1);
				var startW = 10;
					
				var bg = new mxCell('', new mxGeometry(0, itemH, w, h - itemH), 'part=1;');
				bg.vertex = true;
				v.insert(bg);
				bg.style += addAllStyles(bg.style, p, a, bg);
				
				for (var i = 0; i <= (p.Tabs - 1); i++)
				{
					if (i == (p.Selected - 1))
					{
						item2[i] = new mxCell('', new mxGeometry(startW + i * itemW, 0, itemW - itemS, itemH), '');
						item2[i].vertex = true;
						v.insert(item2[i]);
						item2[i].value = convertText(p['Tab_' + (i + 1)]);
						item2[i].style += 
							getLabelStyle(p['Tab_' + (i + 1)], isLastLblHTML);
					}
					else
					{
						item1[i] = new mxCell('', new mxGeometry(startW + i * itemW, 0, itemW - itemS, itemH), 'strokeColor=none;');
						item1[i].vertex = true;
						v.insert(item1[i]);
						item1[i].style += 
							item1[i].style += addAllStyles(item1[i].style, p, a, item1[i]);
						
						item2[i] = new mxCell('', new mxGeometry(0, 0, itemW - itemS, itemH), 'fillColor=#000000;fillOpacity=25;');
						item2[i].vertex = true;
						item1[i].insert(item2[i]);
						item2[i].value = convertText(p['Tab_' + (i + 1)]);
						item2[i].style += 
							getLabelStyle(p['Tab_' + (i + 1)], isLastLblHTML);
					}

					if (item2[i].style.indexOf(';align=') < 0)
					{
						item2[i].style += 'align=left;spacingLeft=2;';
					}
					
					item2[i].style += addAllStyles(item2[i].style, p, a, item2[i]);
				}
				
				var fc2 = getStrokeColor(p, a);
				fc2 = fc2.replace('strokeColor', 'fillColor2');
				
				if (fc2 == '')
				{
					fc2 = 'fillColor2=#000000;'
				}
				
				if (p.vScroll == 1)
				{
					if (p.hScroll == 1)
					{
						var item2 = new mxCell('', new mxGeometry(1, 0, 20, h -20 - itemH), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					else
					{
						var item2 = new mxCell('', new mxGeometry(1, 0, 20, h - itemH), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					
				   	item2.geometry.relative = true;
				   	item2.geometry.offset = new mxPoint(-20, itemH);
					item2.vertex = true;
					v.insert(item2);
					
					v.style += 'spacingRight=20;';
					
					item2.style += fc2;
					item2.style += addAllStyles(item2.style, p, a, item2);
				}
				
				if (p.hScroll == 1)
				{
					if (p.vScroll == 1)
					{
						var item3 = new mxCell('', new mxGeometry(0, 1, w - 20, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					else
					{
						var item3 = new mxCell('', new mxGeometry(0, 1, w, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					
				   	item3.geometry.relative = true;
				   	item3.geometry.offset = new mxPoint(0, -20);
					item3.vertex = true;
					v.insert(item3);

					item3.style += fc2; 
					item3.style += addAllStyles(item3.style, p, a, item3);
				}
				
				break;
				
			case 'UI2TabBar2ContainerBlock' :
				v.style += 'strokeColor=none;fillColor=none;';

				var item1 = new Array();
				var item2 = new Array();
				var itemH = 25; // tab height
				var itemS = 3; // tab spacing
				var itemW = (w + itemS) / p.Tabs; //tab width (including spacing)
					
				var bg = new mxCell('', new mxGeometry(0, itemH, w, h - itemH), 'part=1;');
				bg.vertex = true;
				v.insert(bg);
				bg.style += addAllStyles(bg.style, p, a, bg);
				
				for (var i = 0; i <= (p.Tabs - 1); i++)
				{
					if (i == (p.Selected - 1))
					{
						item2[i] = new mxCell('', new mxGeometry(i * itemW, 0, itemW - itemS, itemH), '');
						item2[i].vertex = true;
						v.insert(item2[i]);
						item2[i].value = convertText(p['Tab_' + (i + 1)]);
						item2[i].style += 
							getLabelStyle(p['Tab_' + (i + 1)], isLastLblHTML);
						item2[i].style += addAllStyles(item2[i].style, p, a, item2[i], isLastLblHTML);
					}
					else
					{
						item1[i] = new mxCell('', new mxGeometry(i * itemW, 0, itemW - itemS, itemH), 'strokeColor=none;');
						item1[i].vertex = true;
						v.insert(item1[i]);
						item1[i].style += addAllStyles(item1[i].style, p, a, item1[i]);
						
						item2[i] = new mxCell('', new mxGeometry(0, 0, itemW - itemS, itemH), 'fillColor=#000000;fillOpacity=25;');
						item2[i].vertex = true;
						item1[i].insert(item2[i]);
						item2[i].value = convertText(p['Tab_' + (i + 1)]);
						item2[i].style += 
							getLabelStyle(p['Tab_' + (i + 1)], isLastLblHTML);
						item2[i].style += addAllStyles(item2[i].style, p, a, item2[i], isLastLblHTML);
					}

					if (item2[i].style.indexOf(';align=') < 0)
					{
						item2[i].style += 'align=left;spacingLeft=2;';
					}
				}
				
				var fc2 = getStrokeColor(p, a);
				fc2 = fc2.replace('strokeColor', 'fillColor2');
				
				if (fc2 == '')
				{
					fc2 = 'fillColor2=#000000;'
				}
				
				if (p.vScroll == 1)
				{
					if (p.hScroll == 1)
					{
						var item2 = new mxCell('', new mxGeometry(1, 0, 20, h -20 - itemH), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					else
					{
						var item2 = new mxCell('', new mxGeometry(1, 0, 20, h - itemH), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					
				   	item2.geometry.relative = true;
				   	item2.geometry.offset = new mxPoint(-20, itemH);
					item2.vertex = true;
					v.insert(item2);
					
					v.style += 'spacingRight=20;';
					
					item2.style += fc2;
					item2.style += addAllStyles(item2.style, p, a, item2);
				}
				
				if (p.hScroll == 1)
				{
					if (p.vScroll == 1)
					{
						var item3 = new mxCell('', new mxGeometry(0, 1, w - 20, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					else
					{
						var item3 = new mxCell('', new mxGeometry(0, 1, w, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					
				   	item3.geometry.relative = true;
				   	item3.geometry.offset = new mxPoint(0, -20);
					item3.vertex = true;
					v.insert(item3);

					item3.style += fc2; 
					item3.style += addAllStyles(item3.style, p, a, item3);
				}
				
				break;
				
			case 'UI2VTabBarContainerBlock' :
				v.style += 'strokeColor=none;fillColor=none;';

				var item1 = new Array();
				var item2 = new Array();
				var itemS = 3; // tab spacing
				var itemH = 25 + itemS; // tab height (including spacing)
				var itemW = 80; //tab width
				var startH = 10;
					
				var bg = new mxCell('', new mxGeometry(itemW, 0, w - itemW, h), 'part=1;');
				bg.vertex = true;
				v.insert(bg);
				bg.style += addAllStyles(bg.style, p, a, bg);
				
				for (var i = 0; i <= (p.Tabs - 1); i++)
				{
					if (i == (p.Selected - 1))
					{
						item2[i] = new mxCell('', new mxGeometry(0, startH + i * itemH, itemW, itemH - itemS), '');
						item2[i].vertex = true;
						v.insert(item2[i]);
						item2[i].value = convertText(p['Tab_' + (i + 1)]);
						item2[i].style += 
							getLabelStyle(p['Tab_' + (i + 1)], isLastLblHTML);
						item2[i].style += addAllStyles(item2[i].style, p, a, item2[i], isLastLblHTML);
					}
					else
					{
						item1[i] = new mxCell('', new mxGeometry(0, startH + i * itemH, itemW, itemH - itemS), 'strokeColor=none;');
						item1[i].vertex = true;
						v.insert(item1[i]);
						item1[i].style += addAllStyles(item1[i].style, p, a, item1[i]);
						
						item2[i] = new mxCell('', new mxGeometry(0, 0, itemW, itemH - itemS), 'fillColor=#000000;fillOpacity=25;');
						item2[i].vertex = true;
						item1[i].insert(item2[i]);
						item2[i].value = convertText(p['Tab_' + (i + 1)]);
						item2[i].style += 
							getLabelStyle(p['Tab_' + (i + 1)], isLastLblHTML);
					}

					if (item2[i].style.indexOf(';align=') < 0)
					{
						item2[i].style += 'align=left;spacingLeft=2;';
					}
					
					item2[i].style += addAllStyles(item2[i].style, p, a, item2[i]);
				}
				
				var fc2 = getStrokeColor(p, a);
				fc2 = fc2.replace('strokeColor', 'fillColor2');
				
				if (fc2 == '')
				{
					fc2 = 'fillColor2=#000000;'
				}
				
				if (p.vScroll == 1)
				{
					if (p.hScroll == 1)
					{
						var item2 = new mxCell('', new mxGeometry(1, 0, 20, h -20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					else
					{
						var item2 = new mxCell('', new mxGeometry(1, 0, 20, h), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=95;direction=north;resizeHeight=1;');
					}
					
				   	item2.geometry.relative = true;
				   	item2.geometry.offset = new mxPoint(-20, 0);
					item2.vertex = true;
					v.insert(item2);
					
					v.style += 'spacingRight=20;';
					
					item2.style += fc2;
					item2.style += addAllStyles(item2.style, p, a, item2);
				}
				
				if (p.hScroll == 1)
				{
					if (p.vScroll == 1)
					{
						var item3 = new mxCell('', new mxGeometry(itemW, 1, w - 20 - itemW, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					else
					{
						var item3 = new mxCell('', new mxGeometry(itemW, 1, w - itemW, 20), 'part=1;shape=mxgraph.mockup.navigation.scrollBar;barPos=5;resizeWidth=1;');
					}
					
				   	item3.geometry.relative = true;
				   	item3.geometry.offset = new mxPoint(0, -20);
					item3.vertex = true;
					v.insert(item3);

					item3.style += fc2; 
					item3.style += addAllStyles(item3.style, p, a, item3);
				}
				
				break;
			case 'UI2CheckBoxBlock' :
				v.style += 'strokeColor=none;fillColor=none;';
				
				var itemH = h / p.Options;
				var item1 = new Array(); //checkbox
				var item2 = new Array(); //checkmark
				
				for (var i = 0; i < p.Options; i++)
				{
					item1[i] = new mxCell('', new mxGeometry(0, i * itemH + itemH * 0.5 - 5, 10, 10), 'labelPosition=right;part=1;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=3;');
					item1[i].vertex = true;
					v.insert(item1[i]);
					item1[i].value = convertText(p['Option_' + (i + 1)]);
					item1[i].style += 
						getLabelStyle(p['Option_' + (i + 1)], isLastLblHTML);
					item1[i].style += addAllStyles(item1[i].style, p, a, item1[i], isLastLblHTML);
					
					if (p.Selected[i + 1] != null)
					{
						if (p.Selected[i + 1] == 1)
						{
							var fc = getStrokeColor(p, a);
							fc = fc.replace('strokeColor', 'fillColor');
							
							if (fc == '')
							{
								fc = 'fillColor=#000000;'
							}
							
							item2[i] = new mxCell('', new mxGeometry(2, 2, 6, 6), 'shape=mxgraph.mscae.general.checkmark;part=1;');
							item2[i].vertex = true;
							item1[i].insert(item2[i]);
							item2[i].style += fc;
							item2[i].style += addAllStyles(item2[i].style, p, a, item2[i]);
						}
					}
					
				}
				
				break;
			case 'UI2HorizontalCheckBoxBlock' :
				v.style += 'strokeColor=none;fillColor=none;';
				
				var itemW = w / p.Options;
				var item1 = new Array(); //checkbox
				var item2 = new Array(); //checkmark
				
				for (var i = 0; i < p.Options; i++)
				{
					item1[i] = new mxCell('', new mxGeometry(i * itemW, h * 0.5 - 5, 10, 10), 'labelPosition=right;part=1;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=3;');
					item1[i].vertex = true;
					v.insert(item1[i]);
					item1[i].value = convertText(p['Option_' + (i + 1)]);
					item1[i].style += 
						getLabelStyle(p['Option_' + (i + 1)], isLastLblHTML);
					item1[i].style += addAllStyles(item1[i].style, p, a, item1[i], isLastLblHTML);
					
					if (p.Selected[i + 1] != null)
					{
						if (p.Selected[i + 1] == 1)
						{
							var fc = getStrokeColor(p, a);
							fc = fc.replace('strokeColor', 'fillColor');
							
							if (fc == '')
							{
								fc = 'fillColor=#000000;'
							}
							
							item2[i] = new mxCell('', new mxGeometry(2, 2, 6, 6), 'shape=mxgraph.mscae.general.checkmark;part=1;');
							item2[i].vertex = true;
							item1[i].insert(item2[i]);
							item2[i].style += fc; 
							item2[i].style += addAllStyles(item2[i].style, p, a, item2[i]);
						}
					}
					
				}
				
				break;
			case 'UI2RadioBlock' :
				v.style += 'strokeColor=none;fillColor=none;';
				
				var itemH = h / p.Options;
				var item1 = new Array(); //checkbox
				var item2 = new Array(); //checkmark
				
				for (var i = 0; i < p.Options; i++)
				{
					item1[i] = new mxCell('', new mxGeometry(0, i * itemH + itemH * 0.5 - 5, 10, 10), 'ellipse;labelPosition=right;part=1;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=3;');
					item1[i].vertex = true;
					v.insert(item1[i]);
					item1[i].value = convertText(p['Option_' + (i + 1)]);
					item1[i].style += 
						getLabelStyle(p['Option_' + (i + 1)], isLastLblHTML);
					item1[i].style += addAllStyles(item1[i].style, p, a, item1[i], isLastLblHTML);
					
					if (p.Selected != null)
					{
						if (p.Selected == (i + 1))
						{
							var fc = getStrokeColor(p, a);
							fc = fc.replace('strokeColor', 'fillColor');
							
							if (fc == '')
							{
								fc = 'fillColor=#000000;'
							}
							
							item2[i] = new mxCell('', new mxGeometry(2.5, 2.5, 5, 5), 'ellipse;');
							item2[i].vertex = true;
							item1[i].insert(item2[i]);
							item2[i].style += fc; 
							item2[i].style += addAllStyles(item2[i].style, p, a, item2[i]);
						}
					}
				}
				
				break;
			case 'UI2HorizontalRadioBlock' :
				v.style += 'strokeColor=none;fillColor=none;';
				
				var itemW = w / p.Options;
				var item1 = new Array(); //checkbox
				var item2 = new Array(); //checkmark
				
				for (var i = 0; i < p.Options; i++)
				{
					item1[i] = new mxCell('', new mxGeometry(i * itemW, h * 0.5 - 5, 10, 10), 'ellipse;labelPosition=right;part=1;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=3;');
					item1[i].vertex = true;
					v.insert(item1[i]);
					item1[i].value = convertText(p['Option_' + (i + 1)]);
					item1[i].style += 
						getLabelStyle(p['Option_' + (i + 1)], isLastLblHTML);
					item1[i].style += addAllStyles(item1[i].style, p, a, item1[i], isLastLblHTML);
					
					if (p.Selected != null)
					{
						if (p.Selected == (i + 1))
						{
							var fc = getStrokeColor(p, a);
							fc = fc.replace('strokeColor', 'fillColor');
							
							if (fc == '')
							{
								fc = 'fillColor=#000000;'
							}
							
							item2[i] = new mxCell('', new mxGeometry(2, 2, 6, 6), 'ellipse;part=1;');
							item2[i].vertex = true;
							item1[i].insert(item2[i]);
							item2[i].style += fc; 
							item2[i].style += addAllStyles(item2[i].style, p, a, item2[i]);
						}
					}
					
				}
				
				break;
			case 'UI2SelectBlock' : 
				v.style += 'shape=mxgraph.mockup.forms.comboBox;strokeColor=#999999;fillColor=#ddeeff;align=left;fillColor2=#aaddff;mainText=;fontColor=#666666';
				v.value = convertText(p.Selected);
				break;
			case 'UI2HSliderBlock' :
			case 'UI2VSliderBlock' :
				v.style += 'shape=mxgraph.mockup.forms.horSlider;sliderStyle=basic;handleStyle=handle;';

				if (obj.Class == 'UI2VSliderBlock')
				{
					v.style += 'direction=south;';
				}
				
				v.style += 'sliderPos=' + (p.ScrollVal * 100) + ';';
				v.style += addAllStyles(v.style, p, a, v);
				
				break;
				
			case 'UI2DatePickerBlock' :
				v.style += 'strokeColor=none;fillColor=none;';
				
				var item1 = new mxCell('', new mxGeometry(0, 0, w * 0.6, h), 'part=1;');
				item1.vertex = true;
				v.insert(item1);
				item1.value = convertText(p.Date);
				item1.style +=  
					getLabelStyle(p.Date, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v);
				
				var fc = getStrokeColor(p, a);
				fc = fc.replace('strokeColor', 'fillColor');
				
				if (fc == '')
				{
					fc = 'fillColor=#000000;'
				}
				
				var item2 = new mxCell('', new mxGeometry(w * 0.75, 0, w * 0.25, h), 'part=1;shape=mxgraph.gmdl.calendar;');
				item2.vertex = true;
				v.insert(item2);
				item2.style += fc;  
				item2.style += addAllStyles(item2.style, p, a, item2);

				break;

			case 'UI2SearchBlock' :
				v.value = convertText(p.Search);
				v.style += 'shape=mxgraph.mockup.forms.searchBox;mainText=;flipH=1;align=left;spacingLeft=26;' + 
					getLabelStyle(p.Search, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				break;

			case 'UI2NumericStepperBlock' :
				var fc = getStrokeColor(p, a);
				fc = fc.replace('strokeColor', 'fillColor');
				
				if (fc == '')
				{
					fc = 'fillColor=#000000;'
				}
				
				v.value = convertText(p.Number);
				v.style += 'shape=mxgraph.mockup.forms.spinner;spinLayout=right;spinStyle=normal;adjStyle=triangle;mainText=;align=left;spacingLeft=8;' + fc + 
					getLabelStyle(p.Number, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				break;
				
			case 'UI2TableBlock' :
				//Create table as HTML one
				try
				{
					var fillClr = getColor(p.FillColor), lineClr = getColor(p.LineColor), header, altRow, borderStyle = '', rowH = 20;
					v.style = 'html=1;overflow=fill;verticalAlign=top;spacing=0;';
					var htmlTable = '<table style="width:100%;height:100%;border-collapse: collapse;border: 1px solid ' + lineClr + ';">';
					var csvLines = p.Data.split('\n');
					
					if (!p.AltRow || p.AltRow == 'default')
					{
						altRow = getDarkerClr(fillClr, 0.95);
					}
					else if (p.AltRow == 'none')
					{
						altRow = fillClr;
					}
					else
					{
						altRow = getColor(p.AltRow);
					}
					
					if (!p.Header || p.Header == 'default')
					{
						header = getDarkerClr(fillClr, 0.8);
					}
					else if (p.Header == 'none')
					{
						header = altRow;
					}
					else
					{
						header = getColor(p.Header);
					}
					
					if (p.GridLines == 'full')
					{
						borderStyle = 'border: 1px solid ' + lineClr;
						rowH = 19;
					}
					else if (p.GridLines == 'row')
					{
						borderStyle = 'border-bottom: 1px solid ' + lineClr;
						rowH = 19;
					}
					else if (p.GridLines == 'default' || p.GridLines == 'column')
					{
						borderStyle = 'border-right: 1px solid ' + lineClr;
					}
					
					csvLines = csvLines.filter(function(l)
					{
						return l;
					});
					
					if (/^\{[^}]*\}$/.test(csvLines[csvLines.length - 1]))
					{
						csvLines.pop();
					}
					
					var cols = csvLines[0].split(',').length;
					
					var emptyRow = '';
					
					for (var j = 0; j < cols - 1; j++)
					{
						emptyRow += ' , ';
					}
							
					for (var i = csvLines.length; i < Math.ceil(h / 20); i++)
					{
						csvLines.push(emptyRow)
					}
					
					for (var i = 0; i < csvLines.length; i++)
					{
						htmlTable += '<tr style="height: ' + rowH + 'px;background:' + (i == 0? header : 
								(i % 2? fillClr : altRow)) + '">';
						var els = csvLines[i].split(',');
						
						for (var j = 0; j < els.length; j++)
						{
							var cellProp = p['Cell_' + i + '_' + j];
							var txtClr = cellProp && cellProp.m && cellProp.m[0] && cellProp.m[0].n == 'c'?  getColor(cellProp.m[0].v) : lineClr;
							htmlTable += '<td style="height: ' + rowH + 'px;color:' + txtClr + ';' + borderStyle + '">' + mxUtils.htmlEntities(els[j]) + '</td>';
						}
						
						htmlTable += '</tr>';
					}
					
					htmlTable += '</table>';
					v.value = htmlTable;
				}
				catch(e)
				{
					//Ignore
					console.log(e);
				}
				break;
			case 'UI2ButtonBarBlock' :
				v.style += addAllStyles(v.style, p, a, v);

				var item1 = new Array();
				var item2 = new Array();
				var itemW = w / p.Buttons;
					
				for (var i = 0; i <= (p.Buttons - 1); i++)
				{
					if (i == (p.Selected - 1))
					{
						item2[i] = new mxCell('', new mxGeometry(i * itemW, 0, itemW, h), '');
						item2[i].vertex = true;
						v.insert(item2[i]);
						item2[i].value = convertText(p['Button_' + (i + 1)]);
						item2[i].style += 
							getLabelStyle(p['Button_' + (i + 1)], isLastLblHTML);
						item2[i].style += addAllStyles(item2[i].style, p, a, item2[i], isLastLblHTML);
					}
					else
					{
						item1[i] = new mxCell('', new mxGeometry(i * itemW, 0, itemW, h), 'strokeColor=none;');
						item1[i].vertex = true;
						v.insert(item1[i]);
						item1[i].style += 
							item1[i].style += addAllStyles(item1[i].style, p, a, item1[i]);
						
						item2[i] = new mxCell('', new mxGeometry(0, 0, itemW, h), 'fillColor=#000000;fillOpacity=25;');
						item2[i].vertex = true;
						item1[i].insert(item2[i]);
						item2[i].value = convertText(p['Button_' + (i + 1)]);
						item2[i].style += 
							getLabelStyle(p['Button_' + (i + 1)], isLastLblHTML);
						item2[i].style += addAllStyles(item2[i].style, p, a, item2[i], isLastLblHTML);
					}
				}
				
				break;
				
			case 'UI2VerticalButtonBarBlock' :
				v.style += addAllStyles(v.style, p, a, v);
	
				var item1 = new Array();
				var item2 = new Array();
				var itemH = h / p.Buttons;
					
				for (var i = 0; i <= (p.Buttons - 1); i++)
				{
					if (i == (p.Selected - 1))
					{
						item2[i] = new mxCell('', new mxGeometry(0, i * itemH, w, itemH), '');
						item2[i].vertex = true;
						v.insert(item2[i]);
						item2[i].value = convertText(p['Button_' + (i + 1)]);
						item2[i].style += 
							getLabelStyle(p['Button_' + (i + 1)], isLastLblHTML);
						item2[i].style += addAllStyles(item2[i].style, p, a, item2[i], isLastLblHTML);
					}
					else
					{
						item1[i] = new mxCell('', new mxGeometry(0, i * itemH, w, itemH), 'strokeColor=none;');
						item1[i].vertex = true;
						v.insert(item1[i]);
						item1[i].style += addAllStyles(item1[i].style, p, a, item1[i]);
						
						item2[i] = new mxCell('', new mxGeometry(0, 0, w, itemH), 'fillColor=#000000;fillOpacity=25;');
						item2[i].vertex = true;
						item1[i].insert(item2[i]);
						item2[i].value = convertText(p['Button_' + (i + 1)]);
						item2[i].style += 
							getLabelStyle(p['Button_' + (i + 1)], isLastLblHTML);
						item2[i].style += addAllStyles(item2[i].style, p, a, item2[i], isLastLblHTML);
					}
				}
				
				break;
			case 'UI2LinkBarBlock' :
				v.style += 'strokeColor=none;fillColor=none;';
				v.style += addAllStyles(v.style, p, a, v);

				var item1 = new Array();
				var item2 = new Array();
				var itemW = w / p.Links;
					
				for (var i = 0; i < (p.Links); i++)
				{
					if (i != 0)
					{
						item2[i] = new mxCell('', new mxGeometry(i * itemW, 0, itemW, h), 'shape=partialRectangle;top=0;bottom=0;right=0;fillColor=none;');
						item2[i].style += addAllStyles(item2[i].style, p, a, item2[i]);
					}
					else
					{
						item2[i] = new mxCell('', new mxGeometry(i * itemW, 0, itemW, h), 'fillColor=none;strokeColor=none;');
					}
					
					item2[i].vertex = true;
					v.insert(item2[i]);
					item2[i].value = convertText(p['Link_' + (i + 1)]);
					item2[i].style += 
						getLabelStyle(p['Link_' + (i + 1)], isLastLblHTML);
				}
				
				break;
				
			case 'UI2BreadCrumbsBlock' :
				v.style += 'strokeColor=none;fillColor=none;';
				v.style += addAllStyles(v.style, p, a, v);

				var item1 = new Array();
				var item2 = new Array();
				var itemW = w / p.Links;
					
				for (var i = 0; i < (p.Links); i++)
				{
					item1[i] = new mxCell('', new mxGeometry(i * itemW, 0, itemW, h), 'fillColor=none;strokeColor=none;');
					item1[i].vertex = true;
					v.insert(item1[i]);
					item1[i].value = convertText(p['Link_' + (i + 1)]);
					item1[i].style += 
						getLabelStyle(p['Link_' + (i + 1)], isLastLblHTML);
				}
				
				for (var i = 1; i < (p.Links); i++)
				{
					item2[i] = new mxCell('', new mxGeometry(i / p.Links, 0.5, 6, 10), 'shape=mxgraph.ios7.misc.right;');
					item2[i].geometry.relative = true;
					item2[i].geometry.offset = new mxPoint(-3, -5);
					item2[i].vertex = true;
					v.insert(item2[i]);
				}
				
				break;
			case 'UI2MenuBarBlock' :
				v.style += 'strokeColor=none;';
				v.style += addAllStyles(v.style, p, a, v);

				var item1 = new Array();
				var itemW = w / (p.Buttons + 1);
					
				for (var i = 0; i <= (p.Buttons - 1); i++)
				{
					if (i != (p.Selected - 1))
					{
						item1[i] = new mxCell('', new mxGeometry(0, 0, itemW, h), 'strokeColor=none;fillColor=none;resizeHeight=1;');
					}
					else
					{
						item1[i] = new mxCell('', new mxGeometry(0, 0, itemW, h), 'fillColor=#000000;fillOpacity=25;strokeColor=none;resizeHeight=1;');
					}
					
					item1[i].geometry.relative = true;
					item1[i].geometry.offset = new mxPoint(i * itemW, 0);
					item1[i].vertex = true;
					v.insert(item1[i]);
					item1[i].value = convertText(p['MenuItem_' + (i + 1)]);
					item1[i].style += 
						getLabelStyle(p['MenuItem_' + (i + 1)], isLastLblHTML);
				}
				
				break;
			case 'UI2AtoZBlock' :
				v.style += 'fillColor=none;strokeColor=none;' + 
					getLabelStyle(p['Text_0']);
				
				v.value = '0-9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
				
				break;

			case 'UI2PaginationBlock' :
				v.style += 'fillColor=none;strokeColor=none;' + 
					getLabelStyle(p.Text_prev);
			
				v.value = convertText(p.Text_prev) + ' ';
				
				for (var i = 0; i < p.Links; i++)
				{
					v.value += convertText(p['Link_' + (i + 1)]) + ' ';
				}
				
				v.value += convertText(p.Text_next);
				
				break;
				
			case 'UI2ContextMenuBlock' :
				v.style += addAllStyles(v.style, p, a, v);
				
				var item = new Array();
				var icon = new Array();
				var shortcut = new Array();
				var itemH = h / p.Lines;
				var st = null; 
				
				for (var i = 0; i < p.Lines; i++)
				{
					//add label
					if (p['Item_' + (i + 1)] != null)
					{
						if (st == null)
						{
							st = '' + 
								getFontSize(p['Item_' + (i + 1)]) +
								getFontColor(p['Item_' + (i + 1)]) + 
								getFontStyle(p['Item_' + (i + 1)]);
						}
						
						item[i] = new mxCell('', new mxGeometry(0, i * h / p.Lines, w, itemH), 'strokeColor=none;fillColor=none;spacingLeft=20;align=left;html=1;');
						item[i].vertex = true;
						v.insert(item[i]);
						item[i].style += st; 
						
						item[i].value = convertText(p['Item_' + (i + 1)]);
					}
					
					//add icon
					if (p.Icons[(i + 1)] != null && item[i] != null)
					{
						if (p.Icons[(i + 1)] == 'dot')
						{
							icon[i] = new mxCell('', new mxGeometry(0, 0.5, 8, 8), 'ellipse;strokeColor=none;');
							icon[i].geometry.offset = new mxPoint(6, -4);
						}
						else if (p.Icons[(i + 1)] == 'check')
						{
							icon[i] = new mxCell('', new mxGeometry(0, 0.5, 7, 8), 'shape=mxgraph.mscae.general.checkmark;strokeColor=none;');
							icon[i].geometry.offset = new mxPoint(6.5, -4);
						}

						if (icon[i] != null)
						{
							icon[i].geometry.relative = true;
							icon[i].vertex = true;
							item[i].insert(icon[i]);
							
							var fc = getStrokeColor(p, a);
							fc = fc.replace('strokeColor', 'fillColor');
							
							if (fc == '')
							{
								fc = 'fillColor=#000000;'
							}
							
							icon[i].style += fc;
						}
					}
					
					//add shortcut
					if (p['Shortcut_' + (i + 1)] != null)
					{
						if (st == null)
						{
							st = '' + 
								getFontSize(p['Shortcut_' + (i + 1)]) +
								getFontColor(p['Shortcut_' + (i + 1)]) + 
								getFontStyle(p['Shortcut_' + (i + 1)]);
						}
						
						shortcut[i] = new mxCell('', new mxGeometry(w * 0.6, i * h / p.Lines, w * 0.4, itemH), 'strokeColor=none;fillColor=none;spacingRight=3;align=right;html=1;');
						shortcut[i].vertex = true;
						v.insert(shortcut[i]);
						shortcut[i].style += st; 
						
						shortcut[i].value = convertText(p['Shortcut_' + (i + 1)]);
					}
					
					//add line
					if (p.Dividers[(i + 1)] != null)
					{
						item[i] = new mxCell('', new mxGeometry(w * 0.05, i * h / p.Lines, w * 0.9, itemH), 'shape=line;strokeWidth=1;');
						item[i].vertex = true;
						v.insert(item[i]);
						item[i].style += getStrokeColor(p, a); 
					}
				}
				
				break;
			case 'UI2TreePaneBlock' :
				break;
				
			case 'UI2ProgressBarBlock' :
				v.style += 'shape=mxgraph.mockup.misc.progressBar;fillColor2=#888888;barPos=' + (p.ScrollVal * 100) + ';';
				
				break;
			
			case 'CalloutSquareBlock':
			case 'UI2TooltipSquareBlock' :
				v.value = convertText(p.Tip || p.Text);
				v.style += 'html=1;shape=callout;flipV=1;base=13;size=7;position=0.5;position2=0.66;rounded=1;arcSize=' + (p.RoundCorners) + ';' +
					getLabelStyle(p.Tip || p.Text, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				v.geometry.height += 10;
				break;
			case 'UI2CalloutBlock' :
				v.value = convertText(p.Txt);
				v.style += 'shape=ellipse;perimeter=ellipsePerimeter;' +
					getLabelStyle(p.Txt, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				break;
				
			case 'UI2AlertBlock' :
				v.value = convertText(p.Txt);
				v.style += 
					getLabelStyle(p.Txt, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				var item1 = new mxCell('', new mxGeometry(0, 0, w, 30), 'part=1;resizeHeight=0;');
				item1.vertex = true;
				v.insert(item1);
				item1.value = convertText(p.Title);
				item1.style +=
					getLabelStyle(p.Title, isLastLblHTML);
				item1.style += addAllStyles(item1.style, p, a, item1, isLastLblHTML);
				
				var item2 = new mxCell('', new mxGeometry(1, 0.5, 20, 20), 'ellipse;part=1;strokeColor=#008cff;resizable=0;fillColor=none;html=1;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-25, -10);
				item2.vertex = true;
				item1.insert(item2);

				var bw = 45;
				var bh = 20;
				var bs = 10;
				var totalW = bw * p.Buttons + (bs * p.Buttons - 1)
				
				item3 = new Array();
				
				for (var i = 0; i < p.Buttons; i++)
				{
					item3[i] = new mxCell('', new mxGeometry(0.5, 1, bw, bh), 'part=1;html=1;');
				   	item3[i].geometry.relative = true;
				   	item3[i].geometry.offset = new mxPoint(-totalW * 0.5 + i * (bw + bs), -40);
					item3[i].vertex = true;
					v.insert(item3[i]);
					item3[i].value = convertText(p['Button_' + (i + 1)]);
					item3[i].style +=
						getLabelStyle(p['Button_' + (i + 1)], isLastLblHTML);
					item3[i].style += addAllStyles(item3[i].style, p, a, item3[i], isLastLblHTML);
				}
				
				break;
				
			case 'UMLClassBlock' :
				if (p.Simple == 0)
				{
					var st = getFillColor(p, a);
					var th = Math.round(p.TitleHeight * scale) || 25;
					st = st.replace('fillColor', 'swimlaneFillColor');
					
					if (st == '')
					{
						st = 'swimlaneFillColor=#ffffff;'
					}
					
					v.value = convertText(p.Title);
					v.style += 'swimlane;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;fontStyle=0;marginBottom=0;' + st +
						'startSize=' + th + ';' +
						getLabelStyle(p.Title, isLastLblHTML);
					v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
					
					var item = new Array();
					var divider = new Array();
					var currH = th / h;
					var curY = th;
					
					for (var i = 0; i <= p.Attributes; i++)
					{
						if (i > 0)
						{
							divider[i] = new mxCell('', new mxGeometry(0, curY, 40, 8), 'line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;');
							curY += 8;
							divider[i].vertex = true;
							v.insert(divider[i]);
						}
						
						var itemH = 0;
						
						//Text2 is used when p.Attributes is zero!
						if (p.Attributes == 0)
						{
							i = 1;
							itemH = 1;
						}
						else
						{
							if (i < p.Attributes)
							{
								itemH = p['Text' + (i + 1) + 'Percent'];
								currH += itemH;
							}
							else
							{
								itemH = 1 - currH;
							}
						}
						
						var extH = p.ExtraHeightSet && i == 1? (p.ExtraHeight * scale) : 0;
						
						var curH = Math.round((h - th) * itemH) + extH;
						item[i] = new mxCell('', new mxGeometry(0, curY, w, curH), 'part=1;html=1;whiteSpace=wrap;resizeHeight=0;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;');
						curY += curH;
						item[i].vertex = true;
						v.insert(item[i]);
						item[i].style += st +
							getOpacity(p, a, item[i]) +
							getLabelStyle(p['Text' + (i + 1)], isLastLblHTML);
						
						item[i].value = convertText(p['Text' + (i + 1)]);
					}
				}
				else
				{
					v.value = convertText(p.Title);
					v.style += 'align=center;';
					v.style += 
						getLabelStyle(p.Title, isLastLblHTML);
					v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				}

				break;
			 	
			case 'ERDEntityBlock' :
				var st = getFillColor(p, a);
				var th = p.Name_h * scale;
				st = st.replace('fillColor', 'swimlaneFillColor');
				
				if (st == '')
				{
					st = 'swimlaneFillColor=#ffffff;'
				}
				
				v.value = convertText(p.Name);
				v.style += 'swimlane;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;fontStyle=0;marginBottom=0;' + st +
					'startSize=' + th + ';' +
					getLabelStyle(p.Name, isLastLblHTML);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);

				if (p.ShadedHeader)
				{
					var st = getColor(p.FillColor);
					var darkerClr = getDarkerClr(st, 0.85);
					v.style += 'fillColor=' + darkerClr + ';';
				}
				else
				{
					v.style += getFillColor(p, a);
				}
				
				var item = new Array();
				var currH = th / h;
				var curY = th;
				
				for (var i = 0; i < p.Fields; i++)
				{
					var itemH = 0;
					var curH = p['Field' + (i + 1) + '_h'] * scale;
					item[i] = new mxCell('', new mxGeometry(0, curY, w, curH), 'part=1;resizeHeight=0;strokeColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;html=1;whiteSpace=wrap;');
					curY += curH;
					item[i].vertex = true;
					v.insert(item[i]);
					item[i].style += st +
						getLabelStyle(p['Field' + (i + 1)], isLastLblHTML);

					if (p.AltRows == 1 && (i % 2 != 0))
					{
						item[i].style += 'fillColor=#000000;opacity=5;';
					}
					else
					{
						item[i].style += 'fillColor=none;' + 
							getOpacity(p, a, item[i]);
					}

					item[i].value = convertText(p['Field' + (i + 1)]);
				}
				
				break;
				
			case 'ERDEntityBlock2' :
				var st = getFillColor(p, a);
				var th = p.Name_h * scale;
				st = st.replace('fillColor', 'swimlaneFillColor');
				
				if (st == '')
				{
					st = 'swimlaneFillColor=#ffffff;'
				}
				
				v.value = convertText(p.Name);
				v.style += 'swimlane;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;fontStyle=0;' + st +
					'startSize=' + th + ';' +
					getLabelStyle(p.Name, isLastLblHTML);

				if (p.ShadedHeader)
				{
					v.style += 'fillColor=#e0e0e0;';
				}
				else
				{
					v.style += getFillColor(p, a);
				}
				
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item = new Array();
				var key = new Array();
				var currH = th;
				var keyW = 30;
				
				if (p.Column1 != null)
				{
					keyW = p.Column1 * scale;
				}
				
				for (var i = 0; i < p.Fields; i++)
				{
					var itemH = 0;

					key[i] = new mxCell('', new mxGeometry(0, currH, keyW, p['Key' + (i + 1) + '_h'] * scale), 'strokeColor=none;part=1;resizeHeight=0;align=center;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;html=1;whiteSpace=wrap;');
					key[i].vertex = true;
					v.insert(key[i]);
					key[i].style += st +
						getLabelStyle(p['Key' + (i + 1)], isLastLblHTML);

					if (p.AltRows == 1 && (i % 2 != 0))
					{
						key[i].style += 'fillColor=#000000;fillOpacity=5;';
					}
					else
					{
						key[i].style += 'fillColor=none;' + 
							getOpacity(p, a, key[i]);
					}

					key[i].value = convertText(p['Key' + (i + 1)]);
					
					item[i] = new mxCell('', new mxGeometry(keyW, currH, w - keyW, p['Field' + (i + 1) + '_h'] * scale), 'shape=partialRectangle;top=0;right=0;bottom=0;part=1;resizeHeight=0;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;html=1;whiteSpace=wrap;');
					item[i].vertex = true;
					v.insert(item[i]);
					item[i].style += st +
						getLabelStyle(p['Field' + (i + 1)], isLastLblHTML);
					v.style += addAllStyles(v.style, p, a, v);

					if (p.AltRows == 1 && (i % 2 != 0))
					{
						item[i].style += 'fillColor=#000000;fillOpacity=5;';
					}
					else
					{
						item[i].style += 'fillColor=none;' + 
							getOpacity(p, a, item[i]);
					}

					item[i].value = convertText(p['Field' + (i + 1)]);
					
					currH += p['Key' + (i + 1) + '_h'] * scale;
				}
				
				break;
				
			case 'ERDEntityBlock3' :
				var st = getFillColor(p, a);
				var th = p.Name_h * scale;
				st = st.replace('fillColor', 'swimlaneFillColor');
				
				if (st == '')
				{
					st = 'swimlaneFillColor=#ffffff;'
				}
				
				v.style += 'swimlane;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;fontStyle=0;' + st +
					'startSize=' + th + ';' +
					getLabelStyle(p.Name);

				if (p.ShadedHeader)
				{
					v.style += 'fillColor=#e0e0e0;';
				}
				else
				{
					v.style += getFillColor(p, a);
				}
				
				v.value = convertText(p.Name);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item = new Array();
				var key = new Array();
				var currH = th;
				var keyW = 30;
				
				if (p.Column1 != null)
				{
					keyW = p.Column1 * scale;
				}
				
				for (var i = 0; i < p.Fields; i++)
				{
					var itemH = 0;

					key[i] = new mxCell('', new mxGeometry(0, currH, keyW, p['Field' + (i + 1) + '_h'] * scale), 'strokeColor=none;part=1;resizeHeight=0;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;');
					key[i].vertex = true;
					v.insert(key[i]);
					key[i].style += st +
						getLabelStyle(p['Field' + (i + 1)], isLastLblHTML);

					if (p.AltRows == 1 && (i % 2 != 0))
					{
						key[i].style += 'fillColor=#000000;fillOpacity=5;';
					}
					else
					{
						key[i].style += 'fillColor=none;' + 
							getOpacity(p, a, key[i]);
					}

					key[i].value = convertText(p['Field' + (i + 1)]);
					key[i].style += addAllStyles(key[i].style, p, a, key[i], isLastLblHTML);
					
					item[i] = new mxCell('', new mxGeometry(keyW, currH, w - keyW, p['Type' + (i + 1) + '_h'] * scale), 'shape=partialRectangle;top=0;right=0;bottom=0;part=1;resizeHeight=0;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;');
					item[i].vertex = true;
					v.insert(item[i]);
					item[i].style += st +
						getLabelStyle(p['Type' + (i + 1)], isLastLblHTML);

					if (p.AltRows == 1 && (i % 2 != 0))
					{
						item[i].style += 'fillColor=#000000;fillOpacity=5;';
					}
					else
					{
						item[i].style += 'fillColor=none;' + 
							getOpacity(p, a, item[i]);
					}

					item[i].value = convertText(p['Type' + (i + 1)]);
					item[i].style += addAllStyles(item[i].style, p, a, item[i], isLastLblHTML);
					
					currH += p['Field' + (i + 1) + '_h'] * scale;
				}
				
				break;
			case 'ERDEntityBlock4' :
				var st = getFillColor(p, a);
				var th = p.Name_h * scale;
				st = st.replace('fillColor', 'swimlaneFillColor');
				
				if (st == '')
				{
					st = 'swimlaneFillColor=#ffffff;'
				}
				
				v.style += 'swimlane;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;fontStyle=0;' + st +
					'startSize=' + th + ';' +
					getLabelStyle(p.Name);

				if (p.ShadedHeader)
				{
					v.style += 'fillColor=#e0e0e0;';
				}
				else
				{
					v.style += getFillColor(p, a);
				}
				
				v.value = convertText(p.Name);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				var item = new Array();
				var key = new Array();
				var type = new Array();
				var currH = th;
				var keyW = 30;
				var typeW = 40;
				
				if (p.Column1 != null)
				{
					keyW = p.Column1 * scale;
				}
				
				if (p.Column2 != null)
				{
					typeW = p.Column2 * scale;
				}
				
				for (var i = 0; i < p.Fields; i++)
				{
					var itemH = 0;

					key[i] = new mxCell('', new mxGeometry(0, currH, keyW, p['Key' + (i + 1) + '_h'] * scale), 'strokeColor=none;part=1;resizeHeight=0;align=center;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;');
					key[i].vertex = true;
					v.insert(key[i]);
					key[i].style += st +
						getLabelStyle(p['Key' + (i + 1)], isLastLblHTML);

					if (p.AltRows == 1 && (i % 2 != 0))
					{
						key[i].style += 'fillColor=#000000;fillOpacity=5;';
					}
					else
					{
						key[i].style += 'fillColor=none;' + 
							getOpacity(p, a, key[i]);
					}

					key[i].value = convertText(p['Key' + (i + 1)]);
					key[i].style += addAllStyles(key[i].style, p, a, key[i], isLastLblHTML);
					
					item[i] = new mxCell('', new mxGeometry(keyW, currH, w - keyW - typeW, p['Field' + (i + 1) + '_h'] * scale), 'shape=partialRectangle;top=0;right=0;bottom=0;part=1;resizeHeight=0;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;');
					item[i].vertex = true;
					v.insert(item[i]);
					item[i].style += st +
						getLabelStyle(p['Field' + (i + 1)], isLastLblHTML);

					if (p.AltRows == 1 && (i % 2 != 0))
					{
						item[i].style += 'fillColor=#000000;fillOpacity=5;';
					}
					else
					{
						item[i].style += 'fillColor=none;' + 
							getOpacity(p, a, item[i]);
					}

					item[i].value = convertText(p['Field' + (i + 1)]);
					item[i].style += addAllStyles(item[i].style, p, a, item[i], isLastLblHTML);
					
					type[i] = new mxCell('', new mxGeometry(w - typeW, currH, typeW, p['Type' + (i + 1) + '_h'] * scale), 'shape=partialRectangle;top=0;right=0;bottom=0;part=1;resizeHeight=0;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;');
					type[i].vertex = true;
					v.insert(type[i]);
					type[i].style += st +
						getLabelStyle(p['Type' + (i + 1)], isLastLblHTML);

					if (p.AltRows == 1 && (i % 2 != 0))
					{
						type[i].style += 'fillColor=#000000;fillOpacity=5;';
					}
					else
					{
						type[i].style += 'fillColor=none;' + 
							getOpacity(p, a, type[i]);
					}

					type[i].value = convertText(p['Type' + (i + 1)]);
					type[i].style += addAllStyles(type[i].style, p, a, type[i], isLastLblHTML);
					
					currH += p['Key' + (i + 1) + '_h'] * scale;
				}
				
				break;
			case 'GCPServiceCardApplicationSystemBlock' :
				addGCP2ServiceCard('application_system', w, h, v, p, a);
				break;
			case 'GCPServiceCardAuthorizationBlock' :
				addGCP2ServiceCard('internal_payment_authorization', w, h, v, p, a);
				break;
			case 'GCPServiceCardBlankBlock' :
				addGCP2ServiceCard('blank', w, h, v, p, a);
				break;
			case 'GCPServiceCardReallyBlankBlock' :
				addGCP2ServiceCard('blank', w, h, v, p, a);
				break;
			case 'GCPServiceCardBucketBlock' :
				addGCP2ServiceCard('bucket', w, h, v, p, a);
				break;
			case 'GCPServiceCardCDNInterconnectBlock' :
				addGCP2ServiceCard('google_network_edge_cache', w, h, v, p, a);
				break;
			case 'GCPServiceCardCloudDNSBlock' :
				addGCP2ServiceCard('blank', w, h, v, p, a);
				break;
			case 'GCPServiceCardClusterBlock' :
				addGCP2ServiceCard('cluster', w, h, v, p, a);
				break;
			case 'GCPServiceCardDiskSnapshotBlock' :
				addGCP2ServiceCard('persistent_disk_snapshot', w, h, v, p, a);
				break;
			case 'GCPServiceCardEdgePopBlock' :
				addGCP2ServiceCard('google_network_edge_cache', w, h, v, p, a);
				break;
			case 'GCPServiceCardFrontEndPlatformServicesBlock' :
				addGCP2ServiceCard('frontend_platform_services', w, h, v, p, a);
				break;
			case 'GCPServiceCardGatewayBlock' :
				addGCP2ServiceCard('gateway', w, h, v, p, a);
				break;
			case 'GCPServiceCardGoogleNetworkBlock' :
				addGCP2ServiceCard('google_network_edge_cache', w, h, v, p, a);
				break;
			case 'GCPServiceCardImageServicesBlock' :
				addGCP2ServiceCard('image_services', w, h, v, p, a);
				break;
			case 'GCPServiceCardLoadBalancerBlock' :
				addGCP2ServiceCard('network_load_balancer', w, h, v, p, a);
				break;
			case 'GCPServiceCardLocalComputeBlock' :
				addGCP2ServiceCard('dedicated_game_server', w, h, v, p, a);
				break;
			case 'GCPServiceCardLocalStorageBlock' :
				addGCP2ServiceCard('persistent_disk_snapshot', w, h, v, p, a);
				break;
			case 'GCPServiceCardLogsAPIBlock' :
				addGCP2ServiceCard('logs_api', w, h, v, p, a);
				break;
			case 'GCPServiceCardMemcacheBlock' :
				addGCP2ServiceCard('memcache', w, h, v, p, a);
				break;
			case 'GCPServiceCardNATBlock' :
				addGCP2ServiceCard('nat', w, h, v, p, a);
				break;
			case 'GCPServiceCardPaymentFormBlock' :
				addGCP2ServiceCard('external_payment_form', w, h, v, p, a);
				break;
			case 'GCPServiceCardPushNotificationsBlock' :
				addGCP2ServiceCard('push_notification_service', w, h, v, p, a);
				break;
			case 'GCPServiceCardScheduledTasksBlock' :
				addGCP2ServiceCard('scheduled_tasks', w, h, v, p, a);
				break;
			case 'GCPServiceCardServiceDiscoveryBlock' :
				addGCP2ServiceCard('service_discovery', w, h, v, p, a);
				break;
			case 'GCPServiceCardSquidProxyBlock' :
				addGCP2ServiceCard('squid_proxy', w, h, v, p, a);
				break;
			case 'GCPServiceCardTaskQueuesBlock' :
				addGCP2ServiceCard('task_queues', w, h, v, p, a);
				break;
			case 'GCPServiceCardVirtualFileSystemBlock' :
				addGCP2ServiceCard('virtual_file_system', w, h, v, p, a);
				break;
			case 'GCPServiceCardVPNGatewayBlock' :
				addGCP2ServiceCard('gateway', w, h, v, p, a);
				break;
				
			case 'GCPInputDatabase' :
				addGCP2UserDeviceCard('database', 1, 0.9, w, h, v, p, a);
				break;
			case 'GCPInputRecord' :
				addGCP2UserDeviceCard('record', 1, 0.66, w, h, v, p, a);
				break;
			case 'GCPInputPayment' :
				addGCP2UserDeviceCard('payment', 1, 0.8, w, h, v, p, a);
				break;
			case 'GCPInputGateway' :
				addGCP2UserDeviceCard('gateway_icon', 1, 0.44, w, h, v, p, a);
				break;
			case 'GCPInputLocalCompute' :
				addGCP2UserDeviceCard('compute_engine_icon', 1, 0.89, w, h, v, p, a);
				break;
			case 'GCPInputBeacon' :
				addGCP2UserDeviceCard('beacon', 0.73, 1, w, h, v, p, a);
				break;
			case 'GCPInputStorage' :
				addGCP2UserDeviceCard('storage', 1, 0.8, w, h, v, p, a);
				break;
			case 'GCPInputList' :
				addGCP2UserDeviceCard('list', 0.89, 1, w, h, v, p, a);
				break;
			case 'GCPInputStream' :
				addGCP2UserDeviceCard('stream', 1, 0.82, w, h, v, p, a);
				break;
			case 'GCPInputMobileDevices' :
				addGCP2UserDeviceCard('mobile_devices', 1, 0.73, w, h, v, p, a);
				break;
			case 'GCPInputCircuitBoard' :
				addGCP2UserDeviceCard('circuit_board', 1, 0.9, w, h, v, p, a);
				break;
			case 'GCPInputLive' :
				addGCP2UserDeviceCard('live', 0.74, 1, w, h, v, p, a);
				break;
			case 'GCPInputUsers' :
				addGCP2UserDeviceCard('users', 1, 0.63, w, h, v, p, a);
				break;
			case 'GCPInputLaptop' :
				addGCP2UserDeviceCard('laptop', 1, 0.66, w, h, v, p, a);
				break;
			case 'GCPInputApplication' :
				addGCP2UserDeviceCard('application', 1, 0.8, w, h, v, p, a);
				break;
			case 'GCPInputLightbulb' :
				addGCP2UserDeviceCard('lightbulb', 0.7, 1, w, h, v, p, a);
				break;
			case 'GCPInputGame' :
				addGCP2UserDeviceCard('game', 1, 0.54, w, h, v, p, a);
				break;
			case 'GCPInputDesktop' :
				addGCP2UserDeviceCard('desktop', 1, 0.9, w, h, v, p, a);
				break;
			case 'GCPInputDesktopAndMobile' :
				addGCP2UserDeviceCard('desktop_and_mobile', 1, 0.66, w, h, v, p, a);
				break;
			case 'GCPInputWebcam' :
				addGCP2UserDeviceCard('webcam', 0.5, 1, w, h, v, p, a);
				break;
			case 'GCPInputSpeaker' :
				addGCP2UserDeviceCard('speaker', 0.7, 1, w, h, v, p, a);
				break;
			case 'GCPInputRetail' :
				addGCP2UserDeviceCard('retail', 1, 0.89, w, h, v, p, a);
				break;
			case 'GCPInputReport' :
				addGCP2UserDeviceCard('report', 1, 1, w, h, v, p, a);
				break;
			case 'GCPInputPhone' :
				addGCP2UserDeviceCard('phone', 0.64, 1, w, h, v, p, a);
				break;
			case 'GCPInputBlank' :
				addGCP2UserDeviceCard('transparent', 1, 1, w, h, v, p, a);
				break;
// no corresponding icons, only with shadows							
//			case 'GCPAppEngineProductCard' :
//				addGCP2ExpandedProductCard('compute.app_engine', 1, 1, w, h, v, p, a);
//				break;
//			case 'GCPCloudDataflowProductCard' :
//				addGCP2ExpandedProductCard('cloud_dataflow', 1, 1, w, h, v, p, a);
//				break;
//			case 'GCPCloudDataprocProductCard' :
//				addGCP2ExpandedProductCard('cloud_dataproc', 1, 1, w, h, v, p, a);
//				break;
//			case 'GCPComputeEngineProductCard' :
//				addGCP2ExpandedProductCard('compute_engine', 1, 1, w, h, v, p, a);
//				break;
//			case 'GCPContainerEngineProductCard' :
//				addGCP2ExpandedProductCard('compute_engine', 1, 1, w, h, v, p, a);
//				break;
			case 'PresentationFrameBlock' :
				if (p.ZOrder == 0) //These are hidden
				{
					v.style += 'strokeColor=none;fillColor=none;';
				}
				else
				{
					v.style += getLabelStyle(p.Text);
					v.value = convertText(p.Text);
					v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				}
				break;
			case 'SVGPathBlock2' :
				try
				{
					var strokeWidth = p.LineWidth;
					var strokeColor = p.LineColor;
					var fillColor = p.FillColor;
					
					var drawData = p.DrawData.Data;
					var svg = '<svg viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">';
					var imgUrlStyle = null;

					for (var i = 0; i < drawData.length; i++)
					{
						var dd = drawData[i];
						var path = dd.a;
						var sw = (dd.w == 'prop' || dd.w == null? strokeWidth : dd.w) / Math.min(w, h) * scale; //TODO Stroke width caclulationn needs review
						var sc = dd.s == 'prop' || dd.s == null? strokeColor : dd.s;
						var fc = dd.f == 'prop' || dd.f == null? fillColor : dd.f;
						
						if (typeof fc == 'object')
						{
							if (fc.url != null)
							{
								imgUrlStyle = 'shape=image;image=' + mapImgUrl(fc.url) + ';';
							}

							fc = Array.isArray(fc.cs)? fc.cs[0].c : fillColor; //Approximation TODO Handle it
						}
						
						svg += '<path d="' + path + '" fill="' + fc + '" stroke="' + sc + '" stroke-width="' + sw + '"/>';
					}
					
					svg += '</svg>';

					v.style = imgUrlStyle? imgUrlStyle : 'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=default;' +
						'verticalAlign=top;aspect=fixed;imageAspect=0;image=data:image/svg+xml,' + ((window.btoa) ? btoa(svg) : Base64.encode(svg, true)) + ';';
				}
				catch(e){}
				break;
			case 'BraceBlock':
			case 'BraceBlockRotated':
			case 'BracketBlock':
			case 'BracketBlockRotated':
				var bracketStyle = cls.indexOf('Bracket') == 0? 'size=0;arcSize=50;' : '';
				var sideStyle = addAllStyles(v.style, p, a, v, isLastLblHTML);
				var rotation = getRotation(p, a, v);
				v.style = 'group;' + rotation;
				var sideWidth = Math.min((rotation? w : h) * 0.14, 100);
				var left = new mxCell('', new mxGeometry(0, 0, sideWidth, h), 'shape=curlyBracket;rounded=1;' + bracketStyle + sideStyle);
				left.vertex = true;
				left.geometry.relative = true;
				var right = new mxCell('', new mxGeometry(1 - sideWidth / w, 0, sideWidth, h), 'shape=curlyBracket;rounded=1;flipH=1;' + bracketStyle + sideStyle);
				right.vertex = true;
				right.geometry.relative = true;
				
				v.insert(left);
				v.insert(right);
				break;
			case 'BPMNTextAnnotation':
			case 'NoteBlock':
				p.InsetMargin = null;
				v.value = convertText(p.Text);
				v.style = 'group;spacingLeft=8;align=left;spacing=0;strokeColor=none;';
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				
				if (v.style.indexOf('verticalAlign') < 0)
				{
					v.style += 'verticalAlign=middle;';
				}
				
				var side = new mxCell('', new mxGeometry(0, 0, 8, h), 'shape=partialRectangle;right=0;fillColor=none;');
				side.geometry.relative = true;
				side.vertex = true;
				side.style += addAllStyles(side.style, p, a, v, isLastLblHTML);
				
				v.insert(side);
				break;
			case 'VSMTimelineBlock':
			case 'TimelineBlock':
			//TODO Timeline shapes are postponed, this code is a work-in-progress
			/*	try
				{
					var daysMap = {
						'Sunday': 0,
						'Monday': 1,
						'Tuesday': 2,
						'Wednesday': 3,
						'Thursday': 4,
						'Friday': 5,
						'Saturday': 6
					};
					var isLine = p.TimelineType == 'lineTimeline';
					var startDate = new Date(p.StartDate);
					var endDate = new Date(p.FinishDate);
					var startOfWeek = daysMap[p.StartOfWeek];
					var startOfFiscY = new Date(p.StartOfFiscalYear);
					var timeUnit = p.TimeUnit;
					var showStartEnd = p.DisplayStartFinishDates;
					var showTickLbl = p.DisplayInterimDates;
					var startTick, inc;
					
					switch (timeUnit)
					{
						case 'second':
							startTick = inc = 1000;
						break;
						case 'minute':
							startTick = inc = 1000 * 60;
						break;
						case 'hour':
							startTick = inc = 1000 * 60 * 60;
						break;
						case 'day':
							startTick = inc = 1000 * 60 * 60 * 24;
						break;
						case 'week':
							var dayTillNextWeek = (7 - startDate.getDay() + startOfWeek) % 7;
							var nextWeek = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + dayTillNextWeek);
							startTick = nextWeek.getTime() - startDate.getTime();
							inc = 1000 * 60 * 60 * 24 * 7;
						break;
						case 'month':
							var nextMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
							startTick = nextMonth.getTime() - startDate.getTime();
							inc = 1000 * 60 * 60 * 24 * 30;
						break;
						case 'quarter':
							var monthToNextQtr = (12 - startDate.getMonth() + startOfFiscY.getMonth()) % 3;
							var nextQrt = new Date(startDate.getFullYear(), 
								startDate.getMonth() + (monthToNextQtr == 0 && startDate.getDate() >= startOfFiscY.getDate()? 3 : monthToNextQtr), startOfFiscY.getDate());
							startTick = nextQrt.getTime() - startDate.getTime();
							inc = 1000 * 60 * 60 * 24 * 90;
						break;
						case 'year':
							var nextYear = new Date(startDate.getFullYear() + 1, 0, 1);
							startTick = nextYear.getTime() - startDate.getTime();
							inc = 1000 * 60 * 60 * 24 * 365;
						break;
					}
					
					var diff = endDate.getTime() - startDate.getTime();
					var afterFirst = diff - startTick;
					var ticksCount = Math.round(afterFirst / inc);
					
					var startX = startTick/diff * w;
					var ldx = inc/diff * w;
					console.log(startX, ldx, ticksCount)
				}
				catch(e)
				{
					console.log(e); //Ignore
				}
				break;*/
			case 'TimelineMilestoneBlock':
			//	break;
			case 'TimelineIntervalBlock':
				LucidImporter.hasTimeLine = true;
				LucidImporter.hasUnknownShapes = true;
				break;
			case 'FreehandBlock':
				try
				{
					var rotation = getRotation(p, a, v);
					v.style = 'group;' + rotation;

					if (p.Stencil != null)
					{
						if (p.Stencil.id == null)
						{
							//Add a temporary stencil for embedded ones
							p.Stencil.id = '$$tmpId$$';
							addStencil(p.Stencil.id, p.Stencil);
						}
						
						var stencil = LucidImporter.stencilsMap[p.Stencil.id];
						var cx = -stencil.x / stencil.w, cy = -stencil.y / stencil.h;
						
						for (var i = 0; i < stencil.stencils.length; i++)
						{
							var shape = stencil.stencils[i];
							var cell = new mxCell('', new mxGeometry(cx, cy, w, h), 'shape=' + shape.shapeStencil + ';');
							var sfc = shape.FillColor, slc = shape.LineColor, slw = shape.LineWidth;
							
							if (shape.FillColor == 'prop')
							{
								shape.FillColor = p.FillColor;
							}
							
							if (shape.FillColor == null)
							{
								shape.FillColor = '#ffffff00'; //Transparent fillColor
							}
							
							if (shape.LineColor == 'prop')
							{
								shape.LineColor = p.LineColor;
							}
							
							if (shape.LineColor == null)
							{
								shape.LineColor = '#ffffff00'; //Transparent strokeColor
							}
							
							if (shape.LineWidth == 'prop')
							{
								shape.LineWidth = p.LineWidth;
							}
							//Add stencil styles
							cell.style += addAllStyles(cell.style, shape, a, cell, isLastLblHTML);
							// Restore shape properties
							shape.FillColor = sfc; shape.LineColor = slc; shape.LineWidth = slw;
							//Add other styles from parent
							var fc = p.FillColor, lc = p.LineColor, lw = p.LineWidth;
							p.FillColor = null; p.LineColor = null; p.LineWidth = null;
							cell.style += addAllStyles(cell.style, p, a, cell, isLastLblHTML);
							p.FillColor = fc; p.LineColor = lc; p.LineWidth = lw;
							cell.vertex = true;
							cell.geometry.relative = true;
							v.insert(cell);
						}
						
						var index = 0;
						var rotation = p.Rotation;
						
						while (p['t' + index])
						{
							var lblObj = p['t' + index];
							var txt = convertText(lblObj);
							
							if (txt)
							{
								var lbl = new mxCell(txt, new mxGeometry(0, 0, w, h), 'strokeColor=none;fillColor=none;overflow=visible;');
								p.Rotation = 0; //Disable rotation of the parent since it is captured in the srencil below
								lbl.style += addAllStyles(lbl.style, lblObj, a, lbl, isLastLblHTML);
								lbl.style += addAllStyles(lbl.style, p, a, lbl, isLastLblHTML);
								p.Rotation = rotation;
								
								if (stencil.text != null && stencil.text['t' + index] != null)
								{
									var gTxtObj = stencil.text['t' + index];
									gTxtObj.Rotation = rotation + (gTxtObj.rotation? gTxtObj.rotation : 0)
										+ (p['t' + index + '_TRotation']? p['t' + index + '_TRotation'] : 0)
										+ (p['t' + index + '_TAngle']? p['t' + index + '_TAngle'] : 0);
									lbl.style += addAllStyles(lbl.style, gTxtObj, a, lbl, isLastLblHTML);
									var lblGeo = lbl.geometry;
									
									if (gTxtObj.w)
									{
										lblGeo.width *= (gTxtObj.w / stencil.w);
									}									
									if (gTxtObj.h)
									{
										lblGeo.height *= (gTxtObj.h / stencil.h);
									}
									if (gTxtObj.x)
									{
										lblGeo.x = gTxtObj.x / stencil.w;
									}
									if (gTxtObj.y)
									{
										lblGeo.y = gTxtObj.y / stencil.h;
									}
									
									if (gTxtObj.fw)
									{
										lblGeo.width *= gTxtObj.fw * scale / w;
									}
									if (gTxtObj.fh)
									{
										lblGeo.height *= gTxtObj.fh * scale / h;
									}
									if (gTxtObj.fx)
									{
										lblGeo.x = (gTxtObj.fx > 0? 1 : 0) + gTxtObj.fx * scale / w;
									}
									if (gTxtObj.fy)
									{
										lblGeo.y = (gTxtObj.fy > 0? 1 : 0) + gTxtObj.fy * scale / h;
									}
								}
								
								lbl.vertex = true;
								lbl.geometry.relative = true;
								v.insert(lbl);
							}
							
							index++;						
						}
					}
					
					if (p.FillColor && p.FillColor.url)
					{
						var img = new mxCell('', new mxGeometry(0, 0, w, h), 'shape=image;html=1;');
						img.style += getImage({}, {}, p.FillColor.url);
						img.vertex = true;
						img.geometry.relative = true;
						v.insert(img);
					}
				}
				catch(e)
				{
					console.log('Freehand error', e);
				}
			break;
			case 'RightArrowBlock':
				var arrowSize = p.Head * h / w;
				v.style = 'shape=singleArrow;arrowWidth=' + (1 - p.Notch * 2) + ';arrowSize=' + arrowSize;
				v.value = convertText(p);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
			break;
			case 'DoubleArrowBlock':
				var arrowSize = p.Head * h / w;
				v.style = 'shape=doubleArrow;arrowWidth=' + (1 - p.Notch * 2) + ';arrowSize=' + arrowSize;
				v.value = convertText(p);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
			break;
			case 'VPCSubnet2017':
			case 'VirtualPrivateCloudContainer2017':
			case 'ElasticBeanStalkContainer2017':
			case 'EC2InstanceContents2017':
			case 'AWSCloudContainer2017':
			case 'CorporateDataCenterContainer2017':
				//all use the same code, just icon is different
				var iconStyle, iconW, iconH;
				
				switch(cls)
				{
					case 'VPCSubnet2017':
						iconStyle = 'shape=mxgraph.aws3.permissions;fillColor=#D9A741;';
						iconW = 30;
						iconH = 35;
					break;
					case 'VirtualPrivateCloudContainer2017':
						iconStyle = 'shape=mxgraph.aws3.virtual_private_cloud;fillColor=#F58536;';
						iconW = 52;
						iconH = 36;
					break;
					case 'ElasticBeanStalkContainer2017':
						iconStyle = 'shape=mxgraph.aws3.elastic_beanstalk;fillColor=#F58536;';
						iconW = 30;
						iconH = 41;
					break;
					case 'EC2InstanceContents2017':
						iconStyle = 'shape=mxgraph.aws3.instance;fillColor=#F58536;';
						iconW = 40;
						iconH = 41;
					break;
					case 'AWSCloudContainer2017':
						iconStyle = 'shape=mxgraph.aws3.cloud;fillColor=#F58536;';
						iconW = 52;
						iconH = 36;
					break;
					case 'CorporateDataCenterContainer2017':
						iconStyle = 'shape=mxgraph.aws3.corporate_data_center;fillColor=#7D7C7C;';
						iconW = 30;
						iconH = 42;
					break;
				}
				v.style = 'rounded=1;arcSize=10;dashed=0;verticalAlign=bottom;';
				v.value = convertText(p);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
				v.geometry.y += 20;
				v.geometry.height -= 20;
				var icon = new mxCell('', new mxGeometry(20, -20, iconW, iconH), iconStyle);
				icon.vertex = true;
				v.insert(icon);
			break;
			case 'FlexiblePolygonBlock':
				var parts = ["<shape strokewidth=\"inherit\"><foreground>"];
				parts.push("<path>");
				
				for (var j = 0; j < p.Vertices.length; j++)
				{
					var line = p.Vertices[j];
					
					if (j == 0)
					{
						parts.push("<move x=\"" + (line.x * 100) + "\" y=\"" + (line.y * 100) + "\"/>");
					}
					else
					{
						parts.push("<line x=\"" + (line.x * 100) + "\" y=\"" + (line.y * 100) + "\"/>");
					}
				}
				
				parts.push("</path>");
				parts.push("<fillstroke/>");
				parts.push("</foreground></shape>");
				v.style = 'shape=stencil(' + Graph.compress(parts.join('')) + ');';
				v.value = convertText(p);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
			break;
			case 'InfographicsBlock':
				var min = p.ShapeData_1.Value;
				var max = p.ShapeData_2.Value - min;
				var val = p.ShapeData_3.Value - min;
				var thickness = p.ShapeData_4.Value * w / 200; //Percentage of half of width
				var index = p.InternalStencilId == 'ProgressBar'? 4 : 5;
				var fillClr = p['ShapeData_' + index].Value;
				fillClr = fillClr == '=fillColor()'? p.FillColor : fillClr;
				var bkgClr = p['ShapeData_' + (index + 1)].Value;
				
				switch(p.InternalStencilId)
				{
					case 'ProgressDonut':
						v.style = 'shape=mxgraph.basic.donut;dx=' + thickness + ';strokeColor=none;fillColor=' + getColor(bkgClr) + ';' + getOpacity2(bkgClr, 'fillOpacity');
						v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
						var inner = new mxCell('', new mxGeometry(0, 0, w, h), 'shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=' + (val / max) + ';arcWidth=' + (thickness / w * 2) + 
										';strokeColor=none;fillColor=' + getColor(fillClr) + ';' + getOpacity2(fillClr, 'fillOpacity'));
						inner.style += addAllStyles(inner.style, p, a, inner, isLastLblHTML);
						inner.vertex = true;
						inner.geometry.relative = 1;
						v.insert(inner);
					break;
					case 'ProgressHalfDonut':
						//as a workaround do it as a circle
						v.geometry.height *= 2;
						v.geometry.rotate90(); //TODO fix shape rotation
						var angle = val / max / 2;
						v.style = 'shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=' + angle + ';arcWidth=' + (thickness * 2 / w) + 
										';strokeColor=none;fillColor=' + getColor(fillClr) + ';' + getOpacity2(fillClr, 'fillOpacity')
						
						p.Rotation -= Math.PI / 2;
						v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
						var inner = new mxCell('', new mxGeometry(0, 0, v.geometry.width, v.geometry.height), 'shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=' + (0.5 - angle) + ';arcWidth=' + (thickness * 2 / w) + 
										';strokeColor=none;flipH=1;fillColor=' + getColor(bkgClr) + ';' + getOpacity2(bkgClr, 'fillOpacity'));
						p.Rotation += Math.PI;
						inner.style += addAllStyles(inner.style, p, a, inner, isLastLblHTML);
						inner.vertex = true;
						inner.geometry.relative = 1;
						v.insert(inner);
					break;
					case 'ProgressBar':
						v.style = 'strokeColor=none;fillColor=' + getColor(bkgClr) + ';' + getOpacity2(bkgClr, 'fillOpacity');
						v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
						var inner = new mxCell('', new mxGeometry(0, 0, w * val / max, h), 'strokeColor=none;fillColor=' + getColor(fillClr) + ';' + getOpacity2(fillClr, 'fillOpacity'));
						inner.style += addAllStyles(inner.style, p, a, inner, isLastLblHTML);
						inner.vertex = true;
						inner.geometry.relative = 1;
						v.insert(inner);
					break;
				}
			break;
			case 'InternalStorageBlock': 
				v.style += 'shape=internalStorage;dx=10;dy=10';
				
				//Adjust left and top spacing to handle the shape
				if (p.Text && p.Text.m)
				{
					var m = p.Text.m, isMT = false, isIL = false;
	
					for (var i = 0; i < m.length; i++)
					{
						var currM = m[i];
						
						if (!isMT && currM.n == 'mt')
						{
							currM.v = 17 + (currM.v || 0);
							isMT = true;
						}
						else if (!isIL && currM.n == 'il')
						{
							currM.v = 17 + (currM.v || 0);
							isIL = true;
						}
					}

					if (!isMT)
					{
						m.push({
							"s": 0,
                            "n": "mt",
                            "v": 17
						});
					}
					
					if (!isIL)
					{
						m.push({
							"s": 0,
                            "n": "il",
                            "v": 17
						});
					}
				}
				
				v.value = convertText(p);
				v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
			break;
			case 'PersonRoleBlock' :
				try
				{
					var st = getFillColor(p, a);
					var th = h/2;
					st = st.replace('fillColor', 'swimlaneFillColor');
					
					if (st == '')
					{
						st = 'swimlaneFillColor=#ffffff;'
					}
				
					v.value = convertText(p.Role);
					v.style += 'swimlane;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;' + st +
						'startSize=' + th + ';spacingLeft=3;spacingRight=3;fontStyle=0;' +
						getLabelStyle(p.Role, isLastLblHTML);
					v.style += addAllStyles(v.style, p, a, v, isLastLblHTML);
					
					var name = new mxCell('', new mxGeometry(0, h/2, w, h/2), 'part=1;html=1;resizeHeight=0;spacingTop=-1;spacingLeft=3;spacingRight=3;');
					name.value = convertText(p.Name);
					name.vertex = true;
					v.insert(name);
					name.style += getLabelStyle(p.Name, isLastLblHTML);
					name.style += addAllStyles(name.style, p, a, name, isLastLblHTML);
				}
				catch(e)
				{
					//Ignore
					console.log(e);
				}
			break;
		}

		if (v.style && v.style.indexOf('html') < 0)
		{
			v.style += 'html=1;';
		}
		
		if (p.Title && p.Title.t && p.Text && p.Text.t)
		{
			try
			{
				var geo = v.geometry;
				var title = new mxCell(convertText(p.Title), new mxGeometry(0, geo.height + 4,geo.width, 10), 
								'strokeColor=none;fillColor=none;whiteSpace=wrap;verticalAlign=top;labelPosition=center;verticalLabelPosition=top;align=center;');
				title.vertex = true;
				v.insert(title);
				v.style += getLabelStyle(p.Title, isLastLblHTML);
			}
			catch(e)
			{
				console.log(e);
			}
		}
				
		handleTextRotation(v, p);
		addCustomData(v, p, graph);
		
		if (p.Hidden)
		{
			v.visible = false;
		}
		
	    return v;
	};
	
	function handleTextRotation(v, p)
	{
		if (p.Text_TRotation || p.TextRotation)
		{
			try
			{
				var deg = mxUtils.toDegree(p.Text_TRotation || 0) +  mxUtils.toDegree(p.TextRotation || 0);
				
				if (!isNaN(deg) && deg != 0 && v.value)
				{
					var w = v.geometry.width, h = v.geometry.height;
					var lblW = w, lblH = h, x = 0, y = 0;
					
					if (deg == -90 || deg == -270)
					{
						lblW = h;
						lblH = w;
						var diff = (h - w) / 2;
						x = -diff / w;
						y = diff/ h;
					}
					
					deg += mxUtils.toDegree(p.Rotation);
					
					//Remove fill and stroke colors + rotation from vertex style
					var style = v.style.split(';').filter(function(s)
					{
						return s.indexOf('fillColor=') < 0 && s.indexOf('strokeColor=') < 0 && s.indexOf('rotation=') < 0;
					}).join(';');
					
					var lbl = new mxCell(v.value, new mxGeometry(x, y, lblW, lblH), style + 'fillColor=none;strokeColor=none;rotation=' + deg + ';');
					v.value = null;
					lbl.geometry.relative = true;
					lbl.vertex = true;
					v.insert(lbl);
				}
			}
			catch(e)
			{
				console.log(e); //Ignore
			}
		}
	};
	
	function createOrgChart(objId, props, data, graph, lookup)
	{
		function getLineTxtStyle(cellDefaultStyle, fieldName)
		{
			var style = '';
			
			try
			{
				for (var i = 0; i < cellDefaultStyle.text.length; i++)
				{
					var item = cellDefaultStyle.text[i];
					
					if (item[0] == 't_' + fieldName)
					{
						for (var key in item[1])
						{
							var val = item[1][key];
							
							if (!val) continue;
							
							switch(key)
							{
								case 'font':
									style += mapFontFamily(val);
								break;
								case 'bold':
									style += 'font-weight: bold;';
								break;
								case 'italic':
									style += 'font-style: italic;';
								break;
								case 'underline':
									style += 'text-decoration: underline;';
								break;
								case 'size':
									style += 'font-size:' + fix1Digit(val * scale) + 'px;';
								break;
								case 'color':
									style += 'color:' + rgbToHex(val).substring(0, 7) + ';';
								break;
								case 'fill':
									style += 'background-color:' + rgbToHex(val).substring(0, 7) + ';';
								break;
								case 'align':
									style += 'text-align:' + val + ';';
								break;
							}
						}
						
						break;
					}
				}
			}
			catch(e){}
			
			return style;
		};
		
		try
		{
			//TODO Cell specific styles and chartType defaults
			var defImg = 'https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/user-account-profile-human-avatar-face-head--128.png';
			var chartType = props.OrgChartBlockType;
			var pos = props.Location;
			var x = pos.x * scale, y = pos.y * scale;
			var chartGroup = new mxCell('', new mxGeometry(x, y, 200, 100), 'group');
			chartGroup.vertex = true;
			graph.addCell(chartGroup);
			var fields = props.FieldNames;
			var layoutSettings = props.LayoutSettings;
			var cellDefaultStyle = props.BlockItemDefaultStyle || {props: {}};
			var edgeDefaultStyle = props.EdgeItemDefaultStyle;
			var parents = {};
			var idPrefix = (objId || Date.now()) + '_';
			
			if (chartType == 4)
			{
				cellDefaultStyle.props.LineWidth = 0;
			}
			
			var txtStyles = [], marginW = 25, marginH = 40, imgSize = 54, hasImage = true, cellStyle = addAllStyles('', cellDefaultStyle.props, {}, chartGroup, true);
			
			if (chartType == 0) //Image top-center
			{
				cellStyle += 'spacingTop=' + imgSize + ';imageWidth=' + imgSize + ';imageHeight=' + imgSize + ';imageAlign=center;imageVerticalAlign=top;image=';
				marginH += imgSize;
			}
			else if (chartType == 1 || chartType == 2) //Image to top-left (or outsize top-left which we don't support)
			{
				cellStyle += 'spacingLeft=' + imgSize + ';imageWidth=' + (imgSize - 4) + ';imageHeight=' + (imgSize - 4) + ';imageAlign=left;imageVerticalAlign=top;image=';
				marginW += imgSize;
			}
			else if (chartType >= 3)
			{
				hasImage = false;
			}
			
			for (var j = 0; j < fields.length; j++)
			{
				txtStyles.push(getLineTxtStyle(cellDefaultStyle, fields[j]));
			}
			
			function createNode(pk, pId, dObj)
			{
				var id = idPrefix + pk;
				parents[id] = pId;
				var lbl = '';
				
				for (var j = 0; j < fields.length; j++)
				{
					lbl += '<div style="' + txtStyles[j] + '">' + 
						(dObj[fields[j]] || '&nbsp;') + '</div>';
				}
				
				var size = mxUtils.getSizeForString(lbl);
				//TODO Is image always in Image/018__ImageUrl__?
				var imgUrl = mapImgUrl(dObj['Image'] || dObj['018__ImageUrl__']) || defImg;
								
				var cell = new mxCell(lbl, new mxGeometry(0, 0, size.width + marginW, size.height + marginH), 
									cellStyle + (hasImage? imgUrl : ''));
			    cell.vertex = true;
				lookup[id] = cell;
				graph.addCell(cell, chartGroup);	
			};
			
			if (data.Items)
			{
				var chartDataSrc = data.Items.n;
				
				for (var i = 0; i < chartDataSrc.length; i++)
				{
					var d = chartDataSrc[i];
					createNode(d.pk, d.ie[0]? d.ie[0].nf : null, d.f);
				}
			}
			else
			{
				var dataId, derivative = props.ContractMap.derivative;

	 			if (derivative == null)
				{
					//We don't have enough samples of this format, TODO improve this
					var people = props.ContractMap.c.People;
					dataId = people.id;
					dataId = dataId.substr(0, dataId.lastIndexOf('_'));
					
					for (var j = 0; j < fields.length; j++)
					{
						fields[j] = people.f[fields[j]] || fields[j];
					}
				}
				else
				{
					for (var i = 0; i < derivative.length; i++)
					{
						if (derivative[i].type == 'ForeignKeyGraph')
						{
							dataId = derivative[i].c[0].id;
							dataId = dataId.substr(0, dataId.lastIndexOf('_'));
						}
						else if (derivative[i].type == 'MappedGraph')
						{
							for (var j = 0; j < fields.length; j++)
							{
								fields[j] = derivative[i].nfs[fields[j]] || fields[j];
							}
						}
					}
				}
				
				var chartDataSrc, foreignKey, primaryKey;
				
				for (var key in data)
				{
					var d = data[key].Collections;
					
					for (var key2 in d)
					{
						if (key2 == dataId)
						{
							chartDataSrc = d[key2].Items;
						}
						else if (d[key2].Properties.ForeignKeys && d[key2].Properties.ForeignKeys[0])
						{
							foreignKey = d[key2].Properties.ForeignKeys[0].SourceFields[0];
							primaryKey = d[key2].Properties.Schema.PrimaryKey[0];
						}
					}
					
					if (chartDataSrc)
					{
						break;
					}
				}
				
				var dupMap = {};
				
				for (var id in chartDataSrc)
				{
					var d = chartDataSrc[id];
					var pk = d[primaryKey], fk = d[foreignKey];
					
					//Special case where these nodes has duplicate id and should be connected somehow!
					if (pk == fk)
					{
						dupMap[pk] = pk + Date.now();
						pk = dupMap[pk];
						d[primaryKey] = pk;
						createNode(pk, fk, d);
					}
					else
					{
						createNode(pk, dupMap[fk] || fk, d);
					}
				}
			}
			
			for (var key in parents)
			{
				var p = parents[key];
				
				if (p != null)
				{
					var src = lookup[idPrefix + p];
					var trg = lookup[key];
					
					if (src != null && trg != null)
					{
						var e = new mxCell('', new mxGeometry(0, 0, 100, 100), '');
						e.geometry.relative = true;
						e.edge = true;
						
						if (edgeDefaultStyle != null && edgeDefaultStyle.props != null)
						{
							updateCell(e, edgeDefaultStyle.props, graph, null, null, true);
						}
						
						graph.addCell(e, chartGroup, null, src, trg);
					}
				}
			}

			//TODO Support other layout options like LayoutType
			var levelSps = layoutSettings.NodeSpacing.LevelSeparation * scale;
			var orgChartLayout = new mxOrgChartLayout(graph, 0, levelSps, layoutSettings.NodeSpacing.NeighborSeparation * scale);
			orgChartLayout.execute(chartGroup);
			
			//Find out the group size and
			var maxX = 0, maxY = 0;
			
			for (var i = 0; chartGroup.children && i < chartGroup.children.length; i++)
			{
				var geo = chartGroup.children[i].geometry;
				maxX = Math.max(maxX, geo.x + geo.width);
				maxY = Math.max(maxY, geo.y + geo.height); 
			}
			
			var gGeo = chartGroup.geometry;
			gGeo.y -= levelSps; //Our org chart layout leave a space on top
			gGeo.width = maxX;
			gGeo.height = maxY;
		}
		catch(e)
		{
			LucidImporter.hasUnknownShapes = true;
			LucidImporter.hasOrgChart = true;
			console.log(e);
		}
	};
})();
