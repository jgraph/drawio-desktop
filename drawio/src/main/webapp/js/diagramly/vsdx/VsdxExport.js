/**
 * Export mxFile as Vsdx file
 */
function VsdxExport(editorUi)
{
	var that = this;
	
	var vsdxCanvas = new mxVsdxCanvas2D();
	
	var idsMap = {};
	var idsCounter = 1;
	/**
	 * Fill the required files in vsdx format which are constants in our exporter
	 * @param zip JSZip of vsdx file
	 * @param pageCount The number of pages in the mxFile
	 */
	function createVsdxSkeleton(zip, pageCount)
	{
		var files = {
			"[Content_Types].xml": "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Types xmlns='http://schemas.openxmlformats.org/package/2006/content-types'><Default Extension='png' ContentType='image/png'/><Default Extension='jpg' ContentType='image/jpeg'/><Default Extension='jpeg' ContentType='image/jpeg'/><Default Extension='svg' ContentType='image/svg+xml'/><Default Extension='bmp' ContentType='image/bmp'/><Default Extension='gif' ContentType='image/gif'/><Default Extension='emf' ContentType='image/x-emf' /><Default Extension='rels' ContentType='application/vnd.openxmlformats-package.relationships+xml' /><Default Extension='xml' ContentType='application/xml' /><Override PartName='/docProps/app.xml' ContentType='application/vnd.openxmlformats-officedocument.extended-properties+xml' /><Override PartName='/docProps/core.xml' ContentType='application/vnd.openxmlformats-package.core-properties+xml' /><Override PartName='/docProps/custom.xml' ContentType='application/vnd.openxmlformats-officedocument.custom-properties+xml' /><Override PartName='/visio/document.xml' ContentType='application/vnd.ms-visio.drawing.main+xml' /><Override PartName='/visio/masters/masters.xml' ContentType='application/vnd.ms-visio.masters+xml' /><Override PartName='/visio/masters/master1.xml' ContentType='application/vnd.ms-visio.master+xml'/><Override PartName='/visio/pages/page1.xml' ContentType='application/vnd.ms-visio.page+xml' /><Override PartName='/visio/pages/pages.xml' ContentType='application/vnd.ms-visio.pages+xml' /><Override PartName='/visio/windows.xml' ContentType='application/vnd.ms-visio.windows+xml' /></Types>",
			"_rels/.rels" : "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Relationships xmlns='http://schemas.openxmlformats.org/package/2006/relationships'><Relationship Id='rId1' Type='http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties' Target='docProps/core.xml' /><Relationship Id='rId2' Type='http://schemas.microsoft.com/visio/2010/relationships/document' Target='visio/document.xml' /><Relationship Id='rId3' Type='http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties' Target='docProps/custom.xml' /><Relationship Id='rId4' Type='http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties' Target='docProps/app.xml' /></Relationships>",
			"docProps/app.xml" :  "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Properties xmlns='http://schemas.openxmlformats.org/officeDocument/2006/extended-properties' xmlns:vt='http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes'><Application>Microsoft Visio</Application><AppVersion>15.0000</AppVersion><Template /><Manager /><Company /><HyperlinkBase /></Properties>",
			"docProps/core.xml" : "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><cp:coreProperties xmlns:cp='http://schemas.openxmlformats.org/package/2006/metadata/core-properties' xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:dcterms='http://purl.org/dc/terms/' xmlns:dcmitype='http://purl.org/dc/dcmitype/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'><dc:title /><dc:subject /><dc:creator /><cp:keywords /><dc:description /><cp:category /><dc:language>en-US</dc:language></cp:coreProperties>",
			"docProps/custom.xml" : "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Properties xmlns='http://schemas.openxmlformats.org/officeDocument/2006/custom-properties' xmlns:vt='http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes' />",
			"visio/document.xml": "<?xml version='1.0' encoding='utf-8' ?><VisioDocument xmlns='http://schemas.microsoft.com/office/visio/2012/main' xmlns:r='http://schemas.openxmlformats.org/officeDocument/2006/relationships' xml:space='preserve'><DocumentSettings TopPage='0' DefaultTextStyle='3' DefaultLineStyle='3' DefaultFillStyle='3' DefaultGuideStyle='4'><GlueSettings>9</GlueSettings><SnapSettings>65847</SnapSettings><SnapExtensions>34</SnapExtensions><SnapAngles/><DynamicGridEnabled>1</DynamicGridEnabled><ProtectStyles>0</ProtectStyles><ProtectShapes>0</ProtectShapes><ProtectMasters>0</ProtectMasters><ProtectBkgnds>0</ProtectBkgnds></DocumentSettings><Colors><ColorEntry IX='24' RGB='#000000'/><ColorEntry IX='25' RGB='#FFFFFF'/><ColorEntry IX='26' RGB='#FF0000'/><ColorEntry IX='27' RGB='#00FF00'/><ColorEntry IX='28' RGB='#0000FF'/><ColorEntry IX='29' RGB='#FFFF00'/><ColorEntry IX='30' RGB='#FF00FF'/><ColorEntry IX='31' RGB='#00FFFF'/><ColorEntry IX='32' RGB='#800000'/><ColorEntry IX='33' RGB='#008000'/><ColorEntry IX='34' RGB='#000080'/><ColorEntry IX='35' RGB='#808000'/><ColorEntry IX='36' RGB='#800080'/><ColorEntry IX='37' RGB='#008080'/><ColorEntry IX='38' RGB='#C0C0C0'/><ColorEntry IX='39' RGB='#E6E6E6'/><ColorEntry IX='40' RGB='#CDCDCD'/><ColorEntry IX='41' RGB='#B3B3B3'/><ColorEntry IX='42' RGB='#9A9A9A'/><ColorEntry IX='43' RGB='#808080'/><ColorEntry IX='44' RGB='#666666'/><ColorEntry IX='45' RGB='#4D4D4D'/><ColorEntry IX='46' RGB='#333333'/><ColorEntry IX='47' RGB='#1A1A1A'/><ColorEntry IX='48' RGB='#7F7F7F'/><ColorEntry IX='49' RGB='#99004D'/><ColorEntry IX='50' RGB='#FF0080'/><ColorEntry IX='51' RGB='#CC0066'/></Colors><FaceNames><FaceName NameU='Calibri' UnicodeRanges='-536859905 -1073732485 9 0' CharSets='536871423 0' Panose='2 15 5 2 2 2 4 3 2 4' Flags='325'/></FaceNames><StyleSheets><StyleSheet ID='0' NameU='No Style' IsCustomNameU='1' Name='No Style' IsCustomName='1'><Cell N='EnableLineProps' V='1'/><Cell N='EnableFillProps' V='1'/><Cell N='EnableTextProps' V='1'/><Cell N='HideForApply' V='0'/><Cell N='LineWeight' V='0.01041666666666667'/><Cell N='LineColor' V='0'/><Cell N='LinePattern' V='1'/><Cell N='Rounding' V='0'/><Cell N='EndArrowSize' V='2'/><Cell N='BeginArrow' V='0'/><Cell N='EndArrow' V='0'/><Cell N='LineCap' V='0'/><Cell N='BeginArrowSize' V='2'/><Cell N='LineColorTrans' V='0'/><Cell N='CompoundType' V='0'/><Cell N='FillForegnd' V='1'/><Cell N='FillBkgnd' V='0'/><Cell N='FillPattern' V='1'/><Cell N='ShdwForegnd' V='0'/><Cell N='ShdwPattern' V='0'/><Cell N='FillForegndTrans' V='0'/><Cell N='FillBkgndTrans' V='0'/><Cell N='ShdwForegndTrans' V='0'/><Cell N='ShapeShdwType' V='0'/><Cell N='ShapeShdwOffsetX' V='0'/><Cell N='ShapeShdwOffsetY' V='0'/><Cell N='ShapeShdwObliqueAngle' V='0'/><Cell N='ShapeShdwScaleFactor' V='1'/><Cell N='ShapeShdwBlur' V='0'/><Cell N='ShapeShdwShow' V='0'/><Cell N='LeftMargin' V='0'/><Cell N='RightMargin' V='0'/><Cell N='TopMargin' V='0'/><Cell N='BottomMargin' V='0'/><Cell N='VerticalAlign' V='1'/><Cell N='TextBkgnd' V='0'/><Cell N='DefaultTabStop' V='0.5'/><Cell N='TextDirection' V='0'/><Cell N='TextBkgndTrans' V='0'/><Cell N='LockWidth' V='0'/><Cell N='LockHeight' V='0'/><Cell N='LockMoveX' V='0'/><Cell N='LockMoveY' V='0'/><Cell N='LockAspect' V='0'/><Cell N='LockDelete' V='0'/><Cell N='LockBegin' V='0'/><Cell N='LockEnd' V='0'/><Cell N='LockRotate' V='0'/><Cell N='LockCrop' V='0'/><Cell N='LockVtxEdit' V='0'/><Cell N='LockTextEdit' V='0'/><Cell N='LockFormat' V='0'/><Cell N='LockGroup' V='0'/><Cell N='LockCalcWH' V='0'/><Cell N='LockSelect' V='0'/><Cell N='LockCustProp' V='0'/><Cell N='LockFromGroupFormat' V='0'/><Cell N='LockThemeColors' V='0'/><Cell N='LockThemeEffects' V='0'/><Cell N='LockThemeConnectors' V='0'/><Cell N='LockThemeFonts' V='0'/><Cell N='LockThemeIndex' V='0'/><Cell N='LockReplace' V='0'/><Cell N='LockVariation' V='0'/><Cell N='NoObjHandles' V='0'/><Cell N='NonPrinting' V='0'/><Cell N='NoCtlHandles' V='0'/><Cell N='NoAlignBox' V='0'/><Cell N='UpdateAlignBox' V='0'/><Cell N='HideText' V='0'/><Cell N='DynFeedback' V='0'/><Cell N='GlueType' V='0'/><Cell N='WalkPreference' V='0'/><Cell N='BegTrigger' V='0' F='No Formula'/><Cell N='EndTrigger' V='0' F='No Formula'/><Cell N='ObjType' V='0'/><Cell N='Comment' V=''/><Cell N='IsDropSource' V='0'/><Cell N='NoLiveDynamics' V='0'/><Cell N='LocalizeMerge' V='0'/><Cell N='NoProofing' V='0'/><Cell N='Calendar' V='0'/><Cell N='LangID' V='en-US'/><Cell N='ShapeKeywords' V=''/><Cell N='DropOnPageScale' V='1'/><Cell N='TheData' V='0' F='No Formula'/><Cell N='TheText' V='0' F='No Formula'/><Cell N='EventDblClick' V='0' F='No Formula'/><Cell N='EventXFMod' V='0' F='No Formula'/><Cell N='EventDrop' V='0' F='No Formula'/><Cell N='EventMultiDrop' V='0' F='No Formula'/><Cell N='HelpTopic' V=''/><Cell N='Copyright' V=''/><Cell N='LayerMember' V=''/><Cell N='XRulerDensity' V='32'/><Cell N='YRulerDensity' V='32'/><Cell N='XRulerOrigin' V='0'/><Cell N='YRulerOrigin' V='0'/><Cell N='XGridDensity' V='8'/><Cell N='YGridDensity' V='8'/><Cell N='XGridSpacing' V='0'/><Cell N='YGridSpacing' V='0'/><Cell N='XGridOrigin' V='0'/><Cell N='YGridOrigin' V='0'/><Cell N='Gamma' V='1'/><Cell N='Contrast' V='0.5'/><Cell N='Brightness' V='0.5'/><Cell N='Sharpen' V='0'/><Cell N='Blur' V='0'/><Cell N='Denoise' V='0'/><Cell N='Transparency' V='0'/><Cell N='SelectMode' V='1'/><Cell N='DisplayMode' V='2'/><Cell N='IsDropTarget' V='0'/><Cell N='IsSnapTarget' V='1'/><Cell N='IsTextEditTarget' V='1'/><Cell N='DontMoveChildren' V='0'/><Cell N='ShapePermeableX' V='0'/><Cell N='ShapePermeableY' V='0'/><Cell N='ShapePermeablePlace' V='0'/><Cell N='Relationships' V='0'/><Cell N='ShapeFixedCode' V='0'/><Cell N='ShapePlowCode' V='0'/><Cell N='ShapeRouteStyle' V='0'/><Cell N='ShapePlaceStyle' V='0'/><Cell N='ConFixedCode' V='0'/><Cell N='ConLineJumpCode' V='0'/><Cell N='ConLineJumpStyle' V='0'/><Cell N='ConLineJumpDirX' V='0'/><Cell N='ConLineJumpDirY' V='0'/><Cell N='ShapePlaceFlip' V='0'/><Cell N='ConLineRouteExt' V='0'/><Cell N='ShapeSplit' V='0'/><Cell N='ShapeSplittable' V='0'/><Cell N='DisplayLevel' V='0'/><Cell N='ResizePage' V='0'/><Cell N='EnableGrid' V='0'/><Cell N='DynamicsOff' V='0'/><Cell N='CtrlAsInput' V='0'/><Cell N='AvoidPageBreaks' V='0'/><Cell N='PlaceStyle' V='0'/><Cell N='RouteStyle' V='0'/><Cell N='PlaceDepth' V='0'/><Cell N='PlowCode' V='0'/><Cell N='LineJumpCode' V='1'/><Cell N='LineJumpStyle' V='0'/><Cell N='PageLineJumpDirX' V='0'/><Cell N='PageLineJumpDirY' V='0'/><Cell N='LineToNodeX' V='0.125'/><Cell N='LineToNodeY' V='0.125'/><Cell N='BlockSizeX' V='0.25'/><Cell N='BlockSizeY' V='0.25'/><Cell N='AvenueSizeX' V='0.375'/><Cell N='AvenueSizeY' V='0.375'/><Cell N='LineToLineX' V='0.125'/><Cell N='LineToLineY' V='0.125'/><Cell N='LineJumpFactorX' V='0.66666666666667'/><Cell N='LineJumpFactorY' V='0.66666666666667'/><Cell N='LineAdjustFrom' V='0'/><Cell N='LineAdjustTo' V='0'/><Cell N='PlaceFlip' V='0'/><Cell N='LineRouteExt' V='0'/><Cell N='PageShapeSplit' V='0'/><Cell N='PageLeftMargin' V='0.25'/><Cell N='PageRightMargin' V='0.25'/><Cell N='PageTopMargin' V='0.25'/><Cell N='PageBottomMargin' V='0.25'/><Cell N='ScaleX' V='1'/><Cell N='ScaleY' V='1'/><Cell N='PagesX' V='1'/><Cell N='PagesY' V='1'/><Cell N='CenterX' V='0'/><Cell N='CenterY' V='0'/><Cell N='OnPage' V='0'/><Cell N='PrintGrid' V='0'/><Cell N='PrintPageOrientation' V='1'/><Cell N='PaperKind' V='1'/><Cell N='PaperSource' V='7'/><Cell N='QuickStyleLineColor' V='100'/><Cell N='QuickStyleFillColor' V='100'/><Cell N='QuickStyleShadowColor' V='100'/><Cell N='QuickStyleFontColor' V='100'/><Cell N='QuickStyleLineMatrix' V='100'/><Cell N='QuickStyleFillMatrix' V='100'/><Cell N='QuickStyleEffectsMatrix' V='100'/><Cell N='QuickStyleFontMatrix' V='100'/><Cell N='QuickStyleType' V='0'/><Cell N='QuickStyleVariation' V='0'/><Cell N='LineGradientDir' V='0'/><Cell N='LineGradientAngle' V='1.5707963267949'/><Cell N='FillGradientDir' V='0'/><Cell N='FillGradientAngle' V='1.5707963267949'/><Cell N='LineGradientEnabled' V='0'/><Cell N='FillGradientEnabled' V='0'/><Cell N='RotateGradientWithShape' V='1'/><Cell N='UseGroupGradient' V='0'/><Cell N='BevelTopType' V='0'/><Cell N='BevelTopWidth' V='0'/><Cell N='BevelTopHeight' V='0'/><Cell N='BevelBottomType' V='0'/><Cell N='BevelBottomWidth' V='0'/><Cell N='BevelBottomHeight' V='0'/><Cell N='BevelDepthColor' V='1'/><Cell N='BevelDepthSize' V='0'/><Cell N='BevelContourColor' V='0'/><Cell N='BevelContourSize' V='0'/><Cell N='BevelMaterialType' V='0'/><Cell N='BevelLightingType' V='0'/><Cell N='BevelLightingAngle' V='0'/><Cell N='RotationXAngle' V='0'/><Cell N='RotationYAngle' V='0'/><Cell N='RotationZAngle' V='0'/><Cell N='RotationType' V='0'/><Cell N='Perspective' V='0'/><Cell N='DistanceFromGround' V='0'/><Cell N='KeepTextFlat' V='0'/><Cell N='ReflectionTrans' V='0'/><Cell N='ReflectionSize' V='0'/><Cell N='ReflectionDist' V='0'/><Cell N='ReflectionBlur' V='0'/><Cell N='GlowColor' V='1'/><Cell N='GlowColorTrans' V='0'/><Cell N='GlowSize' V='0'/><Cell N='SoftEdgesSize' V='0'/><Cell N='SketchSeed' V='0'/><Cell N='SketchEnabled' V='0'/><Cell N='SketchAmount' V='5'/><Cell N='SketchLineWeight' V='0.04166666666666666' U='PT'/><Cell N='SketchLineChange' V='0.14'/><Cell N='SketchFillChange' V='0.1'/><Cell N='ColorSchemeIndex' V='0'/><Cell N='EffectSchemeIndex' V='0'/><Cell N='ConnectorSchemeIndex' V='0'/><Cell N='FontSchemeIndex' V='0'/><Cell N='ThemeIndex' V='0'/><Cell N='VariationColorIndex' V='0'/><Cell N='VariationStyleIndex' V='0'/><Cell N='EmbellishmentIndex' V='0'/><Cell N='ReplaceLockShapeData' V='0'/><Cell N='ReplaceLockText' V='0'/><Cell N='ReplaceLockFormat' V='0'/><Cell N='ReplaceCopyCells' V='0' U='BOOL' F='No Formula'/><Cell N='PageWidth' V='0' F='No Formula'/><Cell N='PageHeight' V='0' F='No Formula'/><Cell N='ShdwOffsetX' V='0' F='No Formula'/><Cell N='ShdwOffsetY' V='0' F='No Formula'/><Cell N='PageScale' V='0' U='IN_F' F='No Formula'/><Cell N='DrawingScale' V='0' U='IN_F' F='No Formula'/><Cell N='DrawingSizeType' V='0' F='No Formula'/><Cell N='DrawingScaleType' V='0' F='No Formula'/><Cell N='InhibitSnap' V='0' F='No Formula'/><Cell N='PageLockReplace' V='0' U='BOOL' F='No Formula'/><Cell N='PageLockDuplicate' V='0' U='BOOL' F='No Formula'/><Cell N='UIVisibility' V='0' F='No Formula'/><Cell N='ShdwType' V='0' F='No Formula'/><Cell N='ShdwObliqueAngle' V='0' F='No Formula'/><Cell N='ShdwScaleFactor' V='0' F='No Formula'/><Cell N='DrawingResizeType' V='0' F='No Formula'/><Section N='Character'><Row IX='0'><Cell N='Font' V='Calibri'/><Cell N='Color' V='0'/><Cell N='Style' V='0'/><Cell N='Case' V='0'/><Cell N='Pos' V='0'/><Cell N='FontScale' V='1'/><Cell N='Size' V='0.1666666666666667'/><Cell N='DblUnderline' V='0'/><Cell N='Overline' V='0'/><Cell N='Strikethru' V='0'/><Cell N='DoubleStrikethrough' V='0'/><Cell N='Letterspace' V='0'/><Cell N='ColorTrans' V='0'/><Cell N='AsianFont' V='0'/><Cell N='ComplexScriptFont' V='0'/><Cell N='ComplexScriptSize' V='-1'/><Cell N='LangID' V='en-US'/></Row></Section><Section N='Paragraph'><Row IX='0'><Cell N='IndFirst' V='0'/><Cell N='IndLeft' V='0'/><Cell N='IndRight' V='0'/><Cell N='SpLine' V='-1.2'/><Cell N='SpBefore' V='0'/><Cell N='SpAfter' V='0'/><Cell N='HorzAlign' V='1'/><Cell N='Bullet' V='0'/><Cell N='BulletStr' V=''/><Cell N='BulletFont' V='0'/><Cell N='BulletFontSize' V='-1'/><Cell N='TextPosAfterBullet' V='0'/><Cell N='Flags' V='0'/></Row></Section><Section N='Tabs'><Row IX='0'/></Section><Section N='LineGradient'><Row IX='0'><Cell N='GradientStopColor' V='1'/><Cell N='GradientStopColorTrans' V='0'/><Cell N='GradientStopPosition' V='0'/></Row></Section><Section N='FillGradient'><Row IX='0'><Cell N='GradientStopColor' V='1'/><Cell N='GradientStopColorTrans' V='0'/><Cell N='GradientStopPosition' V='0'/></Row></Section></StyleSheet><StyleSheet ID='1' NameU='Text Only' IsCustomNameU='1' Name='Text Only' IsCustomName='1' LineStyle='3' FillStyle='3' TextStyle='3'><Cell N='EnableLineProps' V='1'/><Cell N='EnableFillProps' V='1'/><Cell N='EnableTextProps' V='1'/><Cell N='HideForApply' V='0'/><Cell N='LineWeight' V='Themed' F='Inh'/><Cell N='LineColor' V='Themed' F='Inh'/><Cell N='LinePattern' V='Themed' F='Inh'/><Cell N='Rounding' V='Themed' F='Inh'/><Cell N='EndArrowSize' V='2' F='Inh'/><Cell N='BeginArrow' V='0' F='Inh'/><Cell N='EndArrow' V='0' F='Inh'/><Cell N='LineCap' V='Themed' F='Inh'/><Cell N='BeginArrowSize' V='2' F='Inh'/><Cell N='LineColorTrans' V='Themed' F='Inh'/><Cell N='CompoundType' V='Themed' F='Inh'/><Cell N='FillForegnd' V='Themed' F='Inh'/><Cell N='FillBkgnd' V='Themed' F='Inh'/><Cell N='FillPattern' V='Themed' F='Inh'/><Cell N='ShdwForegnd' V='Themed' F='Inh'/><Cell N='ShdwPattern' V='Themed' F='Inh'/><Cell N='FillForegndTrans' V='Themed' F='Inh'/><Cell N='FillBkgndTrans' V='Themed' F='Inh'/><Cell N='ShdwForegndTrans' V='Themed' F='Inh'/><Cell N='ShapeShdwType' V='Themed' F='Inh'/><Cell N='ShapeShdwOffsetX' V='Themed' F='Inh'/><Cell N='ShapeShdwOffsetY' V='Themed' F='Inh'/><Cell N='ShapeShdwObliqueAngle' V='Themed' F='Inh'/><Cell N='ShapeShdwScaleFactor' V='Themed' F='Inh'/><Cell N='ShapeShdwBlur' V='Themed' F='Inh'/><Cell N='ShapeShdwShow' V='0' F='Inh'/><Cell N='LeftMargin' V='0'/><Cell N='RightMargin' V='0'/><Cell N='TopMargin' V='0'/><Cell N='BottomMargin' V='0'/><Cell N='VerticalAlign' V='0'/><Cell N='TextBkgnd' V='0'/><Cell N='DefaultTabStop' V='0.5' F='Inh'/><Cell N='TextDirection' V='0' F='Inh'/><Cell N='TextBkgndTrans' V='0' F='Inh'/><Cell N='LineGradientDir' V='Themed' F='Inh'/><Cell N='LineGradientAngle' V='Themed' F='Inh'/><Cell N='FillGradientDir' V='Themed' F='Inh'/><Cell N='FillGradientAngle' V='Themed' F='Inh'/><Cell N='LineGradientEnabled' V='Themed' F='Inh'/><Cell N='FillGradientEnabled' V='Themed' F='Inh'/><Cell N='RotateGradientWithShape' V='Themed' F='Inh'/><Cell N='UseGroupGradient' V='Themed' F='Inh'/><Section N='Paragraph'><Row IX='0'><Cell N='IndFirst' V='0' F='Inh'/><Cell N='IndLeft' V='0' F='Inh'/><Cell N='IndRight' V='0' F='Inh'/><Cell N='SpLine' V='-1.2' F='Inh'/><Cell N='SpBefore' V='0' F='Inh'/><Cell N='SpAfter' V='0' F='Inh'/><Cell N='HorzAlign' V='0'/><Cell N='Bullet' V='0' F='Inh'/><Cell N='BulletStr' V='' F='Inh'/><Cell N='BulletFont' V='0' F='Inh'/><Cell N='BulletFontSize' V='-1' F='Inh'/><Cell N='TextPosAfterBullet' V='0' F='Inh'/><Cell N='Flags' V='0' F='Inh'/></Row></Section></StyleSheet><StyleSheet ID='2' NameU='None' IsCustomNameU='1' Name='None' IsCustomName='1' LineStyle='3' FillStyle='3' TextStyle='3'><Cell N='EnableLineProps' V='1'/><Cell N='EnableFillProps' V='1'/><Cell N='EnableTextProps' V='1'/><Cell N='HideForApply' V='0'/><Cell N='LineWeight' V='Themed' F='Inh'/><Cell N='LineColor' V='Themed' F='Inh'/><Cell N='LinePattern' V='0'/><Cell N='Rounding' V='Themed' F='Inh'/><Cell N='EndArrowSize' V='2' F='Inh'/><Cell N='BeginArrow' V='0' F='Inh'/><Cell N='EndArrow' V='0' F='Inh'/><Cell N='LineCap' V='Themed' F='Inh'/><Cell N='BeginArrowSize' V='2' F='Inh'/><Cell N='LineColorTrans' V='Themed' F='Inh'/><Cell N='CompoundType' V='Themed' F='Inh'/><Cell N='FillForegnd' V='Themed' F='Inh'/><Cell N='FillBkgnd' V='Themed' F='Inh'/><Cell N='FillPattern' V='0'/><Cell N='ShdwForegnd' V='Themed' F='Inh'/><Cell N='ShdwPattern' V='Themed' F='Inh'/><Cell N='FillForegndTrans' V='Themed' F='Inh'/><Cell N='FillBkgndTrans' V='Themed' F='Inh'/><Cell N='ShdwForegndTrans' V='Themed' F='Inh'/><Cell N='ShapeShdwType' V='Themed' F='Inh'/><Cell N='ShapeShdwOffsetX' V='Themed' F='Inh'/><Cell N='ShapeShdwOffsetY' V='Themed' F='Inh'/><Cell N='ShapeShdwObliqueAngle' V='Themed' F='Inh'/><Cell N='ShapeShdwScaleFactor' V='Themed' F='Inh'/><Cell N='ShapeShdwBlur' V='Themed' F='Inh'/><Cell N='ShapeShdwShow' V='0' F='Inh'/><Cell N='LineGradientDir' V='Themed' F='Inh'/><Cell N='LineGradientAngle' V='Themed' F='Inh'/><Cell N='FillGradientDir' V='Themed' F='Inh'/><Cell N='FillGradientAngle' V='Themed' F='Inh'/><Cell N='LineGradientEnabled' V='0'/><Cell N='FillGradientEnabled' V='0'/><Cell N='RotateGradientWithShape' V='Themed' F='Inh'/><Cell N='UseGroupGradient' V='Themed' F='Inh'/><Cell N='QuickStyleLineColor' V='100' F='Inh'/><Cell N='QuickStyleFillColor' V='100' F='Inh'/><Cell N='QuickStyleShadowColor' V='100' F='Inh'/><Cell N='QuickStyleFontColor' V='100' F='Inh'/><Cell N='QuickStyleLineMatrix' V='100' F='Inh'/><Cell N='QuickStyleFillMatrix' V='100' F='Inh'/><Cell N='QuickStyleEffectsMatrix' V='0' F='GUARD(0)'/><Cell N='QuickStyleFontMatrix' V='100' F='Inh'/><Cell N='QuickStyleType' V='0' F='Inh'/><Cell N='QuickStyleVariation' V='2'/></StyleSheet><StyleSheet ID='3' NameU='Normal' IsCustomNameU='1' Name='Normal' IsCustomName='1' LineStyle='6' FillStyle='6' TextStyle='6'><Cell N='EnableLineProps' V='1'/><Cell N='EnableFillProps' V='1'/><Cell N='EnableTextProps' V='1'/><Cell N='HideForApply' V='0'/><Cell N='LeftMargin' V='0.05555555555555555' U='PT'/><Cell N='RightMargin' V='0.05555555555555555' U='PT'/><Cell N='TopMargin' V='0.05555555555555555' U='PT'/><Cell N='BottomMargin' V='0.05555555555555555' U='PT'/><Cell N='VerticalAlign' V='1' F='Inh'/><Cell N='TextBkgnd' V='0' F='Inh'/><Cell N='DefaultTabStop' V='0.5' F='Inh'/><Cell N='TextDirection' V='0' F='Inh'/><Cell N='TextBkgndTrans' V='0' F='Inh'/></StyleSheet><StyleSheet ID='4' NameU='Guide' IsCustomNameU='1' Name='Guide' IsCustomName='1' LineStyle='3' FillStyle='3' TextStyle='3'><Cell N='EnableLineProps' V='1'/><Cell N='EnableFillProps' V='1'/><Cell N='EnableTextProps' V='1'/><Cell N='HideForApply' V='0'/><Cell N='LineWeight' V='0' U='PT'/><Cell N='LineColor' V='#7f7f7f'/><Cell N='LinePattern' V='23'/><Cell N='Rounding' V='Themed' F='Inh'/><Cell N='EndArrowSize' V='2' F='Inh'/><Cell N='BeginArrow' V='0' F='Inh'/><Cell N='EndArrow' V='0' F='Inh'/><Cell N='LineCap' V='Themed' F='Inh'/><Cell N='BeginArrowSize' V='2' F='Inh'/><Cell N='LineColorTrans' V='Themed' F='Inh'/><Cell N='CompoundType' V='Themed' F='Inh'/><Cell N='FillForegnd' V='Themed' F='Inh'/><Cell N='FillBkgnd' V='Themed' F='Inh'/><Cell N='FillPattern' V='0'/><Cell N='ShdwForegnd' V='Themed' F='Inh'/><Cell N='ShdwPattern' V='Themed' F='Inh'/><Cell N='FillForegndTrans' V='Themed' F='Inh'/><Cell N='FillBkgndTrans' V='Themed' F='Inh'/><Cell N='ShdwForegndTrans' V='Themed' F='Inh'/><Cell N='ShapeShdwType' V='Themed' F='Inh'/><Cell N='ShapeShdwOffsetX' V='Themed' F='Inh'/><Cell N='ShapeShdwOffsetY' V='Themed' F='Inh'/><Cell N='ShapeShdwObliqueAngle' V='Themed' F='Inh'/><Cell N='ShapeShdwScaleFactor' V='Themed' F='Inh'/><Cell N='ShapeShdwBlur' V='Themed' F='Inh'/><Cell N='ShapeShdwShow' V='0' F='Inh'/><Cell N='LineGradientDir' V='Themed' F='Inh'/><Cell N='LineGradientAngle' V='Themed' F='Inh'/><Cell N='FillGradientDir' V='Themed' F='Inh'/><Cell N='FillGradientAngle' V='Themed' F='Inh'/><Cell N='LineGradientEnabled' V='0'/><Cell N='FillGradientEnabled' V='0'/><Cell N='RotateGradientWithShape' V='Themed' F='Inh'/><Cell N='UseGroupGradient' V='Themed' F='Inh'/><Cell N='LeftMargin' V='0.05555555555555555' U='PT' F='Inh'/><Cell N='RightMargin' V='0.05555555555555555' U='PT' F='Inh'/><Cell N='TopMargin' V='0'/><Cell N='BottomMargin' V='0'/><Cell N='VerticalAlign' V='2'/><Cell N='TextBkgnd' V='0' F='Inh'/><Cell N='DefaultTabStop' V='0.5' F='Inh'/><Cell N='TextDirection' V='0' F='Inh'/><Cell N='TextBkgndTrans' V='0' F='Inh'/><Cell N='NoObjHandles' V='0' F='Inh'/><Cell N='NonPrinting' V='1'/><Cell N='NoCtlHandles' V='0' F='Inh'/><Cell N='NoAlignBox' V='0' F='Inh'/><Cell N='UpdateAlignBox' V='0' F='Inh'/><Cell N='HideText' V='0' F='Inh'/><Cell N='DynFeedback' V='0' F='Inh'/><Cell N='GlueType' V='0' F='Inh'/><Cell N='WalkPreference' V='0' F='Inh'/><Cell N='BegTrigger' V='0' F='No Formula'/><Cell N='EndTrigger' V='0' F='No Formula'/><Cell N='ObjType' V='0' F='Inh'/><Cell N='Comment' V='' F='Inh'/><Cell N='IsDropSource' V='0' F='Inh'/><Cell N='NoLiveDynamics' V='0' F='Inh'/><Cell N='LocalizeMerge' V='0' F='Inh'/><Cell N='NoProofing' V='0' F='Inh'/><Cell N='Calendar' V='0' F='Inh'/><Cell N='LangID' V='en-US' F='Inh'/><Cell N='ShapeKeywords' V='' F='Inh'/><Cell N='DropOnPageScale' V='1' F='Inh'/><Cell N='ShapePermeableX' V='1'/><Cell N='ShapePermeableY' V='1'/><Cell N='ShapePermeablePlace' V='1'/><Cell N='Relationships' V='0' F='Inh'/><Cell N='ShapeFixedCode' V='0' F='Inh'/><Cell N='ShapePlowCode' V='0' F='Inh'/><Cell N='ShapeRouteStyle' V='0' F='Inh'/><Cell N='ShapePlaceStyle' V='0' F='Inh'/><Cell N='ConFixedCode' V='0' F='Inh'/><Cell N='ConLineJumpCode' V='0' F='Inh'/><Cell N='ConLineJumpStyle' V='0' F='Inh'/><Cell N='ConLineJumpDirX' V='0' F='Inh'/><Cell N='ConLineJumpDirY' V='0' F='Inh'/><Cell N='ShapePlaceFlip' V='0' F='Inh'/><Cell N='ConLineRouteExt' V='0' F='Inh'/><Cell N='ShapeSplit' V='0' F='Inh'/><Cell N='ShapeSplittable' V='0' F='Inh'/><Cell N='DisplayLevel' V='0' F='Inh'/><Section N='Character'><Row IX='0'><Cell N='Font' V='Themed' F='Inh'/><Cell N='Color' V='4'/><Cell N='Style' V='Themed' F='Inh'/><Cell N='Case' V='0' F='Inh'/><Cell N='Pos' V='0' F='Inh'/><Cell N='FontScale' V='1' F='Inh'/><Cell N='Size' V='0.125'/><Cell N='DblUnderline' V='0' F='Inh'/><Cell N='Overline' V='0' F='Inh'/><Cell N='Strikethru' V='0' F='Inh'/><Cell N='DoubleStrikethrough' V='0' F='Inh'/><Cell N='Letterspace' V='0' F='Inh'/><Cell N='ColorTrans' V='0' F='Inh'/><Cell N='AsianFont' V='Themed' F='Inh'/><Cell N='ComplexScriptFont' V='Themed' F='Inh'/><Cell N='ComplexScriptSize' V='-1' F='Inh'/><Cell N='LangID' V='en-US' F='Inh'/></Row></Section></StyleSheet><StyleSheet ID='6' NameU='Theme' IsCustomNameU='1' Name='Theme' IsCustomName='1' LineStyle='0' FillStyle='0' TextStyle='0'><Cell N='EnableLineProps' V='1'/><Cell N='EnableFillProps' V='1'/><Cell N='EnableTextProps' V='1'/><Cell N='HideForApply' V='0'/><Cell N='LineWeight' V='Themed' F='THEMEVAL()'/><Cell N='LineColor' V='Themed' F='THEMEVAL()'/><Cell N='LinePattern' V='Themed' F='THEMEVAL()'/><Cell N='Rounding' V='Themed' F='THEMEVAL()'/><Cell N='EndArrowSize' V='2' F='Inh'/><Cell N='BeginArrow' V='0' F='Inh'/><Cell N='EndArrow' V='0' F='Inh'/><Cell N='LineCap' V='Themed' F='THEMEVAL()'/><Cell N='BeginArrowSize' V='2' F='Inh'/><Cell N='LineColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='CompoundType' V='Themed' F='THEMEVAL()'/><Cell N='FillForegnd' V='Themed' F='THEMEVAL()'/><Cell N='FillBkgnd' V='Themed' F='THEMEVAL()'/><Cell N='FillPattern' V='Themed' F='THEMEVAL()'/><Cell N='ShdwForegnd' V='Themed' F='THEMEVAL()'/><Cell N='ShdwPattern' V='Themed' F='THEMEVAL()'/><Cell N='FillForegndTrans' V='Themed' F='THEMEVAL()'/><Cell N='FillBkgndTrans' V='Themed' F='THEMEVAL()'/><Cell N='ShdwForegndTrans' V='Themed' F='THEMEVAL()'/><Cell N='ShapeShdwType' V='Themed' F='THEMEVAL()'/><Cell N='ShapeShdwOffsetX' V='Themed' F='THEMEVAL()'/><Cell N='ShapeShdwOffsetY' V='Themed' F='THEMEVAL()'/><Cell N='ShapeShdwObliqueAngle' V='Themed' F='THEMEVAL()'/><Cell N='ShapeShdwScaleFactor' V='Themed' F='THEMEVAL()'/><Cell N='ShapeShdwBlur' V='Themed' F='THEMEVAL()'/><Cell N='ShapeShdwShow' V='0' F='Inh'/><Cell N='LineGradientDir' V='Themed' F='THEMEVAL()'/><Cell N='LineGradientAngle' V='Themed' F='THEMEVAL()'/><Cell N='FillGradientDir' V='Themed' F='THEMEVAL()'/><Cell N='FillGradientAngle' V='Themed' F='THEMEVAL()'/><Cell N='LineGradientEnabled' V='Themed' F='THEMEVAL()'/><Cell N='FillGradientEnabled' V='Themed' F='THEMEVAL()'/><Cell N='RotateGradientWithShape' V='Themed' F='THEMEVAL()'/><Cell N='UseGroupGradient' V='Themed' F='THEMEVAL()'/><Cell N='BevelTopType' V='Themed' F='THEMEVAL()'/><Cell N='BevelTopWidth' V='Themed' F='THEMEVAL()'/><Cell N='BevelTopHeight' V='Themed' F='THEMEVAL()'/><Cell N='BevelBottomType' V='0' F='Inh'/><Cell N='BevelBottomWidth' V='0' F='Inh'/><Cell N='BevelBottomHeight' V='0' F='Inh'/><Cell N='BevelDepthColor' V='1' F='Inh'/><Cell N='BevelDepthSize' V='0' F='Inh'/><Cell N='BevelContourColor' V='Themed' F='THEMEVAL()'/><Cell N='BevelContourSize' V='Themed' F='THEMEVAL()'/><Cell N='BevelMaterialType' V='Themed' F='THEMEVAL()'/><Cell N='BevelLightingType' V='Themed' F='THEMEVAL()'/><Cell N='BevelLightingAngle' V='Themed' F='THEMEVAL()'/><Cell N='ReflectionTrans' V='Themed' F='THEMEVAL()'/><Cell N='ReflectionSize' V='Themed' F='THEMEVAL()'/><Cell N='ReflectionDist' V='Themed' F='THEMEVAL()'/><Cell N='ReflectionBlur' V='Themed' F='THEMEVAL()'/><Cell N='GlowColor' V='Themed' F='THEMEVAL()'/><Cell N='GlowColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GlowSize' V='Themed' F='THEMEVAL()'/><Cell N='SoftEdgesSize' V='Themed' F='THEMEVAL()'/><Cell N='SketchSeed' V='0' F='Inh'/><Cell N='SketchEnabled' V='Themed' F='THEMEVAL()'/><Cell N='SketchAmount' V='Themed' F='THEMEVAL()'/><Cell N='SketchLineWeight' V='Themed' F='THEMEVAL()'/><Cell N='SketchLineChange' V='Themed' F='THEMEVAL()'/><Cell N='SketchFillChange' V='Themed' F='THEMEVAL()'/><Cell N='QuickStyleLineColor' V='100'/><Cell N='QuickStyleFillColor' V='100'/><Cell N='QuickStyleShadowColor' V='100'/><Cell N='QuickStyleFontColor' V='100'/><Cell N='QuickStyleLineMatrix' V='100'/><Cell N='QuickStyleFillMatrix' V='100'/><Cell N='QuickStyleEffectsMatrix' V='100'/><Cell N='QuickStyleFontMatrix' V='100'/><Cell N='QuickStyleType' V='0' F='Inh'/><Cell N='QuickStyleVariation' V='0' F='Inh'/><Cell N='ColorSchemeIndex' V='65534'/><Cell N='EffectSchemeIndex' V='65534'/><Cell N='ConnectorSchemeIndex' V='65534'/><Cell N='FontSchemeIndex' V='65534'/><Cell N='ThemeIndex' V='65534'/><Cell N='VariationColorIndex' V='65534'/><Cell N='VariationStyleIndex' V='65534'/><Cell N='EmbellishmentIndex' V='65534'/><Section N='Character'><Row IX='0'><Cell N='Font' V='Themed' F='THEMEVAL()'/><Cell N='Color' V='Themed' F='THEMEVAL()'/><Cell N='Style' V='Themed' F='THEMEVAL()'/><Cell N='Case' V='0' F='Inh'/><Cell N='Pos' V='0' F='Inh'/><Cell N='FontScale' V='1' F='Inh'/><Cell N='Size' V='0.1666666666666667' F='Inh'/><Cell N='DblUnderline' V='0' F='Inh'/><Cell N='Overline' V='0' F='Inh'/><Cell N='Strikethru' V='0' F='Inh'/><Cell N='DoubleStrikethrough' V='0' F='Inh'/><Cell N='Letterspace' V='0' F='Inh'/><Cell N='ColorTrans' V='0' F='Inh'/><Cell N='AsianFont' V='Themed' F='THEMEVAL()'/><Cell N='ComplexScriptFont' V='Themed' F='THEMEVAL()'/><Cell N='ComplexScriptSize' V='-1' F='Inh'/><Cell N='LangID' V='en-US' F='Inh'/></Row></Section><Section N='FillGradient'><Row IX='0'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='1'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='2'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='3'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='4'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='5'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='6'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='7'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='8'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='9'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row></Section><Section N='LineGradient'><Row IX='0'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='1'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='2'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='3'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='4'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='5'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='6'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='7'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='8'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row><Row IX='9'><Cell N='GradientStopColor' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopColorTrans' V='Themed' F='THEMEVAL()'/><Cell N='GradientStopPosition' V='Themed' F='THEMEVAL()'/></Row></Section></StyleSheet><StyleSheet ID='7' NameU='Connector' IsCustomNameU='1' Name='Connector' IsCustomName='1' LineStyle='3' FillStyle='3' TextStyle='3'><Cell N='EnableLineProps' V='1'/><Cell N='EnableFillProps' V='1'/><Cell N='EnableTextProps' V='1'/><Cell N='HideForApply' V='0'/><Cell N='LeftMargin' V='0.05555555555555555' U='PT' F='Inh'/><Cell N='RightMargin' V='0.05555555555555555' U='PT' F='Inh'/><Cell N='TopMargin' V='0.05555555555555555' U='PT' F='Inh'/><Cell N='BottomMargin' V='0.05555555555555555' U='PT' F='Inh'/><Cell N='VerticalAlign' V='1' F='Inh'/><Cell N='TextBkgnd' V='#ffffff' F='THEMEGUARD(THEMEVAL(\"BackgroundColor\")+1)'/><Cell N='DefaultTabStop' V='0.5' F='Inh'/><Cell N='TextDirection' V='0' F='Inh'/><Cell N='TextBkgndTrans' V='0' F='Inh'/><Cell N='NoObjHandles' V='0' F='Inh'/><Cell N='NonPrinting' V='0' F='Inh'/><Cell N='NoCtlHandles' V='0' F='Inh'/><Cell N='NoAlignBox' V='0' F='Inh'/><Cell N='UpdateAlignBox' V='0' F='Inh'/><Cell N='HideText' V='0' F='Inh'/><Cell N='DynFeedback' V='0' F='Inh'/><Cell N='GlueType' V='0' F='Inh'/><Cell N='WalkPreference' V='0' F='Inh'/><Cell N='BegTrigger' V='0' F='No Formula'/><Cell N='EndTrigger' V='0' F='No Formula'/><Cell N='ObjType' V='0' F='Inh'/><Cell N='Comment' V='' F='Inh'/><Cell N='IsDropSource' V='0' F='Inh'/><Cell N='NoLiveDynamics' V='0' F='Inh'/><Cell N='LocalizeMerge' V='0' F='Inh'/><Cell N='NoProofing' V='0' F='Inh'/><Cell N='Calendar' V='0' F='Inh'/><Cell N='LangID' V='en-US' F='Inh'/><Cell N='ShapeKeywords' V='' F='Inh'/><Cell N='DropOnPageScale' V='1' F='Inh'/><Cell N='QuickStyleLineColor' V='100'/><Cell N='QuickStyleFillColor' V='100'/><Cell N='QuickStyleShadowColor' V='100'/><Cell N='QuickStyleFontColor' V='100'/><Cell N='QuickStyleLineMatrix' V='1'/><Cell N='QuickStyleFillMatrix' V='1'/><Cell N='QuickStyleEffectsMatrix' V='1'/><Cell N='QuickStyleFontMatrix' V='1'/><Cell N='QuickStyleType' V='0'/><Cell N='QuickStyleVariation' V='0'/><Cell N='LineWeight' V='Themed' F='Inh'/><Cell N='LineColor' V='Themed' F='Inh'/><Cell N='LinePattern' V='Themed' F='Inh'/><Cell N='Rounding' V='Themed' F='Inh'/><Cell N='EndArrowSize' V='Themed' F='THEMEVAL()'/><Cell N='BeginArrow' V='Themed' F='THEMEVAL()'/><Cell N='EndArrow' V='Themed' F='THEMEVAL()'/><Cell N='LineCap' V='Themed' F='Inh'/><Cell N='BeginArrowSize' V='Themed' F='THEMEVAL()'/><Cell N='LineColorTrans' V='Themed' F='Inh'/><Cell N='CompoundType' V='Themed' F='Inh'/><Section N='Character'><Row IX='0'><Cell N='Font' V='Themed' F='Inh'/><Cell N='Color' V='Themed' F='Inh'/><Cell N='Style' V='Themed' F='Inh'/><Cell N='Case' V='0' F='Inh'/><Cell N='Pos' V='0' F='Inh'/><Cell N='FontScale' V='1' F='Inh'/><Cell N='Size' V='0.1111111111111111'/><Cell N='DblUnderline' V='0' F='Inh'/><Cell N='Overline' V='0' F='Inh'/><Cell N='Strikethru' V='0' F='Inh'/><Cell N='DoubleStrikethrough' V='0' F='Inh'/><Cell N='Letterspace' V='0' F='Inh'/><Cell N='ColorTrans' V='0' F='Inh'/><Cell N='AsianFont' V='Themed' F='Inh'/><Cell N='ComplexScriptFont' V='Themed' F='Inh'/><Cell N='ComplexScriptSize' V='-1' F='Inh'/><Cell N='LangID' V='en-US' F='Inh'/></Row></Section></StyleSheet></StyleSheets><DocumentSheet NameU='TheDoc' IsCustomNameU='1' Name='TheDoc' IsCustomName='1' LineStyle='0' FillStyle='0' TextStyle='0'><Cell N='OutputFormat' V='0'/><Cell N='LockPreview' V='0'/><Cell N='AddMarkup' V='0'/><Cell N='ViewMarkup' V='0'/><Cell N='DocLockReplace' V='0' U='BOOL'/><Cell N='NoCoauth' V='0' U='BOOL'/><Cell N='DocLockDuplicatePage' V='0' U='BOOL'/><Cell N='PreviewQuality' V='0'/><Cell N='PreviewScope' V='0'/><Cell N='DocLangID' V='en-US'/><Section N='User'><Row N='msvNoAutoConnect'><Cell N='Value' V='1'/><Cell N='Prompt' V='' F='No Formula'/></Row></Section></DocumentSheet></VisioDocument>",
			"visio/windows.xml" : "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Windows ClientWidth='0' ClientHeight='0' xmlns='http://schemas.microsoft.com/office/visio/2012/main' xmlns:r='http://schemas.openxmlformats.org/officeDocument/2006/relationships' xml:space='preserve' />",
			"visio/_rels/document.xml.rels" : "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Relationships xmlns='http://schemas.openxmlformats.org/package/2006/relationships'><Relationship Id='rId1' Type='http://schemas.microsoft.com/visio/2010/relationships/masters' Target='masters/masters.xml' /><Relationship Id='rId2' Type='http://schemas.microsoft.com/visio/2010/relationships/pages' Target='pages/pages.xml' /><Relationship Id='rId3' Type='http://schemas.microsoft.com/visio/2010/relationships/windows' Target='windows.xml' /></Relationships>",
			"visio/masters/_rels/masters.xml.rels" : '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.microsoft.com/visio/2010/relationships/master" Target="master1.xml"/></Relationships>',
			"visio/masters/masters.xml" : "<?xml version='1.0' encoding='utf-8' ?><Masters xmlns='http://schemas.microsoft.com/office/visio/2012/main' xmlns:r='http://schemas.openxmlformats.org/officeDocument/2006/relationships' xml:space='preserve'><Master ID='4' NameU='Dynamic connector' IsCustomNameU='1' Name='Dynamic connector' IsCustomName='1' Prompt='This connector automatically routes between the shapes it connects.' IconSize='1' AlignName='2' MatchByName='1' IconUpdate='0' UniqueID='{002A9108-0000-0000-8E40-00608CF305B2}' BaseID='{F7290A45-E3AD-11D2-AE4F-006008C9F5A9}' PatternFlags='0' Hidden='0' MasterType='0'><PageSheet LineStyle='0' FillStyle='0' TextStyle='0'><Cell N='PageWidth' V='3'/><Cell N='PageHeight' V='3'/><Cell N='ShdwOffsetX' V='0.125'/><Cell N='ShdwOffsetY' V='-0.125'/><Cell N='PageScale' V='1' U='IN_F'/><Cell N='DrawingScale' V='1' U='IN_F'/><Cell N='DrawingSizeType' V='4'/><Cell N='DrawingScaleType' V='0'/><Cell N='InhibitSnap' V='0'/><Cell N='PageLockReplace' V='0' U='BOOL'/><Cell N='PageLockDuplicate' V='0' U='BOOL'/><Cell N='UIVisibility' V='0'/><Cell N='ShdwType' V='0'/><Cell N='ShdwObliqueAngle' V='0'/><Cell N='ShdwScaleFactor' V='1'/><Cell N='DrawingResizeType' V='0'/><Section N='Layer'><Row IX='0'><Cell N='Name' V='Connector'/><Cell N='Color' V='255'/><Cell N='Status' V='0'/><Cell N='Visible' V='1'/><Cell N='Print' V='1'/><Cell N='Active' V='0'/><Cell N='Lock' V='0'/><Cell N='Snap' V='1'/><Cell N='Glue' V='1'/><Cell N='NameUniv' V='Connector'/><Cell N='ColorTrans' V='0'/></Row></Section></PageSheet><Rel r:id='rId1'/></Master></Masters>",
			"visio/masters/master1.xml" : "<?xml version='1.0' encoding='utf-8' ?><MasterContents xmlns='http://schemas.microsoft.com/office/visio/2012/main' xmlns:r='http://schemas.openxmlformats.org/officeDocument/2006/relationships' xml:space='preserve'><Shapes><Shape ID='5' OriginalID='0' Type='Shape' LineStyle='7' FillStyle='7' TextStyle='7'><Cell N='PinX' V='1.5' F='GUARD((BeginX+EndX)/2)'/><Cell N='PinY' V='1.5' F='GUARD((BeginY+EndY)/2)'/><Cell N='Width' V='1' F='GUARD(EndX-BeginX)'/><Cell N='Height' V='-1' F='GUARD(EndY-BeginY)'/><Cell N='LocPinX' V='0.5' F='GUARD(Width*0.5)'/><Cell N='LocPinY' V='-0.5' F='GUARD(Height*0.5)'/><Cell N='Angle' V='0' F='GUARD(0DA)'/><Cell N='FlipX' V='0' F='GUARD(FALSE)'/><Cell N='FlipY' V='0' F='GUARD(FALSE)'/><Cell N='ResizeMode' V='0'/><Cell N='BeginX' V='1'/><Cell N='BeginY' V='2'/><Cell N='EndX' V='2'/><Cell N='EndY' V='1'/><Cell N='TxtPinX' V='0' F='SETATREF(Controls.TextPosition)'/><Cell N='TxtPinY' V='-1' F='SETATREF(Controls.TextPosition.Y)'/><Cell N='TxtWidth' V='0.5555555555555556' F='MAX(TEXTWIDTH(TheText),5*Char.Size)'/><Cell N='TxtHeight' V='0.2444444444444444' F='TEXTHEIGHT(TheText,TxtWidth)'/><Cell N='TxtLocPinX' V='0.2777777777777778' F='TxtWidth*0.5'/><Cell N='TxtLocPinY' V='0.1222222222222222' F='TxtHeight*0.5'/><Cell N='TxtAngle' V='0'/><Cell N='LockHeight' V='1'/><Cell N='LockCalcWH' V='1'/><Cell N='HelpTopic' V='Vis_SE.chm!#20000'/><Cell N='Copyright' V='Copyright 2001 Microsoft Corporation.  All rights reserved.'/><Cell N='NoAlignBox' V='1'/><Cell N='DynFeedback' V='2'/><Cell N='GlueType' V='2'/><Cell N='ObjType' V='2'/><Cell N='NoLiveDynamics' V='1'/><Cell N='ShapeSplittable' V='1'/><Cell N='LayerMember' V='0'/><Section N='Control'><Row N='TextPosition'><Cell N='X' V='0'/><Cell N='Y' V='-1'/><Cell N='XDyn' V='0' F='Controls.TextPosition'/><Cell N='YDyn' V='-1' F='Controls.TextPosition.Y'/><Cell N='XCon' V='5' F='IF(OR(STRSAME(SHAPETEXT(TheText),\"\"),HideText),5,0)'/><Cell N='YCon' V='0'/><Cell N='CanGlue' V='0'/><Cell N='Prompt' V='Reposition Text'/></Row></Section><Section N='Geometry' IX='0'><Cell N='NoFill' V='1'/><Cell N='NoLine' V='0'/><Cell N='NoShow' V='0'/><Cell N='NoSnap' V='0'/><Cell N='NoQuickDrag' V='0'/><Row T='MoveTo' IX='1'><Cell N='X' V='0'/><Cell N='Y' V='0'/></Row><Row T='LineTo' IX='2'><Cell N='X' V='0'/><Cell N='Y' V='-1'/></Row></Section></Shape></Shapes></MasterContents>"
		};
		  
		for (var id in files) 
		{
			if (pageCount > 1 && id == that.CONTENT_TYPES_XML) 
			{
				//Add the remaining pages
				var doc = mxUtils.parseXml(files[id]);
				var root = doc.documentElement;
				
				var children = root.children;
				var page1 = null;
		
				for (var i = 0; i < children.length; i++)
				{
					var child = children[i];
					if ("/visio/pages/page1.xml" == child.getAttribute(that.PART_NAME))
					{
						page1 = child;
					}
				}
				
				for (var i = 2; i <= pageCount; i++)
				{
					var newPage = page1.cloneNode();
		    		newPage.setAttribute(that.PART_NAME, "/visio/pages/page" + i + ".xml");
		    		root.appendChild(newPage);
		    	}
			    	
		    	writeXmlDoc2Zip(zip, id, doc, true);
		    }
		    else 
		    {
			    zip.file(id, files[id]);
		    }
	    }
	};
	
	function createElt(doc, ns, name)
	{
		return (doc.createElementNS != null) ? doc.createElementNS(ns, name) : doc.createElement(name);
	};

	function getCellVsdxId(cellId)
	{
		var vsdxId = idsMap[cellId];
		
		if (vsdxId == null)
		{
			vsdxId = idsCounter++;
			idsMap[cellId] = vsdxId;
		}
		return vsdxId;
	};
	
	function getGraphAttributes(graph) 
	{
		var attr = {};
		
		try
		{
			//This doesn't work when pageView is off
//			// Computes the horizontal and vertical page count
//			var bounds = graph.getGraphBounds();
//			var sc = graph.view.scale;
//			var bgBounds = graph.view.getBackgroundPageBounds();
//			
//			var x0 = Math.round((bounds.x - bgBounds.x) / sc);
//			var y0 = Math.round((bounds.y - bgBounds.y) / sc);
//			
//			var hpages = Math.max(1, Math.ceil((bounds.width / sc  + x0) / graph.pageFormat.width));
//			var vpages = Math.max(1, Math.ceil((bounds.height / sc + y0) / graph.pageFormat.height));
			
			// Computes the horizontal and vertical page count
			var bounds = graph.getGraphBounds().clone();
			var sc = graph.view.scale;
			var tr = graph.view.translate;

			var x0 = Math.round(bounds.x / sc) - tr.x;
			var y0 = Math.round(bounds.y / sc) - tr.y;
			
			// Store the available page area
			var availableWidth = graph.pageFormat.width;
			var availableHeight = graph.pageFormat.height;

			if (x0 < 0) 
			{
				x0 += Math.ceil((tr.x - bounds.x / sc) / availableWidth) * availableWidth;
			}

			if (y0 < 0) 
			{
				y0 += Math.ceil((tr.y - bounds.y / sc) / availableHeight) * availableHeight;
			}

			var hpages = Math.max(1, Math.ceil((bounds.width / sc  + x0) / availableWidth));
			var vpages = Math.max(1, Math.ceil((bounds.height / sc + y0) / availableHeight));
			
			attr['gridEnabled'] = graph.gridEnabled;
			attr['gridSize'] = graph.gridSize;
			attr['guidesEnabled'] = graph.graphHandler.guidesEnabled
			attr['pageVisible'] = graph.pageVisible;
			attr['pageScale'] = graph.pageScale;
			attr['pageWidth'] = graph.pageFormat.width * hpages;
			attr['pageHeight'] = graph.pageFormat.height * vpages;
			attr['backgroundClr'] = graph.background;
			attr['mathEnabled'] = graph.mathEnabled;
			attr['shadowVisible'] = graph.shadowVisible;
		}
		catch(e)
		{
			//nothing
		}
		return attr;
	};

	function createCellElemScaled(name, val, xmlDoc, formula)
	{
		return createCellElem(name, val / that.CONVERSION_FACTOR, xmlDoc, formula);
	};

	function createCellElem(name, val, xmlDoc, formula)
	{
		var cell = createElt(xmlDoc, that.XMLNS, "Cell");
		cell.setAttribute("N", name);
		cell.setAttribute("V", val);
		
		if (formula) cell.setAttribute("F", formula);
		
		return cell;
	};

	function createRow(type, index, x, y, xmlDoc) 
	{
		var row = createElt(xmlDoc, that.XMLNS, "Row");
		row.setAttribute("T", type);
		row.setAttribute("IX", index);
		row.appendChild(createCellElemScaled("X", x, xmlDoc));
		row.appendChild(createCellElemScaled("Y", y, xmlDoc));
		return row;
	};

	function applyMxCellStyle(state, shape, xmlDoc)
	{
		var fillClr = mxUtils.rgba2hex(state.style[mxConstants.STYLE_FILLCOLOR]);
		
		if (!fillClr || fillClr == "none")
		{
			shape.appendChild(createCellElem("FillPattern", 0, xmlDoc));
		}
		else
		{
			shape.appendChild(createCellElem("FillForegnd", fillClr, xmlDoc));
			var gradClr = mxUtils.rgba2hex(state.style[mxConstants.STYLE_GRADIENTCOLOR]);

			if (gradClr && gradClr != "none")
			{
				shape.appendChild(createCellElem("FillBkgnd", gradClr, xmlDoc));
				
				var gradDir = state.style[mxConstants.STYLE_GRADIENT_DIRECTION];
				var dir = 28;
				
				if (gradDir)
				{
					switch(gradDir)
					{
						case mxConstants.DIRECTION_EAST:
							dir = 25;
						break
						case mxConstants.DIRECTION_WEST:
							dir = 27;
						break
						case mxConstants.DIRECTION_NORTH:
							dir = 30;
						break
					}
				}
				shape.appendChild(createCellElem("FillPattern", dir, xmlDoc));
			}
		}

		var strokeClr = mxUtils.rgba2hex(state.style[mxConstants.STYLE_STROKECOLOR]);
		
		if (!strokeClr || strokeClr == "none")
			shape.appendChild(createCellElem("LinePattern", 0, xmlDoc));
		else
			shape.appendChild(createCellElem("LineColor", strokeClr, xmlDoc));

		var strokeW = state.style[mxConstants.STYLE_STROKEWIDTH];
		if (strokeW) shape.appendChild(createCellElemScaled("LineWeight", strokeW, xmlDoc));
		
		
		var opacity = state.style[mxConstants.STYLE_OPACITY];
		var fillOpaq; 
		var strkOpaq; 	
		
		if (opacity)
		{
			fillOpaq = opacity;
			strkOpaq = opacity;
		}
		else
		{
			fillOpaq = state.style[mxConstants.STYLE_FILL_OPACITY];
			strkOpaq = state.style[mxConstants.STYLE_STROKE_OPACITY];
		}
			
		if (fillOpaq) shape.appendChild(createCellElem("FillForegndTrans", 1 - parseInt(fillOpaq)/100.0, xmlDoc));
		if (strkOpaq) shape.appendChild(createCellElem("LineColorTrans", 1 - parseInt(strkOpaq)/100.0, xmlDoc));
		
		var isDashed = state.style[mxConstants.STYLE_DASHED];
		
		if (isDashed == 1) 
		{
			var dashPatrn = state.style[mxConstants.STYLE_DASH_PATTERN];
			var pattern = 9
				
			if (dashPatrn)
			{
				//We only support the patterns of draw.io UI
				switch(dashPatrn) 
				{
					case "1 1":
						pattern = 10; 
					break;
					case "1 2":
						pattern = 3; 
					break;
					case "1 4":
						pattern = 17; 
					break;
				} 
			}
			
			shape.appendChild(createCellElem("LinePattern", pattern, xmlDoc));
		}
		
		var hasShadow = state.style[mxConstants.STYLE_SHADOW];
		
		if (hasShadow == 1)
		{
			shape.appendChild(createCellElem("ShdwPattern", 1, xmlDoc));
			shape.appendChild(createCellElem("ShdwForegnd", '#000000', xmlDoc));
			shape.appendChild(createCellElem("ShdwForegndTrans", 0.6, xmlDoc));
			shape.appendChild(createCellElem("ShapeShdwType", 1, xmlDoc));
			shape.appendChild(createCellElem("ShapeShdwOffsetX", '0.02946278254943948', xmlDoc));
			shape.appendChild(createCellElem("ShapeShdwOffsetY", '-0.02946278254943948', xmlDoc));
			shape.appendChild(createCellElem("ShapeShdwScaleFactor", '1', xmlDoc));
			shape.appendChild(createCellElem("ShapeShdwBlur", '0.05555555555555555', xmlDoc));
			shape.appendChild(createCellElem("ShapeShdwShow", 2, xmlDoc));
		}
		
		//Probably we don't need margins as the canvas get the modified position?
	/*	
		var topMargin = state.style[mxConstants.STYLE_SPACING_TOP];
		if (topMargin) shape.appendChild(createCellElemScaled("TopMargin", parseFloat(topMargin) * 2 + 2.8 , xmlDoc));

/*		//Defines label bottom spacing
		double bottomMargin = getBottomSpacing() * 100/100;

		if (bottomMargin != 0)
		{
			styleMap.put(mxConstants.STYLE_SPACING_BOTTOM, Double.toString(bottomMargin));
		}

		//Defines label left spacing
		double leftMargin = getLeftSpacing() * 100/100;

		if (leftMargin != 0)
		{
			styleMap.put(mxConstants.STYLE_SPACING_LEFT, Double.toString(leftMargin));
		}

		//Defines label right spacing
		double rightMargin = getRightSpacing() * 100/100;

		if(rightMargin !=0)
		{
			styleMap.put(mxConstants.STYLE_SPACING_RIGHT, Double.toString(rightMargin));
		}*/

		//Direction is not clear that we need it
		/*
		var direction = state.style[mxConstants.STYLE_DIRECTION];

		if (direction != mxConstants.DIRECTION_EAST)
		{
			styleMap.put(mxConstants.STYLE_DIRECTION, direction);
		}
		*/

		var flibX = state.style[mxConstants.STYLE_FLIPH];
		if (flibX == 1) shape.appendChild(createCellElem("FlipX", 1, xmlDoc));

		var flibY = state.style[mxConstants.STYLE_FLIPV];
		if (flibY == 1) shape.appendChild(createCellElem("FlipY", 1, xmlDoc));

		var rounded = state.style[mxConstants.STYLE_ROUNDED];
		if (rounded == 1) shape.appendChild(createCellElemScaled("Rounding", state.cell.geometry.width*0.1, xmlDoc));

		//TODO for some reason, visio doesn't show the label (text) background color!
		//May be we need mxSvgCanvas2D.prototype.addTextBackground = function(node, str, x, y, w, h, align, valign, overflow)
		var lbkgnd = mxUtils.rgba2hex(state.style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR]);
		if (lbkgnd) shape.appendChild(createCellElem("TextBkgnd", lbkgnd, xmlDoc));
	};

	function createShape(id, geo, layerIndex, xmlDoc, parentHeight, isChild)
	{
		var shape = createElt(xmlDoc, that.XMLNS, "Shape");
		
		shape.setAttribute("ID", id);
		shape.setAttribute("NameU", "Shape" + id);
		shape.setAttribute("LineStyle", "0");
		shape.setAttribute("FillStyle", "0");
		shape.setAttribute("TextStyle", "0");
		
		var hw = geo.width/2, hh = geo.height/2;
		
		shape.appendChild(createCellElemScaled("PinX", geo.x + hw + (isChild? 0 : vsdxCanvas.shiftX), xmlDoc));
		shape.appendChild(createCellElemScaled("PinY", parentHeight - geo.y - hh - (isChild? 0 : vsdxCanvas.shiftY), xmlDoc));
		shape.appendChild(createCellElemScaled("Width", geo.width, xmlDoc));
		shape.appendChild(createCellElemScaled("Height", geo.height, xmlDoc));
		shape.appendChild(createCellElemScaled("LocPinX", hw, xmlDoc));
		shape.appendChild(createCellElemScaled("LocPinY", hh, xmlDoc));
		shape.appendChild(createCellElem("LayerMember", layerIndex + "", xmlDoc));
		
		return shape;
	};

	function getArrowType(arrow, isFilled)
	{
		isFilled = isFilled == null? "1" : isFilled;
		arrow = arrow == null? "none" : arrow;
		var key = arrow + "|" + isFilled;
		var type = that.ARROWS_MAP[key];
		if (type != null)
			return type;
		else
			return 1;
	};
	
	function getArrowSize(size)
	{
		if (size == null) return 2;
		
		if (size <=2)
			return 0;
		else if (size <= 3)
			return 1;
		else if (size <= 5)
			return 2;
		else if (size <= 7)
			return 3;
		else if (size <= 9)
			return 4;
		else if (size <= 22)
			return 5;
		else
			return 6;
	};

	function createEdge(cell, layerIndex, graph, xmlDoc, parentHeight, isChild)
	{
		var state = graph.view.getState(cell, true);
		
		if (state == null || state.absolutePoints == null || state.cellBounds == null)
		{
			return null;
		}
		
		var shape = createElt(xmlDoc, that.XMLNS, "Shape");
		var vsdxId = getCellVsdxId(cell.id);
		shape.setAttribute("ID", vsdxId);
		shape.setAttribute("NameU", "Dynamic connector." + vsdxId);
		shape.setAttribute("Name", "Dynamic connector." + vsdxId);
		shape.setAttribute("Type", "Shape");
		shape.setAttribute("Master", "4"); //Dynamic Connector Master
			
		var s = vsdxCanvas.state;
		var points = state.absolutePoints;
		var bounds = state.cellBounds;
		
		var hw = bounds.width/2, hh = bounds.height/2;
		
		shape.appendChild(createCellElemScaled("PinX", bounds.x + hw + (isChild? 0 : vsdxCanvas.shiftX), xmlDoc));
		shape.appendChild(createCellElemScaled("PinY", parentHeight - bounds.y - hh - (isChild? 0 : vsdxCanvas.shiftY), xmlDoc));
		shape.appendChild(createCellElemScaled("Width", bounds.width, xmlDoc));
		shape.appendChild(createCellElemScaled("Height", bounds.height, xmlDoc));
		shape.appendChild(createCellElemScaled("LocPinX", hw, xmlDoc));
		shape.appendChild(createCellElemScaled("LocPinY", hh, xmlDoc));

		vsdxCanvas.newEdge(shape, state, xmlDoc);
		
		var calcVsdxPoint = function(p, noHeight, withoutShift) 
		{
			var x = p.x, y = p.y;
			x = x * s.scale - bounds.x + s.dx + (withoutShift || isChild? 0 : vsdxCanvas.shiftX);
			y = (noHeight? 0 : bounds.height) - y * s.scale + bounds.y - s.dy - (withoutShift || isChild? 0 : vsdxCanvas.shiftY);
			return {x: x, y: y};
		};

		var p0 = calcVsdxPoint(points[0], true);
		
		//Formula is used to make the edge dynamic 
		shape.appendChild(createCellElemScaled("BeginX", bounds.x + p0.x, xmlDoc, "_WALKGLUE(BegTrigger,EndTrigger,WalkPreference)"));
		shape.appendChild(createCellElemScaled("BeginY", parentHeight - bounds.y + p0.y, xmlDoc, "_WALKGLUE(BegTrigger,EndTrigger,WalkPreference)"));

		var pe = calcVsdxPoint(points[points.length - 1], true);
		
		//Formula is used to make the edge dynamic 
		shape.appendChild(createCellElemScaled("EndX", bounds.x + pe.x, xmlDoc, "_WALKGLUE(EndTrigger,BegTrigger,WalkPreference)"));
		shape.appendChild(createCellElemScaled("EndY", parentHeight - bounds.y + pe.y, xmlDoc, "_WALKGLUE(EndTrigger,BegTrigger,WalkPreference)"));

		//Formula is used to make the edge dynamic (specify source id and target id)
		shape.appendChild(createCellElem("BegTrigger", "2", xmlDoc, cell.source? "_XFTRIGGER(Sheet."+ getCellVsdxId(cell.source.id) +"!EventXFMod)" : null));
		shape.appendChild(createCellElem("EndTrigger", "2", xmlDoc, cell.target? "_XFTRIGGER(Sheet."+ getCellVsdxId(cell.target.id) +"!EventXFMod)" : null));
		shape.appendChild(createCellElem("ConFixedCode", "6", xmlDoc));
		shape.appendChild(createCellElem("LayerMember", layerIndex + "", xmlDoc));

		applyMxCellStyle(state, shape, xmlDoc);
		
		//Edge special styles
		var startFill =  state.style[mxConstants.STYLE_STARTFILL];
		var startArrow = state.style[mxConstants.STYLE_STARTARROW];
		var startSize =  state.style[mxConstants.STYLE_STARTSIZE];
		
		var type = getArrowType(startArrow, startFill);
		shape.appendChild(createCellElem("BeginArrow", type, xmlDoc));
		shape.appendChild(createCellElem("BeginArrowSize", getArrowSize(startSize), xmlDoc));
		
		var endFill =  state.style[mxConstants.STYLE_ENDFILL];
		var endArrow = state.style[mxConstants.STYLE_ENDARROW];
		var endSize =  state.style[mxConstants.STYLE_ENDSIZE];
		
		var type = getArrowType(endArrow, endFill);
		shape.appendChild(createCellElem("EndArrow", type, xmlDoc));
		shape.appendChild(createCellElem("EndArrowSize", getArrowSize(endSize), xmlDoc));
		
		//Draw text first to have its shape cell elements before visio geo.
		if (state.text != null && state.text.checkBounds())
		{
			vsdxCanvas.save();
			state.text.paint(vsdxCanvas);
			vsdxCanvas.restore();
		}
		
		var geoSec = createElt(xmlDoc, that.XMLNS, "Section");
		
		geoSec.setAttribute("N", "Geometry");
		geoSec.setAttribute("IX", "0");

		for (var i = 0; i < points.length; i++)
		{
			var p = calcVsdxPoint(points[i], false, true);
			geoSec.appendChild(createRow(i==0 ? "MoveTo" : "LineTo", (i + 1), p.x, p.y, xmlDoc));
		}
		
		geoSec.appendChild(createCellElem("NoFill", "1", xmlDoc));
		geoSec.appendChild(createCellElem("NoLine", "0", xmlDoc));
		shape.appendChild(geoSec);
		
		return shape;
	};
	
	function convertMxCell2Shape(cell, layerIndex, graph, xmlDoc, parentHeight, parentGeo, isChild)
	{
		var geo = cell.geometry, origGeo = geo;
		
		if (geo != null)
		{
		  try
		  {
			//fix relative geo coordinates
			if (geo.relative && parentGeo)
			{
				origGeo = geo.clone();
				geo.x *= parentGeo.width;
				geo.y *= parentGeo.height;
				
				if (cell.vertex && geo.offset != null)
				{
					geo.x += geo.offset.x;
					geo.y += geo.offset.y;
				}
				
				geo.relative = 0;
			}
			
			var vsdxId = getCellVsdxId(cell.id);
			
			if (!cell.treatAsSingle && cell.getChildCount() > 0) //Group 
			{
				//Create group shape as an empty shape with no geo
				var shape = createShape(vsdxId + "10000", geo, layerIndex, xmlDoc, parentHeight, isChild);
				shape.setAttribute("Type", "Group");
				
				//Create group shape
				var gShapes = createElt(xmlDoc, that.XMLNS, "Shapes");

				//translate the canvas using the group coordinates
				vsdxCanvas.save();
				vsdxCanvas.translate(-geo.x, -geo.y);

				//Draw the actual group shape as a child (so change its geo coord to 0,0). 
				//	In mxGraph group shape can have styles and stencil
				var newGeo = geo.clone();
				newGeo.x = 0;
				newGeo.y = 0;
				cell.setGeometry(newGeo);
				cell.treatAsSingle = true;
				var subShape = convertMxCell2Shape(cell, layerIndex, graph, xmlDoc, geo.height, geo, true);
				delete cell.treatAsSingle;
				cell.setGeometry(geo);
				
				if (subShape != null)
				{
					gShapes.appendChild(subShape);
				}
				
				//add group children
				for (var i = 0; i < cell.getChildCount(); i++)
				{
					var child = cell.children[i];
					
					var subShape = convertMxCell2Shape(child, layerIndex, graph, xmlDoc, geo.height, geo, true);
					
					if (subShape != null)
					{
						gShapes.appendChild(subShape);
					}
				}
				
				shape.appendChild(gShapes);
				
				//restore the canvas to before group translation 
				vsdxCanvas.restore();
				
				return shape;
			}
			else if (cell.vertex)
			{
				var shape = createShape(vsdxId, geo, layerIndex, xmlDoc, parentHeight, isChild);
				var state = graph.view.getState(cell, true);

				if (state != null)
				{
					applyMxCellStyle(state, shape, xmlDoc);
					vsdxCanvas.newShape(shape, state, xmlDoc);

					//Draw text first to have its shape cell elements before visio geo.
					if (state.text != null && state.text.checkBounds())
					{
						vsdxCanvas.save();
						state.text.paint(vsdxCanvas);
						vsdxCanvas.restore();
					}
					if (state.shape != null && state.shape.checkBounds())
					{
						vsdxCanvas.save();
						state.shape.paint(vsdxCanvas);
						vsdxCanvas.restore();
					}
					
					shape.appendChild(vsdxCanvas.getShapeGeo());
					vsdxCanvas.endShape();
					shape.setAttribute("Type", vsdxCanvas.getShapeType());
				}

				return shape;
			}
			else
			{
				return createEdge(cell, layerIndex, graph, xmlDoc, parentHeight, isChild);
			}
		  }
		  finally
		  {
			cell.geometry = origGeo;	
		  }
		}
		else
		{
			return null;
		}
	};

	
	function convertMxModel2Page(graph, modelAttrib)
	{
        var xmlDoc = mxUtils.createXmlDocument();

        var root = createElt(xmlDoc, that.XMLNS, "PageContents");
        
        root.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', that.XMLNS);
        root.setAttributeNS('http://www.w3.org/2000/xmlns/', "xmlns:r", that.XMLNS_R);
        
        var shapes = createElt(xmlDoc, that.XMLNS, "Shapes");
        root.appendChild(shapes);

        var model = graph.model;
        
		var t = graph.view.translate;
		var s = graph.view.scale;
		var bounds = graph.getGraphBounds();

		vsdxCanvas.shiftX = 0; vsdxCanvas.shiftY = 0;
		//-ve pages
		if (bounds.x / s < t.x || bounds.y / s < t.y) 
		{
			vsdxCanvas.shiftX = Math.ceil((t.x - bounds.x / s) / graph.pageFormat.width) * graph.pageFormat.width;
			vsdxCanvas.shiftY = Math.ceil((t.y - bounds.y / s) / graph.pageFormat.height) * graph.pageFormat.height;
		}
		
		vsdxCanvas.save();
		vsdxCanvas.translate(-t.x, -t.y);
		vsdxCanvas.scale(1 / s);
		vsdxCanvas.newPage();
		
		var layers = graph.model.getChildCells(graph.model.root);
		var layerIdsMaps = {};
		
		for (var k = 0; k < layers.length; k++)
		{
			layerIdsMaps[layers[k].id] = k;
		}
		
		for (var id in model.cells) 
		{
			var cell = model.cells[id];
			//top-most cells
			var layerIndex = cell.parent != null? layerIdsMaps[cell.parent.id] : null;
			
			if (layerIndex != null)
			{
				var shape = convertMxCell2Shape(cell, layerIndex, graph, xmlDoc, modelAttrib.pageHeight);
				
				if (shape != null)
					shapes.appendChild(shape);
			}
		}
		
        var connects = createElt(xmlDoc, that.XMLNS, "Connects");
        root.appendChild(connects);

        //Second pass to add edges (connections)
		for (var id in model.cells) 
		{
			var cell = model.cells[id];

			if (cell.edge)
			{
				if (cell.source)
				{
					var connect = createElt(xmlDoc, that.XMLNS, "Connect");
					connect.setAttribute("FromSheet", getCellVsdxId(cell.id));
					connect.setAttribute("FromCell", "BeginX");
					connect.setAttribute("ToSheet", getCellVsdxId(cell.source.id));
					connects.appendChild(connect);
				}
				
				if (cell.target)
				{
					var connect = createElt(xmlDoc, that.XMLNS, "Connect");
					connect.setAttribute("FromSheet", getCellVsdxId(cell.id));
					connect.setAttribute("FromCell", "EndX");
					connect.setAttribute("ToSheet", getCellVsdxId(cell.target.id));
					connects.appendChild(connect);
				}
			}
		}

		xmlDoc.appendChild(root);

		vsdxCanvas.restore();

		return xmlDoc;
	};

	function writeXmlDoc2Zip(zip, name, xmlDoc, noHeader)
	{
		zip.file(name, (noHeader? "" : "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>") + mxUtils.getXml(xmlDoc, '\n'));
	};
	
	function addPagesXML(zip, pages, pageLayers, modelsAttr) 
	{
		var pagesXmlDoc = mxUtils.createXmlDocument();
		var pagesRelsXmlDoc = mxUtils.createXmlDocument();
	
		var pagesRoot = createElt(pagesXmlDoc, that.XMLNS, "Pages");
		pagesRoot.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', that.XMLNS);
		pagesRoot.setAttributeNS('http://www.w3.org/2000/xmlns/', "xmlns:r", that.XMLNS_R);

		var pagesRelsRoot = createElt(pagesRelsXmlDoc, that.RELS_XMLNS, "Relationships");
		
		var i = 1;
		for (var name in pages) 
		{
			var pageName = "page" + i + ".xml";
			
			var pageE = createElt(pagesXmlDoc, that.XMLNS, "Page");
			pageE.setAttribute("ID", i-1);
			pageE.setAttribute("NameU", name);
			pageE.setAttribute("Name", name);
		
			var pageSheet = createElt(pagesXmlDoc, that.XMLNS, "PageSheet");
			var modelAttr = modelsAttr[name];
			
			pageSheet.appendChild(createCellElemScaled("PageWidth", modelAttr['pageWidth'], pagesXmlDoc));
			pageSheet.appendChild(createCellElemScaled("PageHeight", modelAttr['pageHeight'], pagesXmlDoc));
			pageSheet.appendChild(createCellElem("PageScale", modelAttr['pageScale'], pagesXmlDoc));
			pageSheet.appendChild(createCellElem("DrawingScale", 1, pagesXmlDoc));
		
			var relE = createElt(pagesXmlDoc, that.XMLNS,"Rel");
			relE.setAttributeNS(that.XMLNS_R, "r:id", "rId" + i);

			//Add Layers
			var layerSec = createElt(pagesXmlDoc, that.XMLNS, "Section");
			layerSec.setAttribute("N", "Layer");

			var layers = pageLayers[name];
			
			for (var k = 0; k < layers.length; k++)
			{
				var layerRow = createElt(pagesXmlDoc, that.XMLNS, "Row");
				layerRow.setAttribute("IX", k + "");
	
				layerSec.appendChild(layerRow)
				
				layerRow.appendChild(createCellElem("Name", layers[k].name, pagesXmlDoc));
				layerRow.appendChild(createCellElem("Color", '255', pagesXmlDoc));
				layerRow.appendChild(createCellElem("Status", '0', pagesXmlDoc));
				layerRow.appendChild(createCellElem("Visible", layers[k].visible? '1' : '0', pagesXmlDoc));
				layerRow.appendChild(createCellElem("Print", '1', pagesXmlDoc));
				layerRow.appendChild(createCellElem("Active", '0', pagesXmlDoc));
				layerRow.appendChild(createCellElem("Lock", layers[k].locked? '1' : '0', pagesXmlDoc));
				layerRow.appendChild(createCellElem("Snap", '1', pagesXmlDoc));
				layerRow.appendChild(createCellElem("Glue", '1', pagesXmlDoc));
				layerRow.appendChild(createCellElem("NameUniv", layers[k].name, pagesXmlDoc));
				layerRow.appendChild(createCellElem("ColorTrans", '0', pagesXmlDoc));
			}
			
			pageSheet.appendChild(layerSec);
			
			pageE.appendChild(pageSheet);
			pageE.appendChild(relE);
			pagesRoot.appendChild(pageE);
			
			var relationship = createElt(pagesRelsXmlDoc, that.RELS_XMLNS, "Relationship");
			relationship.setAttribute("Id", "rId" + i);
			relationship.setAttribute("Type", that.PAGES_TYPE);
			relationship.setAttribute("Target", pageName);
			pagesRelsRoot.appendChild(relationship);
			
			//Note:Each page rels is created with the skeleton as they are constants
			
			//write the page docs
			var xmlDoc = pages[name];
			writeXmlDoc2Zip(zip, that.VISIO_PAGES + pageName, xmlDoc);
			i++;
		}
		
		pagesXmlDoc.appendChild(pagesRoot);
		pagesRelsXmlDoc.appendChild(pagesRelsRoot);
		writeXmlDoc2Zip(zip, that.VISIO_PAGES + "pages.xml", pagesXmlDoc);
		writeXmlDoc2Zip(zip, that.VISIO_PAGES + "_rels/pages.xml.rels", pagesRelsXmlDoc);
	}

	function addImagesRels(zip, pIndex)
	{
		//create a new page rels file
		var fId = that.VISIO_PAGES_RELS + "page" + pIndex + ".xml.rels";
		var pageRelDoc = mxUtils.createXmlDocument();

		var relationships = createElt(pageRelDoc, that.RELS_XMLNS, "Relationships");

		//Add master relationship (rId1)
		var relationship = createElt(pageRelDoc, that.RELS_XMLNS, "Relationship");
        relationship.setAttribute("Type", "http://schemas.microsoft.com/visio/2010/relationships/master");
        relationship.setAttribute("Id", "rId1");
        relationship.setAttribute("Target", "../masters/master1.xml");
        relationships.appendChild(relationship);
		
		var imgs = vsdxCanvas.images;

		//create rels of image files
		if (imgs.length > 0)
		{
    		for (var i = 0; i < imgs.length; i++)
			{
    			var relationship = createElt(pageRelDoc, that.RELS_XMLNS, "Relationship");
    	        relationship.setAttribute("Type", that.XMLNS_R + "/image");
    	        relationship.setAttribute("Id", "rId" + (i+2));
    	        relationship.setAttribute("Target", "../media/" + imgs[i]);
    	        
    	        relationships.appendChild(relationship);
			}
    	}
		pageRelDoc.appendChild(relationships);
    	writeXmlDoc2Zip(zip, fId, pageRelDoc);
	};
	/**
	 * 
	 * Convert current Editor UI pages into a vdsx file
	 * @return true if successful, false otherwise 
	 */
	this.exportCurrentDiagrams = function (currentPageOnly)
	{
		try 
		{
			if (editorUi.spinner.spin(document.body, mxResources.get('exporting')))
			{
				var zip = new JSZip();
			    
				//init class global variables
				vsdxCanvas.init(zip);
				idsMap = {};
				idsCounter = 1;
				
				var pages = {};
				var pageLayers = {};
				var modelsAttr = {};
				
				var pagesCount = editorUi.pages != null? editorUi.pages.length : 1;
				
				function collectLayers(graph, diagramName)
				{
					var layers = graph.model.getChildCells(graph.model.root);
					pageLayers[diagramName] = [];
					
					for (var k = 0; k < layers.length; k++)
					{
						//KNOWN We don't export invisible layers, we may support it later but we need to have a full cell state for invisible cells
						if (layers[k].visible)
						{
							pageLayers[diagramName].push({
								name: layers[k].value || 'Background',
								visible: layers[k].visible,
								locked: layers[k].style && layers[k].style.indexOf('locked=1') >= 0 
							});
						}
					}
				};
				
				if (editorUi.pages != null) 
				{
					function exportPage(page)
					{
						var diagramName = page.getName();
						var graph = editorUi.editor.graph;
						
						//Handles dark mode
						var temp = null;
						
						if (graph.themes != null && graph.defaultThemeName == 'darkTheme')
						{
							temp = graph.stylesheet;
							graph.stylesheet = graph.getDefaultStylesheet();
							graph.refresh();
						}
						
						try
						{
							var modelAttrib = getGraphAttributes(graph);
							pages[diagramName] = convertMxModel2Page(graph, modelAttrib);
							collectLayers(graph, diagramName);
							addImagesRels(zip, i+1);
							modelsAttr[diagramName] = modelAttrib;
						}
						finally
						{
							if (temp != null)
							{
								graph.stylesheet = temp;
								graph.refresh();
							}
						}
					};
					
					var selectedCells = editorUi.editor.graph.getSelectionCells();
					var currentPage = editorUi.currentPage;
					
					if (currentPageOnly)
					{
						exportPage(currentPage);
					}
					else
					{
						for (var i=0; i < editorUi.pages.length; i++)
						{
							var page = editorUi.pages[i];
							
							if (editorUi.currentPage != page)
							{
								editorUi.selectPage(page, true);
							}
							
							exportPage(page);
						}
						
						if (currentPage != editorUi.currentPage)
						{
							editorUi.selectPage(currentPage, true);
						}
						
						editorUi.editor.graph.setSelectionCells(selectedCells);
					}
				}
				else
				{
					var graph = editorUi.editor.graph;
					var modelAttrib = getGraphAttributes(graph);
					var diagramName = "Page1";
					pages[diagramName] = convertMxModel2Page(graph, modelAttrib);
					collectLayers(graph, diagramName);
					addImagesRels(zip, 1);
					modelsAttr[diagramName] = modelAttrib;
				}
				
				createVsdxSkeleton(zip, pagesCount);
				
				addPagesXML(zip, pages, pageLayers, modelsAttr);

				var createZipFile = function() 
				{
					zip.generateAsync({type:"base64"}).then(
						function(content) 
						{
							editorUi.spinner.stop();
							var basename = editorUi.getBaseFilename();
						    editorUi.saveData(basename + ".vsdx", 'vsdx', content,
						    	'application/vnd.visio2013', true);
						}
					);
				};
				
				if (vsdxCanvas.filesLoading > 0)
				{
					// wait until all media files are loaded
					vsdxCanvas.onFilesLoaded = createZipFile;
				}
				else
				{
					createZipFile();
				}
			}
			
			return true;
		}
		catch(e) 
		{
			console.log(e);
			editorUi.spinner.stop();
			return false;
		}
	};	
}

