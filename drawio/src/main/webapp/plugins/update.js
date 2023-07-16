/**
 * Update plugin. Use updateUrl and updateInterval (optional, default is 60000ms)
 * in the meta data of the diagram to configure the plugin. (Alternatively, the
 * update-url and update-interval URL parameters may be used instead.)
 * 
 * It will send the XML of the current page to the given URL as a POST request
 * (with a parameter called xml) and allows for the following type of XML response
 * (with CORS headers):
 * 
 * <updates>
 * <update ...>
 * <model>...</model>
 * <view ...>
 * <fit ...>
 * </updates>
 * 
 * The outermost updates node may contain an optional url and interval property
 * to change the current updateUrl and updateInterval.
 * 
 * Where update must contain an id attribute to reference the cell in the diagram.
 * 
 * - An optional value attribute that contains XML markup is used as the value for
 * the cell, with label and tooltip for the label and tooltip, respectively.
 * Additionally, placeholders="1" can be used to enable placeholders in the label
 * or tooltip of the cell.
 * 
 * Example: <object label="Hello, %var1%!" var1="World" tooltip=
 * 		"Click <a href=\"https://www.draw.io\">here</a>" placeholders="1">
 * 
 * - An optional replace-value attribute that contains 1 can be specified to
 * replace the value of the cell. Default is to add the attributes of the XML
 * value specified above to the existing value of the cell. (Attributes with
 * an empty string value are removed.)
 * 
 * - An optional style attribute that contains the cell style is used to replace
 * the existing cell style.
 * 
 * Example: fillColor=red;gradientColor=white;"
 * 
 * - An optional icon attribute that contains JSON is used to add an icon to the
 * given cell. The object value that the icon attribute is parsed and may contain
 * a tooltip (string), align ("left"|"center"|"right", default is "right"), valign
 * (top|middle|bottom, default is bottom) and append (true|false, default is false)
 * for adding or replacing existing icons. The image attribute is an object value
 * with src, width and height for defining the icon to be displayed (default is
 * mxGraph.warningImage). An empty string for the attribute removes all icons.
 * 
 * Example: JSON.stringify({tooltip: 'Locked', append: true, image:
 * 		{src: IMAGE_PATH + '/locked.png', width: 26, height:26}}
 * 
 * - An optional geometry attribute that contains a JSON mxGeometry object can be used
 * to replace the current geometry of the refenced cell. In addition to the existing
 * field names in mxGeometry, dx and dy can be used to define a vector for moving the
 * shape, and dh and dw can be used to resize the cell.
 * 
 * Example: JSON.stringify({dx: (Math.random() * 100) - 50, dh: (Math.random() * 100) - 50}))
 * 
 * - Additionally a model node may be specified to set the current graph model.
 * 
 * Example: <model><mxGraphModel><root><mxCell id="0"/></mxCell>...</root></mxGraphModel></model>
 * 
 * - A view node may be specified with a scale, dx and dy attribute to change the current
 * scale and translate.
 * 
 * Example: <view scale="0.5" dx="100" dy="100"/>
 * 
 * - A fit node may be specified with a max-scale property to fit the diagram to the
 * available viewport with the specified max-scale.
 */
