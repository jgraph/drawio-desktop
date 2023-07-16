/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.DIFF_INSERT = 'i';

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.DIFF_REMOVE = 'r';

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.DIFF_UPDATE = 'u';

/**
 * Shared codec.
 */
EditorUi.transientViewStateProperties = ['defaultParent', 'currentRoot', 'scrollLeft',
	'scrollTop', 'scale', 'translate', 'lastPasteXml', 'pasteCounter'];

/**
 * Contains all view state properties that should not be ignored in diff sync.
 */
EditorUi.prototype.viewStateProperties = {background: true, backgroundImage: true, shadowVisible: true,
	foldingEnabled: true, pageScale: true, mathEnabled: true, pageFormat: true, extFonts: true};

/**
 * Contains all known cell properties that should be ignored for a generic cell diff.
 */
EditorUi.prototype.cellProperties = {id: true, value: true, xmlValue: true, vertex: true, edge: true,
	visible: true, collapsed: true, connectable: true, parent: true, children: true, previous: true,
	source: true, target: true, edges: true, geometry: true, style: true, overlays: true,
	mxObjectId: true, mxTransient: true};

/**
 * Shared codec.
 */
EditorUi.prototype.codec = new mxCodec();

/**
 * Applies the given patches to the given pages.
 */
EditorUi.prototype.applyPatches = function(pages, patches, markPages, resolver, updateEdgeParents)
{
	if (patches != null)
	{
		for (var i = 0; i < patches.length; i++)
		{
			if (patches[i] != null)
			{
				pages = this.patchPages(pages, patches[i],
					markPages, resolver, updateEdgeParents);
			}
		}
	}

	return pages;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.patchPages = function(pages, diff, markPages, resolver, updateEdgeParents)
{
	var resolverLookup = {};
	var newPages = [];
	var inserted = {};
	var removed = {};
	var lookup = {};
	var moved = {};
	
  	if (resolver != null && resolver[EditorUi.DIFF_UPDATE] != null)
	{
  		for (var id in resolver[EditorUi.DIFF_UPDATE])
  		{
  			resolverLookup[id] = resolver[EditorUi.DIFF_UPDATE][id];
		}
	}

	if (diff[EditorUi.DIFF_REMOVE] != null)
	{
		for (var i = 0; i < diff[EditorUi.DIFF_REMOVE].length; i++)
		{
			removed[diff[EditorUi.DIFF_REMOVE][i]] = true;
		}
	}

	if (diff[EditorUi.DIFF_INSERT] != null)
	{
		for (var i = 0; i < diff[EditorUi.DIFF_INSERT].length; i++)
		{
			inserted[diff[EditorUi.DIFF_INSERT][i].previous] = diff[EditorUi.DIFF_INSERT][i];
		}
	}
	
	if (diff[EditorUi.DIFF_UPDATE] != null)
	{
		for (var id in diff[EditorUi.DIFF_UPDATE])
		{
			var pageDiff = diff[EditorUi.DIFF_UPDATE][id];
			
			if (pageDiff.previous != null)
			{
				moved[pageDiff.previous] = id;
			}
		}
	}
	
	// Restores existing order and creates lookup
  	if (pages != null)
  	{
		var prev = '';
		
		for (var i = 0; i < pages.length; i++)
		{
			var pageId = pages[i].getId();
			lookup[pageId] = pages[i];
			
			if (moved[prev] == null && !removed[pageId] &&
				(diff[EditorUi.DIFF_UPDATE] == null ||
				diff[EditorUi.DIFF_UPDATE][pageId] == null ||
				diff[EditorUi.DIFF_UPDATE][pageId].previous == null))
			{
				moved[prev] = pageId;
			}
			
			prev = pageId;
		}
  	}
  	
  	// FIXME: Workaround for possible duplicate pages
  	var added = {};
	
	var addPage = mxUtils.bind(this, function(page)
	{
		var id = (page != null) ? page.getId() : '';
		
		if (page != null && !added[id])
		{
			added[id] = true;
			newPages.push(page);
			var pageDiff = (diff[EditorUi.DIFF_UPDATE] != null) ?
					diff[EditorUi.DIFF_UPDATE][id] : null;

			if (pageDiff != null)
			{
				this.updatePageRoot(page);
				
				if (pageDiff.name != null)
				{
					page.setName(pageDiff.name);
				}

				if (pageDiff.view != null)
				{
					this.patchViewState(page, pageDiff.view);
				}
				
				if (pageDiff.cells != null)
				{
					this.patchPage(page, pageDiff.cells,
						resolverLookup[page.getId()],
						updateEdgeParents);
				}
				
				if (markPages && (pageDiff.cells != null ||
					pageDiff.view != null))
				{
					page.needsUpdate = true;
				}
			}
		}
		
		var mov = moved[id];
		
		if (mov != null)
		{
			delete moved[id];
			addPage(lookup[mov]);
		}
		
		var ins = inserted[id];
		
		if (ins != null)
		{
			delete inserted[id];
			insertPage(ins);
		}
	});
	
	var insertPage = mxUtils.bind(this, function(ins)
	{
		var diagram = mxUtils.parseXml(ins.data).documentElement;
		var newPage = new DiagramPage(diagram);
		this.updatePageRoot(newPage);
		var page = lookup[newPage.getId()]; 
		
		if (page == null)
		{
			addPage(newPage);
		}
		else
		{
			this.patchPage(page, this.diffPages([page], [newPage]),
				resolverLookup[page.getId()], updateEdgeParents);
			
			if (markPages)
			{
				page.needsUpdate = true;
			}
		}
	});
	
	addPage();

	// Handles orphaned moved pages
	for (var id in moved)
	{
		addPage(lookup[moved[id]]);
		delete moved[id];
	}
	
	// Handles orphaned inserted pages
	for (var id in inserted)
	{
		insertPage(inserted[id]);
		delete inserted[id];
	}

	return newPages;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.patchViewState = function(page, diff)
{
	if (page.viewState != null && diff != null)
	{
		if (page == this.currentPage)
		{
			page.viewState = this.editor.graph.getViewState();
		}

		for (var key in diff)
		{
			try
			{
				this.patchViewStateProperty(page, diff, key);
			}
			catch(e) {} //Ignore TODO Is this correct, we encountered an undefined value for a key (extFonts)
		}
		
		if (page == this.currentPage)
		{
			this.editor.graph.setViewState(page.viewState, true);
		}
	}
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.patchViewStateProperty = function(page, diff, key)
{
	page.viewState[key] = JSON.parse(diff[key]);
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.createParentLookup = function(model, diff)
{
	var parentLookup = {};
	
	function getLookup(id)
	{
		var result = parentLookup[id];
		
		if (result == null)
		{
			result = {inserted: [], moved: {}};
			parentLookup[id] = result;
		}
		
		return result;
	};
	
	if (diff[EditorUi.DIFF_INSERT] != null)
	{
		for (var i = 0; i < diff[EditorUi.DIFF_INSERT].length; i++)
		{
			var temp = diff[EditorUi.DIFF_INSERT][i];
			var par = (temp.parent != null) ? temp.parent : '';
			var prev = (temp.previous != null) ? temp.previous : '';
			getLookup(par).inserted[prev] = temp;
		}
	}
	
	if (diff[EditorUi.DIFF_UPDATE] != null)
	{
		for (var id in diff[EditorUi.DIFF_UPDATE])
		{
			var temp = diff[EditorUi.DIFF_UPDATE][id];
			
			if (temp.previous != null)
			{
				var par = temp.parent;
				
				if (par == null)
				{
					var cell = model.getCell(id);
					
					if (cell != null)
					{
						var parent = model.getParent(cell);
						
						if (parent != null)
						{
							par = parent.getId();
						}
					} 
				}
				
				if (par != null)
				{
					getLookup(par).moved[temp.previous] = id;
				}
			}
		}
	}
	
	return parentLookup;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.patchPage = function(page, diff, resolver, updateEdgeParents)
{
	var model = (page == this.currentPage) ? this.editor.graph.model : new mxGraphModel(page.root);
	var parentLookup = this.createParentLookup(model, diff);

	model.beginUpdate();
	try
	{
		// Disables or delays update of edge parents to after patch
		var prev = model.updateEdgeParent;
		var dict = new mxDictionary();
		var pendingUpdates = [];
		
		model.updateEdgeParent = function(edge, root)
		{
			if (!dict.get(edge) && updateEdgeParents)
			{
				dict.put(edge, true);
				pendingUpdates.push(edge);
			}
		};

		// Handles new root cells
		var temp = parentLookup[''];
		var cellDiff = (temp != null && temp.inserted != null) ? temp.inserted[''] : null;
		var root = null;
		
		if (cellDiff != null)
		{
			root = this.getCellForJson(cellDiff);
		}
		
		// Handles cells becoming root (very unlikely but possible)
		if (root == null)
		{
			var id = (temp != null && temp.moved != null) ? temp.moved[''] : null;
			
			if (id != null)
			{
				root = model.getCell(id);
			}
		}
		
		if (root != null)
		{
			model.setRoot(root);
			page.root = root;
		}

		// Inserts and updates previous and parent (hierarchy update)
		this.patchCellRecursive(page, model, model.root, parentLookup, diff);

		// Removes cells after parents have been updated above
		if (diff[EditorUi.DIFF_REMOVE] != null)
		{
			for (var i = 0; i < diff[EditorUi.DIFF_REMOVE].length; i++)
			{
				var cell = model.getCell(diff[EditorUi.DIFF_REMOVE][i]);
				
				if (cell != null)
				{
					model.remove(cell);
				}
			}
		}
		
		// Updates cell states and terminals
		if (diff[EditorUi.DIFF_UPDATE] != null)
		{
			var res = (resolver != null && resolver.cells != null) ? 
				resolver.cells[EditorUi.DIFF_UPDATE] : null;
			
			for (var id in diff[EditorUi.DIFF_UPDATE])
			{
				this.patchCell(model, model.getCell(id),
					diff[EditorUi.DIFF_UPDATE][id],
					(res != null) ? res[id] : null);
			}
		}

		// Updates terminals for inserted cells
		if (diff[EditorUi.DIFF_INSERT] != null)
		{
			for (var i = 0; i < diff[EditorUi.DIFF_INSERT].length; i++)
			{
				var cellDiff = diff[EditorUi.DIFF_INSERT][i];
				var cell = model.getCell(cellDiff.id);
				
				if (cell != null)
				{
					model.setTerminal(cell, model.getCell(cellDiff.source), true);
					model.setTerminal(cell, model.getCell(cellDiff.target), false);
				}
			}
		}

		// Delayed update of edge parents
		model.updateEdgeParent = prev;
		
		if (updateEdgeParents && pendingUpdates.length > 0)
		{
			for (var i = 0; i < pendingUpdates.length; i++)
			{
				if (model.contains(pendingUpdates[i]))
				{
					model.updateEdgeParent(pendingUpdates[i]);
				}
			}
		}
	}
	finally
	{
		model.endUpdate();
	}
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.patchCellRecursive = function(page, model, cell, parentLookup, diff)
{
	if (cell != null)
	{
		var temp = parentLookup[cell.getId()];
		var inserted = (temp != null && temp.inserted != null) ? temp.inserted : {};
		var moved = (temp != null && temp.moved != null) ? temp.moved : {};
		var index = 0;
		
		// Restores existing order
		var childCount = model.getChildCount(cell);
		var prev = '';
		
		for (var i = 0; i < childCount; i++)
		{
			var cellId = model.getChildAt(cell, i).getId();
			
			if (moved[prev] == null &&
				(diff[EditorUi.DIFF_UPDATE] == null ||
				diff[EditorUi.DIFF_UPDATE][cellId] == null ||
				(diff[EditorUi.DIFF_UPDATE][cellId].previous == null &&
				diff[EditorUi.DIFF_UPDATE][cellId].parent == null)))
			{
				moved[prev] = cellId;
			}
			
			prev = cellId;
		}
		
		var addCell = mxUtils.bind(this, function(child, insert)
		{
			var id = (child != null) ? child.getId() : '';
			
			// Ignores the insert if the cell is already in the model
			if (child != null && insert)
			{
				var ex = model.getCell(id);
				
				if (ex != null && ex != child)
				{
					child = null;
				}
			}

			if (child != null)
			{
				if (model.getChildAt(cell, index) != child)
				{
					model.add(cell, child, index);
				}
	
				this.patchCellRecursive(page, model,
					child, parentLookup, diff);
				index++;
			}
			
			return id;
		});
		
		// Uses stack to avoid recursion for children
		var children = [null];
		
		while (children.length > 0)
		{
			var entry = children.shift();
			var child = (entry != null) ? entry.child : null;
			var insert = (entry != null) ? entry.insert : false;
			var id = addCell(child, insert);
			
			// Move and insert are mutually exclusive per predecessor
			// since an insert changes the predecessor of existing cells
			// and is therefore ignored in the loop above where the order
			// for existing cells is added to the moved object
			var mov = moved[id];
			
			if (mov != null)
			{
				delete moved[id];
				children.push({child: model.getCell(mov)});
			}
			
			var ins = inserted[id];
			
			if (ins != null)
			{
				delete inserted[id];
				children.push({child: this.getCellForJson(ins), insert: true});
			}
			
			// Orphaned moves and inserts are operations where the previous cell vanished
			// in the local model so their position in the child array cannot be determined.
			// In this case those cells are appended. Dependencies between orphans are
			// maintained because for-in loops enumerate the IDs in order of insertion.
			if (children.length == 0)
			{
				// Handles orphaned moved pages
				for (var id in moved)
				{
					children.push({child: model.getCell(moved[id])});
					delete moved[id];
				}
			
				// Handles orphaned inserted pages
				for (var id in inserted)
				{
					children.push({child: this.getCellForJson(inserted[id]), insert: true});
					delete inserted[id];
				}
			}
		}
	}
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.patchCell = function(model, cell, diff, resolve)
{
	if (cell != null && diff != null)
	{
		// Last write wins for value except if label is empty
		if (resolve == null || (resolve.xmlValue == null &&
			(resolve.value == null || resolve.value == '')))
		{
			if ('value' in diff)
			{
				model.setValue(cell, diff.value);
			}
			else if (diff.xmlValue != null)
			{
				model.setValue(cell, mxUtils.parseXml(diff.xmlValue).documentElement);
			}
		}
		
		// Last write wins for style
		if ((resolve == null || resolve.style == null) && diff.style != null)
		{
			model.setStyle(cell, diff.style);
		}

		if (diff.visible != null)
		{
			model.setVisible(cell, diff.visible == 1);
		}

		if (diff.collapsed != null)
		{
			model.setCollapsed(cell, diff.collapsed == 1);
		}

		if (diff.vertex != null)
		{
			// Changes vertex state in-place
			cell.vertex = diff.vertex == 1;
		}

		if (diff.edge != null)
		{
			// Changes edge state in-place
			cell.edge = diff.edge == 1;
		}
		
		if (diff.connectable != null)
		{
			// Changes connectable state in-place
			cell.connectable = diff.connectable == 1;
		}
		
		if (diff.geometry != null)
		{
			model.setGeometry(cell, this.codec.decode(mxUtils.parseXml(
				diff.geometry).documentElement));
		}
		
		if (diff.source != null)
		{
			model.setTerminal(cell, model.getCell(diff.source), true);
		}
		
		if (diff.target != null)
		{
			model.setTerminal(cell, model.getCell(diff.target), false);
		}
		
		for (var key in diff)
		{
			if (!this.cellProperties[key])
			{
				cell[key] = diff[key];
			}
		}
	}
};

/**
 * Returns the pages for the given XML string.
 */
EditorUi.prototype.getXmlForPages = function(pages)
{
	var node = this.getNodeForPages(pages);
	var result = null;

	if (node != null)
	{
		result = mxUtils.getXml(node);
	}

	return result;
};

/**
 * Returns the pages for the given XML string.
 */
EditorUi.prototype.getNodeForPages = function(pages)
{
	var result = null;

	if (this.fileNode != null && pages != null)
	{
		result = this.fileNode.cloneNode(false);

		for (var i = 0; i < pages.length; i++)
		{
			var enc = new mxCodec(mxUtils.createXmlDocument());
			var temp = enc.encode(new mxGraphModel(pages[i].root));
			this.editor.graph.saveViewState(pages[i].viewState, temp);
			var node = pages[i].node.cloneNode(false);
			node.appendChild(temp);
			result.appendChild(node);
		}
	}

	return result;
};

/**
 * Returns the pages for the given XML string.
 */
EditorUi.prototype.getPagesForXml = function(data)
{
	var doc = mxUtils.parseXml(data);

	return this.getPagesForNode(doc.documentElement);
};

/**
 * Returns the pages for the given node.
 */
EditorUi.prototype.getPagesForNode = function(node, nodeName)
{
	var tmp = this.editor.extractGraphModel(node, true, true);
	
	if (tmp != null)
	{
		node = tmp;
	}

	var diagrams = node.getElementsByTagName(nodeName || 'diagram');
	var pages = [];
	
	if (diagrams.length > 0)
	{
		for (var i = 0; i < diagrams.length; i++)
		{
			var page = new DiagramPage(diagrams[i]);
			this.updatePageRoot(page, true);
			pages.push(page);
		}
	}
	else if (node.nodeName == 'mxGraphModel')
	{
		var page = new DiagramPage(node.ownerDocument.createElement('diagram'));
		page.setName(mxResources.get('pageWithNumber', [1]));
		mxUtils.setTextContent(page.node, Graph.compressNode(node, true));
		pages.push(page);
	}
	
	return pages;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.diffPages = function(oldPages, newPages)
{
	var inserted = [];
	var removed = [];
	var result = {};
	var lookup = {};
	var diff = {};
	var prev = null;

	if (oldPages != null && newPages != null)
	{
		for (var i = 0; i < newPages.length; i++)
		{
			lookup[newPages[i].getId()] = {page: newPages[i], prev: prev};
			prev = newPages[i];
		}

		prev = null;
		
		for (var i = 0; i < oldPages.length; i++)
		{
			var id = oldPages[i].getId();
			var newPage = lookup[id];
			
			if (newPage == null)
			{
				removed.push(id);
			}
			else
			{
				var temp = this.diffPage(oldPages[i], newPage.page);
				var pageDiff = {};

				if (!mxUtils.isEmptyObject(temp))
				{
					pageDiff.cells = temp;
				}
				
				var view = this.diffViewState(oldPages[i], newPage.page);
				
				if (!mxUtils.isEmptyObject(view))
				{
					pageDiff.view = view;
				}
				
				if (((newPage.prev != null) ? prev == null : prev != null) ||
					(prev != null && newPage.prev != null &&
					prev.getId() != newPage.prev.getId()))
				{
					pageDiff.previous = (newPage.prev != null) ? newPage.prev.getId() : '';
				}
				
				// FIXME: Check why names can be null in newer files
				// ignore in hash and do not diff null names for now
				if (newPage.page.getName() != null &&
					oldPages[i].getName() != newPage.page.getName())
				{
					pageDiff.name = newPage.page.getName();
				}
				
				if (!mxUtils.isEmptyObject(pageDiff))
				{
					diff[id] = pageDiff;
				}
			}

			delete lookup[oldPages[i].getId()];
			prev = oldPages[i];
		}
		
		for (var id in lookup)
		{
			var newPage = lookup[id];
			inserted.push({id: newPage.page.getId(),
				data: mxUtils.getXml(newPage.page.node),
				previous: (newPage.prev != null) ?
				newPage.prev.getId() : ''});
		}
		
		if (!mxUtils.isEmptyObject(diff))
		{
			result[EditorUi.DIFF_UPDATE] = diff;
		}
		
		if (removed.length > 0)
		{
			result[EditorUi.DIFF_REMOVE] = removed;
		}
		
		if (inserted.length > 0)
		{
			result[EditorUi.DIFF_INSERT] = inserted;
		}
	}

	return result;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.createCellLookup = function(cell, prev, lookup)
{
	lookup = (lookup != null) ? lookup : {};
	lookup[cell.getId()] = {cell: cell, prev: prev};
	
	var childCount = cell.getChildCount();
	prev = null;
	
	for (var i = 0; i < childCount; i++)
	{
		var child = cell.getChildAt(i);
		this.createCellLookup(child, prev, lookup);
		prev = child;
	}
	
	return lookup;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.diffCellRecursive = function(cell, prev, lookup, diff, removed)
{
	diff = (diff != null) ? diff : {};
	var newCell = lookup[cell.getId()];
	delete lookup[cell.getId()];
	
	if (newCell == null)
	{
		removed.push(cell.getId());
	}
	else
	{
		var temp = this.diffCell(cell, newCell.cell);
		
		if (temp.parent != null ||
			(((newCell.prev != null) ? prev == null : prev != null) ||
			(prev != null && newCell.prev != null &&
			prev.getId() != newCell.prev.getId())))
		{
			temp.previous = (newCell.prev != null) ? newCell.prev.getId() : '';
		}
		
		if (!mxUtils.isEmptyObject(temp))
		{
			diff[cell.getId()] = temp;
		}
	}

	var childCount = cell.getChildCount();
	prev = null;
	
	for (var i = 0; i < childCount; i++)
	{
		var child = cell.getChildAt(i);
		this.diffCellRecursive(child, prev, lookup, diff, removed);
		prev = child;
	}
	
	return diff;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.diffPage = function(oldPage, newPage)
{
	var inserted = [];
	var removed = [];
	var result = {};

	this.updatePageRoot(oldPage);
	this.updatePageRoot(newPage);

	var lookup = this.createCellLookup(newPage.root);
	var diff = this.diffCellRecursive(oldPage.root, null, lookup, diff, removed);

	for (var id in lookup)
	{
		var newCell = lookup[id];
		inserted.push(this.getJsonForCell(newCell.cell, newCell.prev));
	}

	if (!mxUtils.isEmptyObject(diff))
	{
		result[EditorUi.DIFF_UPDATE] = diff;
	}
	
	if (removed.length > 0)
	{
		result[EditorUi.DIFF_REMOVE] = removed;
	}
	
	if (inserted.length > 0)
	{
		result[EditorUi.DIFF_INSERT] = inserted;
	}

	return result;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.diffViewState = function(oldPage, newPage)
{
	var source = oldPage.viewState;
	var target = newPage.viewState;
	var result = {};

	if (oldPage == this.currentPage)
	{
		source = this.editor.graph.getViewState();
	}
	
	if (newPage == this.currentPage)
	{
		target = this.editor.graph.getViewState();
	}

	if (source != null && target != null)
	{
		for (var key in this.viewStateProperties)
		{
			this.diffViewStateProperty(source, target, key, result);
		}
	}
	
	return result;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.diffViewStateProperty = function(source, target, key, result)
{
	// LATER: Check if normalization is needed for
	// object attribute order to compare JSON
	var old = JSON.stringify(this.getViewStateProperty(source, key));
	var now = JSON.stringify(this.getViewStateProperty(target, key));
	
	if (old != now)
	{
		result[key] = now;
	}
};

/**
 * Ignores image data for background pages and normalizes extFonts.
 */
EditorUi.prototype.getViewStateProperty = function(viewState, key)
{
	var result = viewState[key];

	if (key == 'backgroundImage' && result != null &&
		result.originalSrc != null)
	{
		result = {originalSrc: result.originalSrc};
	}
	else if (key == 'extFonts' && result == null)
	{
		result = [];
	}

	return result;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.getCellForJson = function(json)
{
	var geometry = (json.geometry != null) ? this.codec.decode(
		mxUtils.parseXml(json.geometry).documentElement) : null;
	var value = json.value;
	
	if (json.xmlValue != null)
	{
		value = mxUtils.parseXml(json.xmlValue).documentElement;
	}
	
	var cell = new mxCell(value, geometry, json.style);
	cell.connectable = json.connectable != 0;
	cell.collapsed = json.collapsed == 1;
	cell.visible = json.visible != 0;
	cell.vertex = json.vertex == 1;
	cell.edge = json.edge == 1;
	cell.id = json.id;
	
	for (var key in json)
	{
		if (!this.cellProperties[key])
		{
			cell[key] = json[key];
		}
	}

	return cell;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.getJsonForCell = function(cell, previous)
{
	var result = {id: cell.getId()};
	
	if (cell.vertex)
	{
		result.vertex = 1;
	}

	if (cell.edge)
	{
		result.edge = 1;
	}

	if (!cell.connectable)
	{
		result.connectable = 0;
	}

	if (cell.parent != null)
	{
		result.parent = cell.parent.getId();
	}

	if (previous != null)
	{
		result.previous = previous.getId();
	}

	if (cell.source != null)
	{
		result.source = cell.source.getId();
	}

	if (cell.target != null)
	{
		result.target = cell.target.getId();
	}

	if (cell.style != null)
	{
		result.style = cell.style;
	}

	if (cell.geometry != null)
	{
		result.geometry = mxUtils.getXml(this.codec.encode(cell.geometry));
	}

	if (cell.collapsed)
	{
		result.collapsed = 1;
	}

	if (!cell.visible)
	{
		result.visible = 0;
	}

	if (cell.value != null)
	{
		if (typeof cell.value === 'object' && typeof cell.value.nodeType === 'number' &&
			typeof cell.value.nodeName === 'string' && typeof cell.value.getAttribute === 'function')
		{
			result.xmlValue = mxUtils.getXml(cell.value);
		}
		else
		{
			result.value = cell.value;
		}
	}
	
	for (var key in cell)
	{
		if (!this.cellProperties[key] &&
			typeof cell[key] !== 'function')
		{
			result[key] = cell[key];
		}
	}

	return result;
};

/**
 * Removes all labels, user objects and styles from the given node in-place.
 */
EditorUi.prototype.diffCell = function(oldCell, newCell)
{
	var diff = {};

	if (oldCell.vertex != newCell.vertex)
	{
		diff.vertex = (newCell.vertex) ? 1 : 0;
	}
	
	if (oldCell.edge != newCell.edge)
	{
		diff.edge = (newCell.edge) ? 1 : 0;
	}

	if (oldCell.connectable != newCell.connectable)
	{
		diff.connectable = (newCell.connectable) ? 1 : 0;
	}
	
	if (((oldCell.parent != null) ? newCell.parent == null : newCell.parent != null) ||
		(oldCell.parent != null && newCell.parent != null &&
		oldCell.parent.getId() != newCell.parent.getId()))
	{
		diff.parent = (newCell.parent != null) ? newCell.parent.getId() : '';
	}
	
	if (((oldCell.source != null) ? newCell.source == null : newCell.source != null) ||
		(oldCell.source != null && newCell.source != null &&
		oldCell.source.getId() != newCell.source.getId()))
	{
		diff.source = (newCell.source != null) ? newCell.source.getId() : '';
	}
	
	if (((oldCell.target != null) ? newCell.target == null : newCell.target != null) ||
		(oldCell.target != null && newCell.target != null &&
		oldCell.target.getId() != newCell.target.getId()))
	{
		diff.target = (newCell.target != null) ? newCell.target.getId() : '';
	}
	
	function isNode(value)
	{
		return value != null && typeof value === 'object' && typeof value.nodeType === 'number' &&
			typeof value.nodeName === 'string' && typeof value.getAttribute === 'function';
	};
	
	if (isNode(oldCell.value) && isNode(newCell.value))
	{
		if (!oldCell.value.isEqualNode(newCell.value))
		{
			diff.xmlValue = mxUtils.getXml(newCell.value);
		}
	}
	else if (oldCell.value != newCell.value)
	{
		if (isNode(newCell.value))
		{
			diff.xmlValue = mxUtils.getXml(newCell.value);
		}
		else
		{
			diff.value = (newCell.value != null) ? newCell.value : null;
		}
	}
	
	if (oldCell.style != newCell.style)
	{
		// LATER: Split into keys and do fine-grained diff
		diff.style = newCell.style;
	}
	
	if (oldCell.visible != newCell.visible)
	{
		diff.visible = (newCell.visible) ? 1 : 0;
	}
	
	if (oldCell.collapsed != newCell.collapsed)
	{
		diff.collapsed = (newCell.collapsed) ? 1 : 0;
	}

	// FIXME: Proto only needed because source.geometry has no constructor (wrong type?)
	if (!this.isObjectEqual(oldCell.geometry, newCell.geometry, new mxGeometry()))
	{
		var node = this.codec.encode(newCell.geometry);
		
		if (node != null)
		{
			diff.geometry = mxUtils.getXml(node);
		}
	}
	
	// Compares all keys from oldCell to newCell and uses null in the diff
	// to force the attribute to be removed in the receiving client
	for (var key in oldCell)
	{
		if (!this.cellProperties[key] && typeof oldCell[key] !== 'function' &&
			typeof newCell[key] !== 'function' && oldCell[key] != newCell[key])
		{
			diff[key] = (newCell[key] === undefined) ? null : newCell[key];
		}
	}
	
	// Compares the remaining keys in newCell with oldCell
	for (var key in newCell)
	{
		if (!(key in oldCell) &&
			!this.cellProperties[key] && typeof oldCell[key] !== 'function' &&
			typeof newCell[key] !== 'function' && oldCell[key] != newCell[key])
		{
			diff[key] = (newCell[key] === undefined) ? null : newCell[key];
		}
	}
	
	return diff;
};

/**
 * Creates a patch that inserts pages and cells that are modified or referenced
 * as parents or terminals in the given diff but have not been saved yet by the
 * remote collaborator. These pages and cells are "adopted" by the local user.
 */
EditorUi.prototype.resolveCrossReferences = function(ownDiff, theirDiff)
{
	var resolve = {};

	if (!mxUtils.isEmptyObject(theirDiff))
	{
		this.adoptTheirPages(ownDiff, theirDiff, resolve);
		this.adoptTheirCells(ownDiff, theirDiff, resolve);
	}

	EditorUi.debug('EditorUi.resolveCrossReferences', [this],
		'ownDiff', ownDiff, 'theirDiff', theirDiff,
		'resolve', resolve);

	return resolve;
};

/**
 * Computes and sends the local changes if the file was changed.
 */
EditorUi.prototype.adoptTheirPages = function(ownDiff, theirDiff, resolve)
{
	var theirInsertedPages = {};

	if (theirDiff[EditorUi.DIFF_INSERT] != null)
	{
		for (var i = 0; i < theirDiff[EditorUi.DIFF_INSERT].length; i++)
		{
			theirInsertedPages[theirDiff[EditorUi.DIFF_INSERT][i].id] =
				theirDiff[EditorUi.DIFF_INSERT][i];
		}
	}

	for (var id in ownDiff[EditorUi.DIFF_UPDATE])
	{
		if (theirInsertedPages[id] != null)
		{
			if (resolve[EditorUi.DIFF_INSERT] == null)
			{
				resolve[EditorUi.DIFF_INSERT] = [];
			}

			if (resolve[EditorUi.DIFF_UPDATE] == null)
			{
				resolve[EditorUi.DIFF_UPDATE] = {};
			}

			// Adds changed page to own pages
			resolve[EditorUi.DIFF_INSERT].push(
				theirInsertedPages[id]);
			resolve[EditorUi.DIFF_UPDATE][id] =
				ownDiff[EditorUi.DIFF_UPDATE][id];
			delete ownDiff[EditorUi.DIFF_UPDATE][id];
		}
	}
};

/**
 * Computes and sends the local changes if the file was changed.
 */
EditorUi.prototype.adoptTheirCells = function(ownDiff, theirDiff, resolve)
{
	for (var id in ownDiff[EditorUi.DIFF_UPDATE])
	{
		var ownPageUpdate = ownDiff[EditorUi.DIFF_UPDATE][id];

		if (ownPageUpdate.cells != null)
		{
			this.adoptTheirCellsFromPage(ownPageUpdate, theirDiff, id, resolve);
		}
	}
};

/**
 * Computes and sends the local changes if the file was changed.
 */
EditorUi.prototype.adoptTheirCellsFromPage = function(ownPageUpdate, theirDiff, pageId, resolve)
{
	var theirPageUpdate = theirDiff[EditorUi.DIFF_UPDATE] != null ?
		theirDiff[EditorUi.DIFF_UPDATE][pageId] : null;

	if (theirPageUpdate != null && theirPageUpdate.cells != null &&
		theirPageUpdate.cells[EditorUi.DIFF_INSERT] != null)
	{
		var theirUpdatedCells = theirPageUpdate.cells[EditorUi.DIFF_UPDATE];
		var theirInsertedCells = {};

		for (var i = 0; i < theirPageUpdate.cells[EditorUi.DIFF_INSERT].length; i++)
		{
			var entry = theirPageUpdate.cells[EditorUi.DIFF_INSERT][i];
			theirInsertedCells[entry.id] = entry;
		}
		
		var pageDiff = {};
		pageDiff.cells = {};
		pageDiff.cells[EditorUi.DIFF_INSERT] = [];
		pageDiff.cells[EditorUi.DIFF_UPDATE] = {};

		// Blocks duplicate inserts, deleted below for result
		pageDiff.inserted = {};

		this.resolveOwnInsertedCells(
			ownPageUpdate.cells[EditorUi.DIFF_INSERT],
			theirInsertedCells, pageDiff);
		this.resolveOwnUpdatedCells(
			ownPageUpdate.cells[EditorUi.DIFF_UPDATE],
			theirInsertedCells, theirUpdatedCells,
			pageDiff);
		
		if (resolve[EditorUi.DIFF_UPDATE] == null)
		{
			resolve[EditorUi.DIFF_UPDATE] = {};
		}
		
		delete pageDiff.inserted;
		resolve[EditorUi.DIFF_UPDATE][pageId] = pageDiff;
	}
};

/**
 * Computes and sends the local changes if the file was changed.
 */
EditorUi.prototype.resolveOwnInsertedCells = function(ownInsertedCells, theirInsertedCells, pageDiff)
{
	if (ownInsertedCells != null)
	{
		for (var i = 0; i < ownInsertedCells.length; i++)
		{
			var cell = ownInsertedCells[i];

			if (cell != null)
			{
				this.adoptParentCell(cell.id, null,
					theirInsertedCells, pageDiff);
				this.adoptTerminalCell(cell.id, cell,
					theirInsertedCells, true, pageDiff);
				this.adoptTerminalCell(cell.id, cell,
					theirInsertedCells, false, pageDiff);
			}
		}
	}
};

/**
 * Computes and sends the local changes if the file was changed.
 */
EditorUi.prototype.resolveOwnUpdatedCells = function(ownUpdatedCells, theirInsertedCells, theirUpdatedCells, pageDiff)
{
	if (ownUpdatedCells != null)
	{
		for (var id in ownUpdatedCells)
		{
			// Adds changed cell to own cells
			var cell = theirInsertedCells[id];

			if (cell != null)
			{
				if (!pageDiff.inserted[id])
				{
					pageDiff.cells[EditorUi.DIFF_INSERT].push(cell);
					pageDiff.inserted[id] = true;
				}

				pageDiff.cells[EditorUi.DIFF_UPDATE][id] =
					ownUpdatedCells[id];
			}
			else if (theirUpdatedCells != null)
			{
				// Adds their referenced terminals
				// and parents to own cells
				var theirCell = theirUpdatedCells[id];
				
				if (theirCell != null)
				{
					this.adoptParentCell(id, theirCell,
						theirInsertedCells, pageDiff);
					this.adoptTerminalCell(id, theirCell,
						theirInsertedCells, true, pageDiff, id);
					this.adoptTerminalCell(id, theirCell,
						theirInsertedCells, false, pageDiff, id);
				}
			}
		}
	}
};

/**
 * Adds unsaved remote parents to the patch.
 */
EditorUi.prototype.adoptParentCell = function(cellId, cellDiff, theirInsertedCells, pageDiff)
{
	var cell = theirInsertedCells[cellId];
	var parentId = (cellDiff != null) ? cellDiff.parent :
		((cell != null) ? cell.parent : null);

	if (parentId != null)
	{
		this.adoptParentCell(parentId, null, theirInsertedCells, pageDiff);
	}

	if (cell != null)
	{
		if (!pageDiff.inserted[cellId])
		{
			pageDiff.cells[EditorUi.DIFF_INSERT].push(cell);
			pageDiff.inserted[cellId] = true;
		}
	}
	else if (cellDiff != null)
	{
		if (pageDiff.cells[EditorUi.DIFF_UPDATE][cellId] == null)
		{
			pageDiff.cells[EditorUi.DIFF_UPDATE][cellId] = {};
		}

		pageDiff.cells[EditorUi.DIFF_UPDATE][cellId] = cellDiff;
	}
};

/**
 * Computes and sends the local changes if the file was changed.
 */
EditorUi.prototype.adoptTerminalCell = function(cellId, cell, theirInsertedCells, source, pageDiff)
{
	var terminalId = (source) ? cell.source : cell.target;
	var terminal = theirInsertedCells[terminalId];

	if (terminal != null)
	{
		if (!pageDiff.inserted[terminalId])
		{
			pageDiff.cells[EditorUi.DIFF_INSERT].push(terminal);
			pageDiff.inserted[terminalId] = true;
		}
		
		if (pageDiff.cells[EditorUi.DIFF_UPDATE][cellId] == null)
		{
			pageDiff.cells[EditorUi.DIFF_UPDATE][cellId] = {};
		}

		pageDiff.cells[EditorUi.DIFF_UPDATE][cellId]
			[(source) ? 'source' : 'target'] = terminalId;
	}
};

/**
 *
 */
EditorUi.prototype.isObjectEqual = function(source, target, proto)
{
	if (source == null && target == null)
	{
		return true;
	}
	else if ((source != null) ? target == null : target != null)
	{
		return false;
	}
	else
	{
		var replacer = function(key, value)
		{
			return (proto == null || proto[key] != value) ? ((value === true) ? 1 : value) : undefined;
		};

		//console.log('eq', JSON.stringify(source, replacer), JSON.stringify(target, replacer));
		
		return JSON.stringify(source, replacer) == JSON.stringify(target, replacer);
	}
};