VsdxExport.prototype.CONVERSION_FACTOR = 40 * 2.54; //screenCoordinatesPerCm (40) x CENTIMETERS_PER_INCHES (2.54)
VsdxExport.prototype.PAGES_TYPE = "http://schemas.microsoft.com/visio/2010/relationships/page";
VsdxExport.prototype.RELS_XMLNS = "http://schemas.openxmlformats.org/package/2006/relationships";
VsdxExport.prototype.XML_SPACE = "preserve";
VsdxExport.prototype.XMLNS_R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
VsdxExport.prototype.XMLNS = "http://schemas.microsoft.com/office/visio/2012/main";
VsdxExport.prototype.VISIO_PAGES = "visio/pages/";
VsdxExport.prototype.PREFEX = "com/mxgraph/io/vsdx/resources/export/";
VsdxExport.prototype.VSDX_ENC = "ISO-8859-1";
VsdxExport.prototype.PART_NAME = "PartName";
VsdxExport.prototype.CONTENT_TYPES_XML = "[Content_Types].xml";
VsdxExport.prototype.VISIO_PAGES_RELS = "visio/pages/_rels/";
VsdxExport.prototype.ARROWS_MAP = {
	"none|1": 0, "none|0": 0, "open|1": 1, "open|0": 1, "block|1": 4, "block|0": 14, "classic|1": 5, "classic|0": 17,
	"oval|1": 10, "oval|0": 20, "diamond|1": 11, "diamond|0": 22, "blockThin|1": 2, "blockThin|0": 15, "dash|1": 23, "dash|0": 23,
	"ERone|1": 24, "ERone|0": 24, "ERmandOne|1": 25, "ERmandOne|0": 25, "ERmany|1": 27, "ERmany|0": 27, "ERoneToMany|1": 28, "ERoneToMany|0": 28,
	"ERzeroToMany|1": 29, "ERzeroToMany|0": 29, "ERzeroToOne|1": 30, "ERzeroToOne|0": 30, "openAsync|1": 9, "openAsync|0": 9
};