Draw.loadPlugin(function(editorUi)
{
	if (editorUi.editor.isChromelessView())
	{
		var graph = editorUi.editor.graph;
		var updateInterval = parseInt(urlParams['update-interval'] || 60000);
		var updateUrlParam = urlParams['update-url'];
		var updateUrl = null;
		
		if (updateUrlParam != null)
		{
			updateUrl = decodeURIComponent(updateUrlParam);
			
			// Creates empty file if update URL is in URL parameter
			if (editorUi.createFile != null && editorUi.getCurrentFile() == null)
			{
				editorUi.createFile(editorUi.defaultFilename, null, null, null, null, null, null, true);
			}
		}
		
		function createOverlay(desc)
		{
			var overlay = new mxCellOverlay(desc.image || graph.warningImage,
				desc.tooltip, desc.align, desc.valign, desc.offset);

			// Installs a handler for clicks on the overlay
			overlay.addListener(mxEvent.CLICK, function(sender, evt)
			{
				editorUi.alert(desc.tooltip);
			});
			
			return overlay;
		};
		
		function parseResponse(xml)
		{
			var doc = editorUi.updateDiagram(xml);
			var node = (doc != null) ? doc.documentElement : null;
			
			if (node != null && node.nodeName == 'updates')
			{
				if (node.hasAttribute('url'))
				{
					updateUrl = node.getAttribute('url');
				}
				
				if (node.hasAttribute('interval'))
				{
					updateInterval = node.getAttribute('interval');
				}
			}
		};
		
		var currentThread = null;
		
		function scheduleUpdates()
		{
			var page = editorUi.currentPage;
			var root = editorUi.editor.graph.getModel().getRoot();
			var result = false;
			
			if (urlParams['update-url'] || (root.value != null && typeof(root.value) == 'object'))
			{
				if (root.value != null && typeof(root.value) == 'object')
				{
					updateInterval = parseInt(root.value.getAttribute('updateInterval') || updateInterval);
					updateUrl = root.value.getAttribute('updateUrl') || updateUrl;
				}
				
				if (updateUrl != null)
				{
					var currentXml = mxUtils.getXml(editorUi.editor.getGraphXml());
					
					function doUpdate()
					{
						if (updateUrl === 'demo')
						{
							parseResponse(mxUtils.getXml(createDemoResponse().documentElement));	
							schedule();
						}
						else
						{
							mxUtils.post(updateUrl, 'xml=' + encodeURIComponent(currentXml), function(req)
							{
								if (page === editorUi.currentPage)
								{
									if (req.getStatus() >= 200 && req.getStatus() <= 300)
									{
										parseResponse(mxUtils.getXml(req.getDocumentElement()));
										schedule();
									}
									else
									{
										editorUi.handleError({message: mxResources.get('error') + ' ' +
											req.getStatus()});
									}
								}
							}, function(err)
							{
								editorUi.handleError(err);
							});
						}
					};
					
					function schedule()
					{
						currentThread = window.setTimeout(doUpdate, updateInterval);
					};
					
					doUpdate();
					result = true;
				}
			}
			
			return result;
		};
		
		function startUpdates()
		{
			var result = scheduleUpdates();
			
			if (result)
			{
				editorUi.editor.addListener('pageSelected', function()
				{
					window.clearTimeout(currentThread);
					scheduleUpdates();
				});
			}
			
			return result;
		};
		
		function createDemoResponse()
		{
			var doc = mxUtils.createXmlDocument();
			var status = doc.createElement('updates');

			for (var id in graph.model.cells)
			{
				var cell = graph.model.cells[id];
				
				if (graph.model.isEdge(cell))
				{
					// Ignores short edges
					var state = graph.view.getState(cell);
					
					if (Math.random() > 0.5 && state != null && state.length > 50)
					{
						var update = doc.createElement('update');
						update.setAttribute('id', cell.id);
						update.setAttribute('value', '<object label="%load% minutes" load="' +
							Math.round(Math.random() * 100) + '" placeholders="1">');
						update.setAttribute('style', cell.style + ';strokeColor=red;strokeWidth=' +
							Math.round(Math.random() * 5) + ';');
						status.appendChild(update);
					}
					else
					{
						var update = doc.createElement('update');
						update.setAttribute('id', cell.id);
						update.setAttribute('value', '<object label="" load="' +
							Math.round(Math.random() * 100) + '" placeholders="1">');
						update.setAttribute('style', cell.style + ';strokeColor=black;strokeWidth=;');
						status.appendChild(update);
					}
				}
				else if (graph.model.isVertex(cell))
				{
					// For the purpose of the demo we flag stuff to update with update="1".
					// This is not needed for the general case.
					if (cell.value != null && typeof(cell.value) == 'object' &&
						cell.value.getAttribute('update') == '1')
					{
						// Restores original style in demo roundtrip
						if (cell.prevStyle == null)
						{
							cell.prevStyle = cell.style;
						}
						
						if (Math.random() > 0.5)
						{
							var update = doc.createElement('update');
							update.setAttribute('id', cell.id);
							update.setAttribute('value', '<object tooltip="%load%% Done" load="' +
								Math.round(Math.random() * 100) + '" placeholders="1">');
							update.setAttribute('style', cell.prevStyle + ';fillColor=red;gradientColor=white;');
							update.setAttribute('icon', JSON.stringify({tooltip: 'Alert', align: 'right',
								valign: 'top', image: {src: 'https://www.draw.io/mxgraph/images/warning.gif', width: 26, height: 26}}));
//							update.setAttribute('geometry', JSON.stringify({dx: (Math.random() * 100) - 50,
//								y: cell.geometry.y + (Math.random() * 100) - 50, dh: (Math.random() * 100) - 50}));
							status.appendChild(update);
							
							// Adds another icon
							if (Math.random() > 0.5)
							{
								var update = doc.createElement('update');
								update.setAttribute('id', cell.id);
								update.setAttribute('icon', JSON.stringify({tooltip: 'Busy', append: true,
									image: {src: IMAGE_PATH + '/spin.gif', width: 26, height:26}}));
								status.appendChild(update);
							}
						}
						else
						{
							var update = doc.createElement('update');
							update.setAttribute('id', cell.id);
							update.setAttribute('style', cell.prevStyle + ';fillColor=#d4e1f5;gradientColor=white;');
							update.setAttribute('value',
								'<object tooltip="Click <a href=\"https://www.draw.io\">here</a>">');
							update.setAttribute('icon', '');
							status.appendChild(update);
						}						
					}
				}
			}

//			var modelNode = mxUtils.parseXml('<model><mxGraphModel>  <root>    <mxCell id="0"/>    <mxCell id="1" parent="0"/>    <mxCell id="12" value="Program" style="rounded=0;shadow=0;strokeWidth=1;fontSize=12;fillColor=#F0F0F0;" vertex="1" parent="1">      <mxGeometry x="274" y="227" width="100" height="40" as="geometry"/>    </mxCell>    <mxCell id="13" value="PDF&#xa;Outline" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="80" y="247" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="14" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="13" target="12" parent="1">      <mxGeometry relative="1" as="geometry"/>    </mxCell>    <mxCell id="15" value="HTML&#xa;Outline" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="118" y="140" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="16" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="15" target="12" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="267" y="158.2814070351758" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="17" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="18" target="12" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="413.7317073170732" y="171" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="18" value="Name" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="274" y="100" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="19" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="20" target="12" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="464.5244755244755" y="227" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="20" value="Description" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="437" y="124" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="21" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="22" target="12" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="436.80419580419584" y="319" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="22" value="Admission&#xa;Deadline" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="495" y="216" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="23" value="courses" style="rhombus;whiteSpace=wrap;html=1;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="284" y="349" width="80" height="50" as="geometry"/>    </mxCell>    <mxCell id="24" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="23" target="12" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="495.26224188188667" y="238.15603653581252" as="sourcePoint"/>        <mxPoint x="374" y="244.4537037037037" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="25" value="Course" style="rounded=0;shadow=0;strokeWidth=1;fontSize=12;fillColor=#F0F0F0;" vertex="1" parent="1">      <mxGeometry x="274" y="458" width="100" height="40" as="geometry"/>    </mxCell>    <mxCell id="26" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="23" target="25" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="324" y="349" as="sourcePoint"/>        <mxPoint x="324" y="267" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="27" value="Course&#xa;Number" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="80" y="418" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="28" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="27" target="25" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="271.91489361702133" y="652" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="29" value="Subject" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="80" y="514" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="30" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="29" target="25" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="274" y="563.9497487437186" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="31" value="PDF&#xa;Outline" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="163" y="587" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="32" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="31" target="25" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="364" y="584.070351758794" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="33" value="HTML&#xa;Outline" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="279" y="626" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="34" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="33" target="25" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="401.97468354430384" y="537" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="35" value="Description" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="420" y="567" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="36" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="35" target="25" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="465" y="456" as="targetPoint"/>      </mxGeometry>    </mxCell>    <mxCell id="37" value="Name" style="ellipse;rounded=0;shadow=0;strokeWidth=1;fillColor=none;fontSize=12;" vertex="1" parent="1">      <mxGeometry x="495" y="458" width="90" height="40" as="geometry"/>    </mxCell>    <mxCell id="38" style="rounded=0;html=0;shadow=0;startArrow=none;endArrow=none;endFill=0;endSize=10;strokeColor=#000000;strokeWidth=1;fontSize=12;startFill=0;" edge="1" source="37" target="25" parent="1">      <mxGeometry relative="1" as="geometry">        <mxPoint x="437.1935483870968" y="381" as="targetPoint"/>      </mxGeometry>    </mxCell>  </root></mxGraphModel></model>');
//			status.appendChild(modelNode.documentElement);
//			
//			var fitNode = mxUtils.parseXml('<view scale="0.5" dx="0"/>');
//			status.appendChild(fitNode.documentElement);
			
			doc.appendChild(status);
			
			return doc;
		};
		
		// Wait for file to be loaded if no animation data is present
		if (!startUpdates())
		{
			editorUi.editor.addListener('fileLoaded', startUpdates);
		}
	}
});
