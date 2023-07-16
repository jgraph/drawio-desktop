(function()
{
	// Adds ER shapes
	Sidebar.prototype.addErPalette = function()
	{
		// Avoids having to bind all functions to "this"
		var sb = this;

		// Reusable cells
		var row = new mxCell('Item', new mxGeometry(0, 0, 40, 30), 'text;strokeColor=none;fillColor=none;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontSize=12;whiteSpace=wrap;html=1;');
		row.vertex = true;

		// Predefined dimensions
		var w = 100;
		var h = 100;
		
		// Default tags
		var dt = 'db database schema er entity relation table ';
		
		function createEdge(style, m, n)
		{
			var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), style);
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(160, 0), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
			if (m != null)
			{
		    	var cell1 = new mxCell(m, new mxGeometry(-1, 0, 0, 0), 'resizable=0;html=1;whiteSpace=wrap;align=left;verticalAlign=bottom;');
		    	cell1.geometry.relative = true;
		    	cell1.setConnectable(false);
		    	cell1.vertex = true;
		    	edge.insert(cell1);
			}
			
			if (n != null)
			{
		    	var cell2 = new mxCell(n, new mxGeometry(1, 0, 0, 0), 'resizable=0;html=1;whiteSpace=wrap;align=right;verticalAlign=bottom;');
		    	cell2.geometry.relative = true;
		    	cell2.setConnectable(false);
		    	cell2.vertex = true;
		    	edge.insert(cell2);
			}
			
			return edge;
		};
		
		this.setCurrentSearchEntryLibrary('er');
		
		var fns = [
	   		this.addDataEntry(dt, 180, 160, 'Table 1', '7ZnfbpswFMafhtuJPyNrbqFbNy2TpqZ7ADc+AUvGZsYZSZ9+x9gkVQhtMqVkopGIZB8fn9jfz/4uwIvSYn2nSJn/kBS4F332olRJqW2rWKfAuRf6jHrRrReGPv688EvPaNCM+iVRIPQxE0I74Q/hK7CRB/LIwUYrveEuWuWkNE3djEZJpYnSc/ZkYpGPgYUUmjABCgNB0+eclBVr0m0kZ5zOyEaudFuo7SVLtgZ6L+vK5SpZz7CY6ZriSyw+d4sxw4SzTGB7gbs0/5goqHAtM1Jpl5Hrgrum2yEoDetelZqQk+gOZAFabTClZlTnLuPGKunnwLK8nRa7IKlsINvO3YmODaf7YQZRh8HL8qNOZodSsScjOnciPUfS9GtWcCLgKxC6F0ok3bTSMs5TyaXhJqSADjqTRJUsH4jKQLtAKZnQzZbjBB8UIfU/xF6Ma02xH+z6+Jh0pVMpKq3wiJgagKRqMLQSLUtXlMOyra+cxKb9KLWWxSkww8MwN05uh+w1ttEZ0H7soP35vRcubkEzwu9hoYnIuEUhhOnuUBzgdVDBrWr7cu7fJYliLrk5Urc5oxTwXiV1zjTMS7IwSTWa0z/cqOjVGxWdKLorttPn5GqEo10IovECrAStOiS36zwKbtyB+0uw3yv4dnthxK092tykQpBMZDM7c7J3BuLhz8C6/yLGZz0TR5U776GYXM38KDP3z2PmkwHN/NPxaIe550BZW+8tnXwyeie/6ZA11zL0g//dyAdGPmbjnl6Ne0jjng5o3IH/Tp17OnrnDoIe67404YtZdw/zMVt30H2LdfXuN/TuIBzSvE94PTYq8w56IIzJvbvvx6x7R+/Vvfugj8i+sbv7vmHTn3/++As='),
	   		this.addDataEntry(dt, 180, 160, 'Table 2', '7Zlvb9owEMY/Td5O+VNYeZt07aQyaSr9Ai4+EkuOHTlmgX76nWOnUELWINFQZUgg+S7nI35+9gMKXpTkmwdFiuyXpMC96IcXJUpKbUf5JgHOvdBn1IvuvDD08e2F9x1Xg/qqXxAFQveZENoJfwhfg808kxcONlvqLXfZMiOFGer6ahSXmii9YK8mF/mYWEqhCROgMBHUMeekKFldbjMZ43ROtnKtm0ZNFK/YBuiTrEpXq2Q1x2YmNM1X2HzhbsZcJpylAsdLXKX5xFhBifcyJ6V2FZnOuRtWGdOwKMjSzK5Qacy5VYPSsOlUrk452R5A5qDVFksqRnXmKm6tun4GLM2aaROXJKVNpG9zdyBw4Fgc5xK1uPwbCWpnVi0VezUguBNuH1MdVyznRMBPIPQgFUu6beRmnCeSS8NSSAEtnKaIKlk8E5WCdolCMqHrJU9ifKEIif9t4k3wXhOMg12ML1OudCJFqRVuG9MDkF4FhmCsZeGaclg1/ZWT2IxfpNYyd8Ee615cw+Nct055R+8jzNEZKN+0KP9+RJnuH4NO2rgQzQh/gqUmIuWWjRAm3LE5AvCopO9k3Nf38MBJlHTFzR67yxilIM50xKIPj9j0ROlds50+J3cjHD1FEI0nYi1o2eL5dp+9EE9aiM1RDf1LE24s1NbGJcJjIp3bmdODLTAZfgts3gPbP43hWbdEr3bn3RPTq7n3MveDL/IzmPux7fRZ5v69y9y7aY/L3KejN/fbDnO/NOEvY+4dW2DM5j67mvuFfrnPBjT3wO+PeZgzD5Q1/T7T1GejN/Ug6HD16Ku7+sDMx+ziQfvB2NXGh7HxN9qD+PgJD9pG5eNBB4QxGXn78Zo18pv/1ci7oI/IyTHc/Xtiy/f/XPkL'),
	   		this.addDataEntry(dt, 180, 30, 'Table Row 1', 'xVVdj5swEPw1vFYEmuqe4drrQ/py6R/Yizdg1XiRvTmS+/VdY3P5uJxK1FYngeQZ1sN6BpusrLv9g4O+/UEKTVZ+zcraEXEcdfsajcmKXKusvM+KIpc7K76983QxPs17cGh5zoQiTngGs8PIRMLzwSTCt9CHIcNToCrP4HitXwKXC96QZdAWneDFiI2B3uuxOjKtNmoFB9rxpDOhaqv3qB5p8KnW0bASMZ/EtyK+Tr0EDEY3VsYbWV94Y+XQSysr8JwEPDv6hTUZCg1Zsji+xZgL6rzNoD20mnHdwyYQg0QiXMudScLJKXSM+3fdHqlk9QNSh+wOUjJoxW2quIuJ5C3qpk3TysSBj7h5nXrMTgYpvutRljdGKaaHBZLTLyFBk1y4jNcPujNg8TuCuqAqUocppzkGK0f9T3ANciJ60pbHJS8rucSEOv+0zJbSay14ccRyhXLHNVlJWL63oIES+4Ah+oqpT6IGt5O+Sw6H8RMxU5fArCyLj8vy8/wspWPWYB5xw2AbE523NsCj81fiuWrYmUmn7qHSk17YCyTWbU34gO5brRTauZ6Wf/S0vNHSJHZc/81qYOQoscDyPe+s8m9yeu1zVnTLN9GFjfax6U2nZqytvJxx2jarOPPLf8hzf+706ZZZ/tN8Z8n9VcACj7/jWH76t/4N'),
	   		this.addDataEntry(dt + ' fk pk foreign key primary', 180, 30, 'Table Row 2', 'xVXbjpswEP0aXisCpeozpHtR05dN+wHeeAJWjYfak0L26zvGzuauErVSJJA8h/FhfM7YTvKqHR6t6JpvKEEn+ZckrywihVE7VKB1kqVKJvk8ybKU3yR7uPJ1Nn5NO2HB0JQJWZjwW+gNBCQAjrY6Aq4RnR+SePVQ6UhYWqo3j6Ucr9CQUAYsx7Mx1lp0To3ZAWmUlguxxQ3teHZRuVYDyBfsXcy12C+YzEXyNZMvYy0+FlrVhscrXp//Y2nBcSkL4SgSOLL4EyrU6AsyaGD8i9Yn0HGZnjtKAZZguCrnCEUtHwFbILvllF5JamLG5yB52oCqmzgtj5hwIa7fp+7N4UH057JX+Y1esaq8qgatevMW6bjMU/9cr1otDDyBkCdQiXK7M2KKgtJi913YGigCHSpD45KLkh8WoUo/FEnBtVYcz/YxPz7dUoWGLeSG8hzAvvbgvS0Ju0iqYb3jt1FhP35FImxv8TK7n5cfz7x8+HrVTa6ZlNAvsCJhah20N8aHe+0vGHRRsiOZDvU73WrI6q2176F5o6QE3nZl3yiCZSdWPqnnU8s3GLU67r1Jqud/VT2/UfRIttfnZjah+TQxgrjjN0a6Myff65xkbnFm7g+jfm3geX5ni3enZ8gtHRupTL0IMz/dvweGY3cON2LxX3tiEt0/NQWH+1s8pB9e8n8A'),
	   		this.addDataEntry(dt + ' fk pk foreign key primary', 180, 30, 'Table Row 3', 'xVXbjpswEP0aXisCpeozpN2tmkrVpv0AbzwBa42H2pNC9us7xs5lc9EStepKIHkO48P4nLGd5FU73FnRNd9Qgk7yT0leWUQKo3aoQOskS5VM8nmSZSm/Sfb5ytfZ+DXthAVDUyZkYcJvoTcQkAA42uoIuEZ0fkji0UOlI2FpqZ49lnK8QkNCGbAcz8ZYa9E5NWYHpFFaLsQWN7Tj2UXlWg0gH7B3Mddiv2AyF8nXTL6MtfhYaFUbHq94ff6PpQXHpSyEo0jgyOITVKjRF2TQwPgXrU+gl2V67igFWILhqpwjFLW8A2yB7JZTeiWpiRkfg+RpA6pu4rQ8YsKFuN5PPZjDg+jPZa/yG71iVXlVDVr17C3ScZmn/rletVoYuAchT6AS5XZnxBQFpcXuh7A1UAQ6VIbGJRclPyxClb4rkoJrrTieHWJ+fLqlCg1byA3lOYB97cF7WxJ2kVTDesdvo8J+/IhE2MYumORl9nZevj/z8vvXq25yzaSEfoAVCVProL0xPjxof8Ggi5LtZTrV73ireQmR1Vtr30PzRkkJvO3KvlEEy06sfFLPp5ZvMGr1Larnr6qe3yh6JDvoczOb0HyaGEHc8Rsj3ZmT+zonmVucmfvTqF8b+DJ/Y4t3p2fILR0bqUy9CDM/nPRA8f97YHjpzvFGLP5pT0yi+6um4PBwi4f040v+Dw=='),
	   		this.addEntry(dt + ' list', function()
			{
				var cell = new mxCell('List', new mxGeometry(0, 0, 160, 110),
			    	'swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;align=center;fontSize=14;');
				cell.vertex = true;
				cell.insert(sb.cloneCell(row, 'Item 1'));
				cell.insert(sb.cloneCell(row, 'Item 2'));
				cell.insert(sb.cloneCell(row, 'Item 3'));
		
				return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'List');
			}),
			this.addEntry(dt + ' list', function()
			{
				return sb.createVertexTemplateFromCells([row.clone()], row.geometry.width, row.geometry.height, 'List Item 1');
			}),
			this.addEntry(dt + 'table row', function()
			{
	   			var cell = new mxCell(row.value, new mxGeometry(0, 0, 90, row.geometry.height), 'shape=partialRectangle;fillColor=none;align=left;verticalAlign=middle;strokeColor=none;spacingLeft=34;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;dropTarget=0;');	
	   			cell.vertex = true;

	   			var cell1 = sb.cloneCell(row, '');
	   			cell1.connectable = false;	
	   			cell1.style = 'shape=partialRectangle;top=0;left=0;bottom=0;fillColor=none;stokeWidth=1;dashed=1;align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[];portConstraint=eastwest;part=1;'	
	   			cell1.geometry.width = 30;	
	   			cell.insert(cell1);	

				return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'List Item 2');	
			}),
			this.addEntry(dt + 'table row divider hline line separator', function()
			{
				var divider = new mxCell('', new mxGeometry(0, 0, 60, 10), 'line;strokeWidth=1;rotatable=0;dashed=0;labelPosition=right;align=left;verticalAlign=middle;spacingTop=0;spacingLeft=6;points=[];portConstraint=eastwest;');	
				divider.vertex = true;	

				return sb.createVertexTemplateFromCells([divider], divider.geometry.width, divider.geometry.height, 'List Item 3');	
			}),
	   		this.addEntry(dt + 'table', function()
			{
	   			var cell = new mxCell('Entity', new mxGeometry(0, 0, 160, 120),
	   		    	'swimlane;childLayout=stackLayout;horizontal=1;startSize=50;horizontalStack=0;rounded=1;fontSize=14;fontStyle=0;strokeWidth=2;resizeParent=0;resizeLast=1;shadow=0;dashed=0;align=center;arcSize=4;whiteSpace=wrap;html=1;');
	   			cell.vertex = true;
	   			
	   			var cell1 = new mxCell('+Attribute1\n+Attribute2\n+Attribute3', new mxGeometry(0, 30, 160, 90),
	   				'align=left;strokeColor=none;fillColor=none;spacingLeft=4;fontSize=12;verticalAlign=top;resizable=0;rotatable=0;part=1;html=1;');
	   			cell1.vertex = true;

				cell.insert(cell1);
				
				return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Entity');
			}),
			this.createVertexTemplateEntry('whiteSpace=wrap;html=1;align=center;', 100, 40, 'Entity', 'Entity', null, null, dt),
			this.createVertexTemplateEntry('rounded=1;arcSize=10;whiteSpace=wrap;html=1;align=center;', 100, 40, 'Entity', 'Entity (Rounded)', null, null, dt + 'chen'),
			this.createVertexTemplateEntry('shape=ext;margin=3;double=1;whiteSpace=wrap;html=1;align=center;', 100, 40, 'Entity', 'Weak Entity', null, null, dt + 'chen'),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;align=center;',
				100, 40, 'Attribute', 'Attribute', null, null, dt + 'attribute chen'),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;align=center;fontStyle=4;',
				100, 40, 'Attribute', 'Key Attribute', null, null, dt + 'attribute key chen'),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;align=center;',
				100, 40, '<span style="border-bottom: 1px dotted">Attribute</span>', 'Weak Key Attribute', null, null, dt + 'attribute key weak chen'),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;align=center;dashed=1;',
				100, 40, 'Attribute', 'Derived Attribute', null, null, dt + 'attribute derived chen'),
			this.createVertexTemplateEntry('ellipse;shape=doubleEllipse;margin=3;whiteSpace=wrap;html=1;align=center;',
				100, 40, 'Attribute', 'Multivalue Attribute', null, null, dt + 'attribute multivalue chen'),
			this.createVertexTemplateEntry('shape=associativeEntity;whiteSpace=wrap;html=1;align=center;',
				140, 60, 'Associative\nEntity', 'Associative Entity', null, null, dt + 'associative entity chen'),
			this.createVertexTemplateEntry('shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;align=center;',
				120, 60, 'Relationship', 'Relationship', null, null, dt + 'chen'),
			this.createVertexTemplateEntry('shape=rhombus;double=1;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;align=center;',
				120, 60, 'Relationship', 'Identifying Relationship', null, null, dt + 'chen'),
			this.createVertexTemplateEntry('ellipse;shape=cloud;whiteSpace=wrap;html=1;align=center;', 100, 60, 'Cloud', 'Cloud', null, null, dt + 'cloud'),
			
	   	 	this.addEntry(dt + 'hierarchy', function()
	   		{
			   	var cell = new mxCell('', new mxGeometry(0, 0, 100, 100), 'rounded=1;absoluteArcSize=1;html=1;arcSize=10;');
			   	cell.vertex = true;
			   	
			   	var cell1 = new mxCell('main', new mxGeometry(0, 0, 50, 100), 'html=1;shape=mxgraph.er.anchor;whiteSpace=wrap;');
			   	cell1.vertex = true;
			   	cell.insert(cell1);
			   	
			   	var cell2 = new mxCell('sub', new mxGeometry(50, 5, 45, 90), 'rounded=1;absoluteArcSize=1;html=1;arcSize=10;whiteSpace=wrap;points=[];strokeColor=inherit;fillColor=inherit;');
			   	cell2.vertex = true;
			   	cell.insert(cell2);
				
				return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Hierarchy'); 
	   		}),
			
			this.createVertexTemplateEntry('shape=note;size=20;whiteSpace=wrap;html=1;', w, h, 'Note', 'Note', null, null, dt + 'note'),
			
			this.addEntry(dt + 'relation chen', function()
			{
				return sb.createEdgeTemplateFromCells(
					[createEdge('endArrow=none;html=1;rounded=0;')],
					160, 0, 'Untitled Relation');
			}),
			this.addEntry(dt + 'mandatory participation chen', function()
			{
				return sb.createEdgeTemplateFromCells(
					[createEdge('endArrow=none;html=1;rounded=0;', null, '1')],
					160, 0, 'Mandatory Participation (0:1)');
			}),
			this.addEntry(dt + 'mandatory participation chen', function()
			{
				return sb.createEdgeTemplateFromCells(
					[createEdge('endArrow=none;html=1;rounded=0;', null, 'N')],
					160, 0, 'Mandatory Participation (0:N)');
			}),
			this.addEntry(dt + 'mandatory participation chen', function()
			{
				return sb.createEdgeTemplateFromCells(
					[createEdge('endArrow=none;html=1;rounded=0;', 'M', 'N')],
					160, 0, 'Mandatory Participation (M:N)');
			}),
			this.addEntry(dt + 'optional participation chen', function()
			{
				return sb.createEdgeTemplateFromCells(
					[createEdge('endArrow=none;html=1;rounded=0;dashed=1;dashPattern=1 2;', null, '1')],
					160, 0, 'Optional Participation (0:1)');
			}),
			this.addEntry(dt + 'optional participation chen', function()
			{
				return sb.createEdgeTemplateFromCells(
					[createEdge('endArrow=none;html=1;rounded=0;dashed=1;dashPattern=1 2;', null, 'N')],
					160, 0, 'Optional Participation (0:N)');
			}),
			this.addEntry(dt + 'optional participation chen', function()
			{
				return sb.createEdgeTemplateFromCells(
					[createEdge('endArrow=none;html=1;rounded=0;dashed=1;dashPattern=1 2;', 'M', 'N')],
					160, 0, 'Optional Participation (M:N)');
			}),
			this.addEntry(dt + 'recursive relationship chen', function()
			{
				return sb.createEdgeTemplateFromCells(
					[createEdge('shape=link;html=1;rounded=0;', null, '1')],
					160, 0, 'Recursive Relationship (0:1)');
			}),
			this.addEntry(dt + 'recursive relationship chen', function()
			{
				return sb.createEdgeTemplateFromCells(
					[createEdge('shape=link;html=1;rounded=0;', null, 'N')],
					160, 0, 'Recursive Relationship (0:N)');
			}),
			this.addEntry(dt + 'recursive relationship chen', function()
			{
				return sb.createEdgeTemplateFromCells(
					[createEdge('shape=link;html=1;rounded=0;', 'M', 'N')],
					160, 0, 'Recursive Relationship (M:N)');
			}),
			this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERzeroToMany;endFill=1;', w, h, '', '0 to Many Optional', null, dt + 'zero many optional'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERoneToMany;', w, h, '', '1 to Many', null, dt + 'one many'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERmandOne;', w, h, '', '1 Mandatory', null, dt + 'one mandatory'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERmandOne;startArrow=ERmandOne;', w, h, '', '1 to 1', null, dt + 'one'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERone;endFill=1;', w, h, '', '1', null, dt + 'one'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERzeroToOne;endFill=1;', w, h, '', '0 to 1', null, dt + 'zero one'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERmany;', w, h, '', 'Many', null, dt + 'many'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERmany;startArrow=ERmany;', w, h, '', 'Many to Many', null, dt + 'many'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERzeroToMany;startArrow=ERzeroToOne;', w, h, '', '1 Optional to Many Optional', null, dt + 'one optional many'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERzeroToMany;startArrow=ERmandOne;', w, h, '', '1 Mandatory to Many Optional', null, dt + 'one mandatory many optional'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERzeroToOne;startArrow=ERmandOne;', w, h, '', '1 Mandatory to 1 Optional', null, dt + 'one mandatory optional'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERoneToMany;startArrow=ERmandOne;', w, h, '', '1 Mandatory to Many Mandatory', null, dt + 'one mandatory many'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERoneToMany;startArrow=ERzeroToOne;', w, h, '', '1 Optional to Many Mandatory', null, dt + 'one optional mandatory many'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERoneToMany;startArrow=ERoneToMany;', w, h, '', 'Many Mandatory to Many Mandatory', null, dt + 'mandatory many'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERoneToMany;startArrow=ERzeroToMany;', w, h, '', 'Many Optional to Many Mandatory', null, dt + 'mandatory many optional'),
		 	this.createEdgeTemplateEntry('edgeStyle=entityRelationEdgeStyle;fontSize=12;html=1;endArrow=ERzeroToMany;endFill=1;startArrow=ERzeroToMany;', w, h, '', 'Many Optional to Many Optional', null, dt + 'many optional')
	 	];

		this.addPaletteFunctions('er', mxResources.get('entityRelation'), false, fns);
		
		this.setCurrentSearchEntryLibrary();

	};

})();
