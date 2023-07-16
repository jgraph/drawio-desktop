function MiroImporter()
{
    var stencilsMap = {
        'amazon-aws-cost-management-reserved-instance-reporting': 'shape=mxgraph.aws4.resourceIcon;resIcon=mxgraph.aws4.reserved_instance_reporting;gradientColor=#60A337;gradientDirection=north;fillColor=#277116;strokeColor=#ffffff;dashed=0;aspect=fixed;align=center;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;',
        'flowchart-process': 'shape=mxgraph.flowchart.process;',
        'flowchart-decision': 'shape=mxgraph.flowchart.decision;',
        'flowchart-data': 'shape=mxgraph.flowchart.data;',
        'flowchart-predefined-process': 'shape=mxgraph.flowchart.predefined_process;',
        'flowchart-internal-storage': 'shape=mxgraph.flowchart.internal_storage;',
        'flowchart-document': 'shape=mxgraph.flowchart.document;',
        'flowchart-preparation': 'shape=mxgraph.flowchart.preparation;',
        'flowchart-manual-operation': 'shape=mxgraph.flowchart.manual_operation;',
        'flowchart-multiple-documents': 'shape=mxgraph.flowchart.multi-document;',
        'flowchart-terminator': 'shape=mxgraph.flowchart.terminator;',
        'flowchart-manual-input': 'shape=mxgraph.flowchart.manual_input;',
        'flowchart-database': 'shape=mxgraph.flowchart.database;',
        'flowchart-hard-disk': 'shape=mxgraph.flowchart.direct_data;',
        'flowchart-delay': 'shape=mxgraph.flowchart.delay;',
        'flowchart-stored-data': 'shape=mxgraph.flowchart.stored_data;',
        'flowchart-merge': 'shape=mxgraph.flowchart.merge_or_storage;',
        'flowchart-connector': 'ellipse;',
        'flowchart-or': 'shape=mxgraph.flowchart.or;',
        'flowchart-summing-junction': 'shape=mxgraph.flowchart.summing_function;',
        'flowchart-display': 'shape=mxgraph.flowchart.display;',
        'flowchart-off-page-link': 'shape=offPageConnector;',
        //'flowchart-note-curly-right': 'shape=mxgraph.flowchart.note_curly_right;',
        //'flowchart-note-curly-left': 'shape=mxgraph.flowchart.note_curly_left;',
        'flowchart-note-square': 'shape=mxgraph.flowchart.annotation_1;',
    };

    var typeStylesMap = {
        'card': function (vertex, obj, tags, graph)
        {
            vertex.value = obj.title.title + obj.description.description;
            var styleMap = parseStyles(obj);
            styleMap['strokeColor'] = styleMap['fillColor'];
            styleMap['fillColor'] = '#ffffff';
            styleMap['strokeWidth'] = 10;
            vertex.style = buildStyleString('shape=partialRectangle;top=0;bottom=0;right=0;align=left;verticalAlign=top;spacing=20;fontSize=28;spacingLeft=40;', styleMap);
        },
        'sticker': 'rect;shadow=1;strokeColor=none;',
        'text': 'rect;rounded=1;arcSize=50;',
        'stencil': function(vertex, obj, tags, graph)
        {
            var style = '';

            try
            {
                var texts = obj.schema.data.texts;

                if (texts)
                {
                    vertex.value = texts.caption? texts.caption.text : 
                        (texts.name? texts.name.text : '');
                }

                style = stencilsMap[obj.schema.id];
            }
            catch (e)
            {
                console.log(e);
            }

            vertex.style = buildStyleString(style, parseStyles(obj));
        }
    };

    function colorNum2Hex(color)
    {
        return  color == -1 ? 'none' : 
                '#' + ('0' + (color >> 16).toString(16)).slice(-2) +
                ('0' + ((color >> 8) & 0xFF).toString(16)).slice(-2) +
                ('0' + (color & 0xFF).toString(16)).slice(-2);
    };

    fontNameMap = {
        0: 'Arial',
        2: 'Abril Fatface',
        3: 'Bangers',
        4: 'EB Garamond',
        5: 'Georgia',
        6: 'Graduate',
        7: 'Gravitas One',
        8: 'Fredoka One',
        9: 'Nixie One',
        10: 'OpenSans',
        11: 'Permanent Marker',
        12: 'PT Sans',
        13: 'PT Sans Narrow',
        14: 'PT Serif',
        15: 'Rammetto One',
        16: 'Roboto',
        17: 'Roboto Condensed',
        18: 'Roboto Slab',
        19: 'Caveat',
        20: 'Times New Roman',
        21: 'Titan One',
        22: 'Lemon Tuesday',
        23: 'Roboto Mono',
        24: 'Noto Sans',
        25: 'IBM Plex Sans',
        26: 'IBM Plex Serif',
        27: 'IBM Plex Mono',
        28: 'Spoof',
        29: 'Tiempos Text',
    };

    var shapesMap = {
        3: '',
        4: 'ellipse;',
        5: 'shape=mxgraph.basic.acute_triangle;dx=0.5;',
        6: 'shape=callout;perimeter=calloutPerimeter;size=30;position=0.13;position2=0.13;rounded=1;',
        7: ';rounded=1;',
        8: 'shape=isoRectangle;',
        10: 'shape=parallelogram;perimeter=parallelogramPerimeter;',
        11: 'shape=mxgraph.basic.star;',
        12: 'shape=singleArrow;arrowWidth=0.622;arrowSize=0.277;',
        13: 'shape=singleArrow;arrowWidth=0.622;arrowSize=0.277;direction=west;',
        16: 'shape=mxgraph.basic.pentagon;',
        17: 'shape=mxgraph.basic.polygon;polyCoords=[[0.25,0],[0.75,0],[1,0.5],[0.75,1],[0.25,1],[0,0.5]];',
        18: 'shape=mxgraph.basic.polygon;polyCoords=[[0.25,0],[0.75,0],[1,0.25],[1,0.75],[0.75,1],[0.25,1],[0,0.75],[0,0.25]];',
        19: 'shape=trapezoid;perimeter=trapezoidPerimeter;fixedSize=1;',
        20: '',
        21: 'shape=doubleArrow;arrowWidth=0.622;arrowSize=0.277;',
        22: 'ellipse;shape=cloud;',
        23: function(vertex, obj, tags, graph)
        { 
            var geo = vertex.geometry;
            var w = geo.width;
            geo.width = 20;
            geo.x += w - 20;
            vertex.style = buildStyleString('shape=curlyBracket;rounded=1;labelPosition=left;verticalLabelPosition=middle;align=right;verticalAlign=middle;', parseStyles(obj));
            vertex.style = vertex.style.replace('strokeColor=none;', '');
        },
        24: function(vertex, obj, tags, graph)
        { 
            vertex.geometry.width = 20;
            vertex.style = buildStyleString('shape=curlyBracket;rounded=1;flipH=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;', parseStyles(obj));
            vertex.style = vertex.style.replace('strokeColor=none;', '');
        },
        25: 'shape=cross;size=0.425;',
        26: 'shape=cylinder3;boundedLbl=1;size=7;',
    };

    function getTypeStyle(type, obj)
    {
        var style = '';

        if (type == 'paint')
        {
            var drawPoints = obj.points, w = obj.size.width, h = obj.size.height;
            var drawShape = '<shape strokewidth="inherit"><foreground>';
            
            for (var i = 0; i < drawPoints.length; i++) 
            {
                var p = drawPoints[i];
                drawShape += (i == 0? '<path><move' : '<line') + ' x="' + (p.x / w * 100).toFixed(2) +
                                '" y="' + (p.y / h * 100).toFixed(2) + '"/>';
            }
            
            drawShape += '</path><stroke/></foreground></shape>';
            style = 'shape=stencil(' + Graph.compress(drawShape) + ');';
        }
        else if (type == 'shape')
        {
            style = shapesMap[obj.shape];
        }
        else
        {
            style = typeStylesMap[type];
        }

        if (typeof style == 'function')
        {
            return style;
        }

        return style;
    };

    var arrowsMap = {
        0: ['none', 0],
        1: ['classic'],
        2: ['diamond', 0],
        3: ['diamond', 1],
        4: ['oval', 0],
        5: ['oval', 1],
        6: ['block', 0],
        7: ['open'],
        8: ['block', 1]
    };

    function addArrowStyle (style, val, end)
    {
        var es = arrowsMap[val];

        if (es)
        {
            style[end + 'Arrow'] = es[0];
            
            if (es[1] != null)
            {
                style[end + 'Fill'] = es[1];
            }
        }
    };

    function parseStyles(obj)
    {
        var style = {
            html: 1,
            whiteSpace: 'wrap'
        }, fontStyle = 0;

        try
        {
            var scale = obj.scale? (obj.scale.scale || 1) : 1;
            var styleMap = JSON.parse(obj.style);

            for (var key in styleMap)
            {
                var val = styleMap[key];

                if (val === null) continue;

                switch (key)
                {
                    case 'sbc': //Fill Color
                    case 'bc':
                        style['fillColor'] = colorNum2Hex(val);
                        break;
                    case 'fs': //Font Size
                        style['fontSize'] = (val || 48) * scale; //TODO support auto font size (0)
                        break;
                    case 'fsc': //Font Color?
                        break;
                    case 'fsa': //Font Style?
                        break;
                    case 'ffn': //Font Family
                        val = fontNameMap[val];

                        if (val) 
                        {
                            style['fontFamily'] = val;
                        }
                        break;
                    case 'ta': //Text Align
                        style['align'] = (val == 't' ? 'left' : 
                            (val == 'r'? 'right' : 'center'));
                        break;
                    case 'tav': //Text Vertical Align
                        style['verticalAlign'] = (val == 't' ? 'top' : 
                            (val == 'b'? 'bottom' : 'middle'));
                        break;
                    case 'taw': //Text Wrap?
                        break;
                    case 'tah': //Text Height?
                        break;
                    case 'lh': //Line Height?
                        break;
                    case 'bo': //Fill Opacity
                        style['opacity'] = val * 100;
                        break;
                    case 'ss': //Stroke Size?
                        break;
                    case 'st': //Stroke Type?
                        break;
                    case 'brw': //Stroke width
                    case 't': //Edge Thickness
                        style['strokeWidth'] = val * scale;
                        break;
                    case 'brc': //Stroke Color
                    case 'lc': //Edge Line Color
                        style['strokeColor'] = colorNum2Hex(val);
                        break;
                    case 'bro': //Stroke Opacity
                        style['strokeOpacity'] = val * 100;
                        break;
                    case 'brs': //Stroke Style
                    case 'ls': //Edge Line Style
                        //1 dashed, 0 dotted, 2 solid
                        if (val != 2)
                        {
                            style['dashed'] = 1;
                            
                            if (val == 0)
                            {
                                style['dashPattern'] = '1 4';
                            }
                        }
                        break;
                    case 'b': //Bold
                        if (val) fontStyle |= 1;
                        break;
                    case 'i': //Italic
                        if (val) fontStyle |= 2;
                        break;
                    case 'u': //Underline
                        if (val) fontStyle |= 4;
                        break;
                    case 's': //Stroke throw
                        if (val) fontStyle |= 8;
                        break;
                    case 'hl': //Highlight color
                        style['labelBackgroundColor'] = val;
                        break;
                    case 'tc': //Text Color
                        style['fontColor'] = colorNum2Hex(val);
                        break;
                    case 'sc': //Shadow Color?
                        break;
                    //Edge styles
                    case 'lt': //Line Type
                        //(val == 0) simple
                        if (val == 1)
                        {
                            style['edgeStyle'] = 'orthogonalEdgeStyle';
                            style['elbow'] = 'vertical';
                        }
                        else if (val >= 2)
                        {
                            style['edgeStyle'] = 'orthogonalEdgeStyle';
                            style['curved'] = 1;
                        }
                        break;
                    case 'a_start': //Start Arrow
                        addArrowStyle(style, val, 'start');
                        break;
                    case 'a_end': //End Arrow
                        addArrowStyle(style, val, 'end');
                        break;
                }
            }
        }
        catch (e)
        {
            console.error(e);
        }

        if (fontStyle)
        {
            style['fontStyle'] = fontStyle;
        }

        if (obj.rotation && obj.rotation.rotation)
        {
            style['rotation'] = obj.rotation.rotation;
        }

        return style;
    }

    function buildStyleString(curStyle, styleMap)
    {
        var style = curStyle || '';

        for (var key in styleMap)
        {
            if (style.indexOf(';' + key + '=') == -1)
            {
                style += key + '=' + styleMap[key] + ';';
            }
        }

        return style;
    };

    function importVertex(obj, type, tags, graph)
    {
        try
        {
            var style = getTypeStyle(type, obj) || '';
            var scale = obj.scale.scale, //TODO Check this is the correct use of the scale
            w = obj.size.width, h = obj.size.height, 
            x = obj.position.x, y = obj.position.y;
            var vertex = new mxCell(obj.text, new mxGeometry((x - w / 2 * scale), (y - h / 2 * scale),
                                w * scale, h * scale), '');

            if (typeof style == 'function')
            {
                style(vertex, obj, tags, graph);
            }
            else
            {
                vertex.style = buildStyleString(style, parseStyles(obj));
            }

            vertex.setVertex(true);
            graph.addCell(vertex);
            return vertex;
        }
        catch (e)
        {
            console.error(e);
        }
    };

    function importEdge(obj, vertexes, tags, graph)
    {
        try
        {
            var e = new mxCell('', new mxGeometry(0, 0, 100, 100), '');
            e.geometry.relative = true;
            e.edge = true;

            var edgeStyle = 'orthogonalLoop=1;jettySize=auto;';
            var source = vertexes[obj.primary.widgetIndex]; //-1 would be null
            var target = vertexes[obj.secondary.widgetIndex]; //-1 would be null
            var pp = obj.primary.point, sp = obj.secondary.point;
            var sourcePoint = pp? new mxPoint(pp.x, pp.y) : null, 
                targetPoint = sp? new mxPoint(sp.x, sp.y) : null;

            if (sourcePoint)
            {
                if (source)
                {
                    edgeStyle += 'exitX=' + sourcePoint.x + ';exitY=' + sourcePoint.y + ';';
                }
                else
                {
                    e.geometry.sourcePoint = sourcePoint;
                }
            }

            if (targetPoint)
            {
                if (target)
                {
                
                    edgeStyle += 'entryX=' + targetPoint.x + ';entryY=' + targetPoint.y + ';';
                }
                else
                {
                    e.geometry.targetPoint = targetPoint;
                }
            }

            //Labels
            var lbls = obj.line.captions;

            if (lbls.length > 0)
            {
                //Add basic support for multiple labels by joining them together
                var lbl = '';

                for (var i = 0; i < lbls.length; i++)
                {
                    lbl += lbls[i].text;
                }

                e.value = lbl;
                e.geometry.offset = new mxPoint(lbls[0].position.x, lbls[0].position.y);

                edgeStyle += 'labelBackgroundColor=none;fontSize=' + lbls[0].fontSize
                            + ';fontColor=' + colorNum2Hex(lbls[0].color) + ';';
            }

            e.style = buildStyleString(edgeStyle, parseStyles(obj));
            graph.addCell(e, null, null, source, target);
        }
        catch (e)
        {
            console.error(e);
        }
    }

    function createGraph()
	{
		var graph = new Graph();
        graph.setExtendParents(false);
        graph.setExtendParentsOnAdd(false);
        graph.setConstrainChildren(false);
        graph.setHtmlLabels(true);
        graph.getModel().maintainEdgeParent = false;
        return graph;
	};

    this.importMiroJson = function(data)
    {
        try
        {
            var graph = createGraph();
            //Currently this handles version 2
            if (data.version != 2)
            {
                throw new Error('Unsupported Version');
            }

            var objects = data.data.objects;
            var edges = [], vertexes = {}, tags = [];

            for (var i = 0; i < objects.length; i++)
            {
                var o = objects[i];

                if (o.type == 13) //Tags (assuming they are always at the top)
                {
                    tags.push({color: colorNum2Hex(o.color), text: o.text});
                }
                else if (o.type == 14)
                {
                    var obj = o.widgetData;
                    var type = obj.type;
                    obj = obj.json;

                    if (type == 'line')
                    {
                        edges.push(obj);
                    }
                    else
                    {
                        vertexes[i] = importVertex(obj, type, tags, graph);
                    }
                }
            }

            for (var i = 0; i < edges.length; i++)
            {
                importEdge(edges[i], vertexes, tags, graph);
            }

            var node = new mxCodec().encode(graph.getModel());
            return mxUtils.getXml(node);
        }
        catch (e)
        {
            console.error(e);
        }
    }
}