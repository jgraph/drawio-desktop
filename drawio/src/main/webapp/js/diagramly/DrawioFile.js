/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
DrawioFile = function(ui, data)
{
	mxEventSource.call(this);

	this.ui = ui;
	this.setData(data || '');
	this.initialData = this.getData();
	this.created = new Date().getTime();

	// Creates the stats object
	this.stats = {
		opened: 0, /* number of calls to open */
		merged: 0, /* number of calls to merge */
		fileMerged: 0, /* number of calls to mergeFile */
		fileReloaded: 0, /* number of calls to mergeFile */
		conflicts: 0, /* number of write conflicts when saving a file */
		timeouts: 0, /* number of time we have given up to retry after a write conflict */
		saved: 0, /* number of calls to fileSaved */
		closed: 0, /* number of calls to close */
		destroyed: 0, /* number of calls to close */
		joined: 0, /* number of join messages received */
		checksumErrors: 0, /* number of checksum errors */
		bytesSent: 0, /* number of bytes send in messages */
		bytesReceived: 0, /* number of bytes received in messages */
		msgSent: 0, /* number of messages sent */
		msgReceived: 0, /* number of messages received */
		cacheHits: 0, /* number of times the cache returned patches */
		cacheMiss: 0, /* number of times we have missed a cache entry */
		cacheFail: 0 /* number of times we have failed to read the cache */
	};
};

/**
 * Global switch for realtime collaboration type to use sync URL parameter
 * with the following possible values:
 * 
 * - none: overwrite
 * - manual: manual sync
 * - auto: automatic sync
 */
DrawioFile.SYNC = urlParams['sync'] || 'auto';

/**
 * Specifies if last write wins should be used for values and styles.
 */
DrawioFile.LAST_WRITE_WINS = true;

/**
 * Specifies if export is restricted.
 */
DrawioFile.RESTRICT_EXPORT = false;

// Extends mxEventSource
mxUtils.extend(DrawioFile, mxEventSource);

/**
 * Specifies the resource key for all changes saved status message.
 */
DrawioFile.prototype.allChangesSavedKey = 'allChangesSaved';

/**
 * Specifies the resource key for saving spinner.
 */
DrawioFile.prototype.savingSpinnerKey = 'saving';

/**
 * Specifies the resource key for saving status message.
 */
DrawioFile.prototype.savingStatusKey = 'saving';

/**
 * Specifies the delay between the last change and the autosave.
 */
DrawioFile.prototype.autosaveDelay = 1500;

/**
 * Specifies the maximum delay before an autosave is forced even if the graph
 * is being changed.
 */
DrawioFile.prototype.maxAutosaveDelay = 30000;

/**
 * Specifies the delay for loading the file after an optimistic sync message.
 * This should be the delay for the file to be saved minus the delay for the
 * sync message to travel.
 */
DrawioFile.prototype.optimisticSyncDelay = 300;

/**
 * Contains the thread for the next autosave.
 */
DrawioFile.prototype.autosaveThread = null;

/**
 * Stores the time stamp for the last autosave.
 */
DrawioFile.prototype.lastAutosave = null;

/**
 * Stores the time stamp for the last autosave.
 */
DrawioFile.prototype.lastSaved = null;

/**
 * Stores the time stamp for the last autosave.
 */
DrawioFile.prototype.lastChanged = null;

/**
 * Stores the time stamp when the file was opened.
 */
DrawioFile.prototype.opened = null;

/**
 * Stores the modified state.
 */
DrawioFile.prototype.modified = false;

/**
 * Stores a shadow of the modified state.
 */
DrawioFile.prototype.shadowModified = false;

/**
 * Holds a copy of the current file data.
 */
DrawioFile.prototype.data = null;

/**
 * Holds a copy of the parsed last saved file data.
 */
DrawioFile.prototype.shadowPages = null;

/**
 * Specifies if the graph change listener is enabled. Default is true.
 */
DrawioFile.prototype.changeListenerEnabled = true;

/**
 * Sets the delay for autosave in milliseconds. Default is 1500.
 */
DrawioFile.prototype.lastAutosaveRevision = null;

/**
 * Sets the delay between revisions when using autosave. Default is 300000
 * ie 5 mins. Set this to 0 to create a revision on every autosave.
 */
DrawioFile.prototype.maxAutosaveRevisionDelay = 300000;

/**
 * Specifies if notify events should be ignored.
 */
DrawioFile.prototype.inConflictState = false;

/**
 * Specifies if notify events should be ignored.
 */
DrawioFile.prototype.invalidChecksum = false;

/**
 * Specifies if error reports should be sent.
 */
DrawioFile.prototype.errorReportsEnabled = false;

/**
 * Specifies if stats should be sent.
 */
DrawioFile.prototype.ageStart = null;

/**
 * Specifies if notify events should be ignored.
 */
DrawioFile.prototype.getSize = function()
{
	return (this.data != null) ? this.data.length : 0;
};

/**
 * Returns the shadow pages. If they do not exist they are created.
 */
DrawioFile.prototype.getShadowPages = function()
{
	if (this.shadowPages == null)
	{
		this.shadowPages = this.ui.getPagesForXml(this.initialData);
	}

	return this.shadowPages;
};

/**
 * Sets the shadow pages.
 */
DrawioFile.prototype.setShadowPages = function(pages)
{
	this.shadowPages = pages;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.synchronizeFile = function(success, error)
{
	if (this.savingFile)
	{
		if (error != null)
		{
			error({message: mxResources.get('busy')});
		}
	}
	else
	{
		var acceptResponse = true;

		var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
		{
			acceptResponse = false;
			
			if (error != null)
			{
				error({code: App.ERROR_TIMEOUT, message: mxResources.get('timeout'), retry: mxUtils.bind(this, function()
				{
					this.synchronizeFile(success, error);
				})});
			}
		}), this.ui.timeout);

		var errorWrapper = mxUtils.bind(this, function(e)
		{
			if (acceptResponse)
			{
				window.clearTimeout(timeoutThread);
			
				if (error != null)
				{
					error(e);
				}
			}
		});

		var abort = mxUtils.bind(this, function()
		{
			return !acceptResponse;
		});

		if (this.sync != null)
		{
			this.sync.fileChanged(mxUtils.bind(this, function(patched)
			{
				if (acceptResponse)
				{
					window.clearTimeout(timeoutThread);
					this.sync.cleanup(success, error, patched);
				}
			}), errorWrapper, abort);
		}
		else
		{
			this.updateFile(mxUtils.bind(this, function()
			{
				if (acceptResponse)
				{
					window.clearTimeout(timeoutThread);
				
					if (success != null)
					{
						success();
					}
				}
			}), errorWrapper, abort);
		}
	}
};

/**
* Adds the listener for automatically saving the diagram for local changes.
* Immediate is passed through to scheduleCleanup.
*/
DrawioFile.prototype.updateFile = function(success, error, abort, shadow, immediate)
{
	if (abort == null || !abort())
	{
		EditorUi.debug('DrawioFile.updateFile', [this],
			'immediate', immediate, 'invalidChecksum',
			this.invalidChecksum);

		if (this.ui.getCurrentFile() != this || this.invalidChecksum)
		{
			if (error != null)
			{
				error();
			}
		}
		else
		{
			this.getLatestVersion(mxUtils.bind(this, function(latestFile)
			{
				try
				{
					if (abort == null || !abort())
					{
						EditorUi.debug('DrawioFile.updateFile', [this],
							'invalidChecksum', this.invalidChecksum,
							'latestFile', [latestFile]);

						if (this.ui.getCurrentFile() != this || this.invalidChecksum)
						{
							if (error != null)
							{
								error();
							}
						}
						else
						{
							if (latestFile != null)
							{
								this.mergeFile(latestFile, success, error,
									shadow, immediate);
							}
							else
							{
								this.reloadFile(success, error);
							}
						}
					}
				}
				catch (e)
				{
					if (error != null)
					{
						error(e);
					}
				}
			}), error);
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 * Immediate is passed through to scheduleCleanup.
 */
DrawioFile.prototype.mergeFile = function(file, success, error, diffShadow, immediate)
{
	var reportError = true;
	
	try
	{
		// Loads new document as shadow document
		var pages = file.getShadowPages();

		if (pages != null && pages.length > 0)
		{
			// Patches the current document
			var shadow = this.getShadowPages();
			var patches = [this.ui.diffPages((diffShadow != null) ?
				diffShadow : shadow, pages)];
			var ignored = this.ignorePatches(patches);
			this.setShadowPages(pages);
			
			if (!ignored)
			{
				try
				{
					this.stats.fileMerged++;

					if (this.sync != null)
					{
						this.sync.sendLocalChanges();
					}
					
					// Creates patch for backup
					this.backupPatch = (!this.isModified()) ? null :
						this.ui.diffPages(shadow, (this.isRealtime()) ?
						this.ownPages : this.ui.pages);
					
					// Patching previous shadow to verify checksum
					var patchedDetails = {};
					var currentDetails = {};
					var patched = this.ui.patchPages(shadow, patches[0]);
					var checksum = this.ui.getHashValueForPages(patched, patchedDetails);
					var current = this.ui.getHashValueForPages(pages, currentDetails);
					
					EditorUi.debug('File.mergeFile', [this], 'file', [file], 'shadow', shadow,
						'pages', this.ui.pages, 'patches', patches, 'backup', this.backupPatch,
						'checksum', checksum, 'current', current, 'valid', checksum == current,
						'from', this.getCurrentRevisionId(), 'to', file.getCurrentRevisionId(),
						'modified', this.isModified(), 'immediate', immediate);
					
					if (checksum != null && checksum != current)
					{
						var fileData = this.compressReportData(this.getAnonymizedXmlForPages(pages));
						var data = this.compressReportData(this.getAnonymizedXmlForPages(patched));
						var from = this.ui.hashValue(file.getCurrentEtag());
						var to = this.ui.hashValue(this.getCurrentEtag());
						
						this.checksumError(error, patches, 'Shadow Details: ' +
							JSON.stringify(patchedDetails) + '\nChecksum: ' +
							checksum + '\nCurrent: ' + current + '\nCurrent Details: ' +
							JSON.stringify(currentDetails) + '\nFrom: ' + from + '\nTo: ' +
							to + '\n\nFile Data:\n' + fileData + '\nPatched Shadow:\n' +
							data, null, 'mergeFile', checksum, current, file.getCurrentRevisionId());
						
						// Abnormal termination
						return;
					}
					else
					{
						// Patches the realtime document
						if (this.sync != null)
						{
							var pending = this.sync.patchRealtime(
								patches, (DrawioFile.LAST_WRITE_WINS) ?
									this.backupPatch : null, null,
									immediate);
							
							if (pending != null && !mxUtils.isEmptyObject(pending))
							{
								patches.push(pending);
							}
						}

						// Patches the current document
						this.patch(patches, (DrawioFile.LAST_WRITE_WINS) ?
								this.backupPatch : null);
					}
				
					this.invalidChecksum = false;
					this.inConflictState = false;
					this.setDescriptor(file.getDescriptor());
					this.descriptorChanged();
					this.backupPatch = null;
					
					if (success != null)
					{
						success();
					}
				}
				catch (e)
				{
					this.inConflictState = true;
					this.invalidChecksum = true;
					this.descriptorChanged();
					
					if (error != null)
					{
						error(e);
					}

					try
					{
						if (reportError)
						{
							if (this.errorReportsEnabled)
							{
								this.sendErrorReport('Error in mergeFile', null, e);
							}
							else
							{
								var user = this.getCurrentUser();
								var uid = (user != null) ? user.id : 'unknown';
								
								EditorUi.logError('Error in mergeFile', null,
									this.getMode() + '.' + this.getId(),
									uid, e);
							}
						}
					}
					catch (e2)
					{
						// ignore
					}
				}
			}
			else
			{
				EditorUi.debug('File.mergeFile', [this],
					'file', [file], 'ignored', ignored);
			
				if (success != null)
				{
					success();
				}
			}
		}
		else
		{
			reportError = false;
			throw new Error(mxResources.get('notADiagramFile'));
		}
	}
	catch (e)
	{
		if (error != null)
		{
			error(e);
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.getAnonymizedXmlForPages = function(pages)
{
	var enc = new mxCodec(mxUtils.createXmlDocument());
	var file = enc.document.createElement('mxfile');
	
	if (pages != null)
	{
		for (var i = 0; i < pages.length; i++)
		{
			var temp = enc.encode(new mxGraphModel(pages[i].root));
			
			if (urlParams['dev'] != '1')
			{
				temp = this.ui.anonymizeNode(temp, true);
			}
			
			temp.setAttribute('id', pages[i].getId());
			
			if (pages[i].viewState)
			{
				this.ui.editor.graph.saveViewState(pages[i].viewState, temp, true);
			}
			
			file.appendChild(temp);
		}
	}

	return mxUtils.getPrettyXml(file);
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.compressReportData = function(data, limit, max)
{
	limit = (limit != null) ? limit : 10000;

	if (max != null && data != null && data.length > max)
	{
		data = data.substring(0, max) + '[...]';
	}
	else if (data != null && data.length > limit)
	{
		data = Graph.compress(data) + '\n';
	}

	return data;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.checksumError = function(error, patches, details, etag, functionName, checksum, current, rev)
{
	this.stats.checksumErrors++;
	this.inConflictState = true;
	this.invalidChecksum = true;
	this.descriptorChanged();
	
	if (this.sync != null)
	{
		this.sync.updateOnlineState();
	}

	if (error != null)
	{
		error();
	}
	
	try
	{
		if (this.errorReportsEnabled)
		{
			if (patches != null)
			{
				for (var i = 0; i < patches.length; i++)
				{
					this.ui.anonymizePatch(patches[i]);
				}
			}
			
			var fn = mxUtils.bind(this, function(file)
			{
				var json = this.compressReportData(
					JSON.stringify(patches, null, 2));
				var remote = (file == null) ?  'n/a' :
					this.compressReportData(
						this.getAnonymizedXmlForPages(
							this.ui.getPagesForXml(file.data)),
								25000);
				
				this.sendErrorReport('Checksum Error in ' + functionName + ' ' + this.getHash(),
					((details != null) ? (details) : '') +  '\n\nPatches:\n' + json +
					((remote != null) ? ('\n\nRemote:\n' + remote) : ''), null, 70000);
			});
	
			if (etag == null)
			{
				fn(null);
			}
			else
			{
				this.getLatestVersion(mxUtils.bind(this, function(file)
				{
					if (file != null && file.getCurrentEtag() == etag)
					{
						fn(file);
					}
					else
					{
						fn(null);
					}
				}), function() {});
			}
		}
		else
		{
			var user = this.getCurrentUser();
			var uid = (user != null) ? user.id : 'unknown';
			var id = (this.getId() != '') ? this.getId() :
				('(' + this.ui.hashValue(this.getTitle()) + ')');
			var bytes = JSON.stringify(patches).length;
			var data = null;
			
			if (patches != null && this.constructor == DriveFile && bytes < 400)
			{
				for (var i = 0; i < patches.length; i++)
				{
					this.ui.anonymizePatch(patches[i]);
				}
	
				data = JSON.stringify(patches);
	
				if (data != null && data.length < 250)
				{
					data = Graph.compress(data);
				}
				else
				{
					data = null;
				}
			}

			this.getLatestVersion(mxUtils.bind(this, function(latestFile)
			{				
				// Logs checksum error for file
				try
				{
					var type = (data != null) ? 'Report' : 'Error';
					var latest = this.ui.getHashValueForPages(latestFile.getShadowPages());
				
					EditorUi.logError('Checksum ' + type + ' in ' + functionName + ' ' + id,
						null, this.getMode() + '.' + this.getId(),
						'user_' + uid + ((this.sync != null) ?
						'-client_' + this.sync.clientId : '-nosync') +
						'-bytes_' + bytes + '-patches_' + patches.length +
						((data != null) ? ('-json_' + data) : '')  +
						'-size_' + this.getSize() +
						((checksum != null) ? ('-expected_' + checksum) : '') +
						((current != null) ? ('-current_' + current) : '') +
						((rev != null) ? ('-rev_' + this.ui.hashValue(rev)) : '') +
						((latest != null) ? ('-latest_' + latest) : '') +
						((latestFile != null) ? ('-latestRev_' + this.ui.hashValue(
							latestFile.getCurrentRevisionId())) : ''));

					EditorUi.logEvent({category: 'CHECKSUM-ERROR-SYNC-FILE-' + id,
						action: functionName, label: 'user_' + uid + ((this.sync != null) ?
						'-client_' + this.sync.clientId : '-nosync') +
						'-bytes_' + bytes + '-patches_' + patches.length +
						'-size_' + this.getSize()});
				}
				catch (e)
				{
					// ignore
				}
			}), error);
		}
	}
	catch (e)
	{
		// ignore
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.sendErrorReport = function(title, details, error, max)
{
	try
	{
		var shadow = this.compressReportData(
			this.getAnonymizedXmlForPages(
			this.getShadowPages()), 25000);
		var data = this.compressReportData(
			this.getAnonymizedXmlForPages(
			this.ui.pages), 25000);
		var user = this.getCurrentUser();
		var uid = (user != null) ? this.ui.hashValue(user.id) : 'unknown';
		var cid = (this.sync != null) ? '-client_' + this.sync.clientId : '-nosync';
		var filename = this.getTitle();
		var dot = filename.lastIndexOf('.');
		var ext = 'xml';
		
		if (dot > 0)
		{
			ext = filename.substring(dot);
		}
		
		var stack = (error != null) ? error.stack : new Error().stack;
		
		EditorUi.sendReport(title + ' ' + new Date().toISOString() + ':' +
			'\n\nAppVersion=' + navigator.appVersion +
			'\nFile=' + this.ui.hashValue(this.getId()) + ' (' + this.getMode() + ')' +
			((this.isModified()) ? ' modified' : '') +
			'\nSize/Type=' + this.getSize() + ' (' + ext + ')' +
			'\nUser=' + uid + cid +
			'\nPrefix=' + this.ui.editor.graph.model.prefix +
			'\nSync=' + DrawioFile.SYNC +
			((this.sync != null) ? (((this.sync.enabled) ? ' enabled' : '') +
				((this.sync.isConnected()) ? ' connected' : '')) : '') +
			'\nPlugins=' + ((mxSettings.settings != null) ? mxSettings.getPlugins() : 'null') +
			'\n\nStats:\n' + JSON.stringify(this.stats, null, 2) +
			((details != null) ? ('\n\n' + details) : '') +
			((error != null) ? ('\n\nError: ' + error.message) : '') +
			'\n\nStack:\n' + stack +
			'\n\nShadow:\n' + shadow +
			'\n\nData:\n' + data, max);
	}
	catch (e)
	{
		// ignore
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.reloadFile = function(success, error)
{
	try
	{
		this.ui.spinner.stop();
		
		var fn = mxUtils.bind(this, function()
		{
			EditorUi.debug('DrawioFile.reloadFile', [this], 'hash', this.getHash(),
				'modified', this.isModified(), 'backupPatch', this.backupPatch);
			this.stats.fileReloaded++;
			
			// Handles files that cannot be reloaded with hash
			if (this.getHash() == '')
			{
				this.mergeLatestVersion((this.backupPatch != null) ?
					[this.backupPatch] : null, mxUtils.bind(this, function()
				{
					this.backupPatch = null;

					if (success != null)
					{
						success();
					}
				}), error);
			}
			else
			{
				// Saves view state and current page
				var graph = this.ui.editor.graph;
				var selection = graph.getSelectionCells();
				var viewState = graph.getViewState();
				var page = this.ui.currentPage;
	
				this.ui.loadFile(this.getHash(), true, null, mxUtils.bind(this, function()
				{
					if (this.ui.fileLoadedError == null)
					{
						this.ui.restoreViewState(page, viewState, selection);
						
						if (this.backupPatch != null)
						{
							this.patch([this.backupPatch]);
						}
						
						// Carry-over stats
						var file = this.ui.getCurrentFile();
						
						if (file != null)
						{
							file.stats = this.stats;
						}
						
						if (success != null)
						{
							success();
						}
					}
				}), true);
			}
		});
	
		if (this.isModified() && this.backupPatch == null)
		{
			this.ui.confirm(mxResources.get('allChangesLost'), mxUtils.bind(this, function()
			{
				this.handleFileSuccess(DrawioFile.SYNC == 'manual');
			}), fn, mxResources.get('cancel'), mxResources.get('discardChanges'));
		}
		else
		{
			fn();
		}
	}
	catch (e)
	{
		if (error != null)
		{
			error(e);
		}
	}
};

/**
 * Loads the latest version into the file and patches it with the given patch.
 */
DrawioFile.prototype.mergeLatestVersion = function(patches, success, error)
{
	this.getLatestVersion(mxUtils.bind(this, function(latestFile)
	{
		this.ui.editor.graph.model.beginUpdate();
		try
		{
			this.ui.replaceFileData(latestFile.getData());
			
			if (patches != null)
			{
				this.patch(patches);
			}
		}
		finally
		{
			this.ui.editor.graph.model.endUpdate();
		}

		this.invalidChecksum = false;
		this.inConflictState = false;
		this.setDescriptor(latestFile.getDescriptor());
		this.descriptorChanged();
			
		if (success != null)
		{
			success();
		}
	}), error);
};

/**
 * Shows a conflict dialog to the user.
 */
DrawioFile.prototype.copyFile = function(success, error)
{
	this.ui.editor.editAsNew(this.ui.getFileData(true),
		this.ui.getCopyFilename(this));
};

/**
 * Returns true if the patches in the given array are empty.
 */
DrawioFile.prototype.ignorePatches = function(patches)
{
	var ignore = true;
	
	if (patches != null)
	{
		for (var i = 0; i < patches.length && ignore; i++)
		{
			ignore = ignore && mxUtils.isEmptyObject(patches[i]);
		}
	}
	
	return ignore;
};

/**
 * Applies the given patches to the file. If sendChanges is true the snapshot in
 * the sync client is not updated so a diff can be computed and propagated.
 */
DrawioFile.prototype.patch = function(patches, resolver, undoable, sendChanges)
{
	if (patches != null)
	{
		// Saves state of undo history
		var undoMgr = this.ui.editor.undoManager;
		var history = undoMgr.history.slice();
		var nextAdd = undoMgr.indexOfNextAdd;
		
		// Hides graph during updates
		var graph = this.ui.editor.graph;
		graph.container.style.visibility = 'hidden';

		// Ignores change events
		var prev = this.changeListenerEnabled;
		this.changeListenerEnabled = undoable;
		
		// Folding and math change require special handling
		var fold = graph.foldingEnabled;
		var math = graph.mathEnabled;
		
		// Updates text editor if cell changes during validation
		var redraw = graph.cellRenderer.redraw;

		graph.cellRenderer.redraw = function(state)
		{
			if (state.view.graph.isEditing(state.cell))
			{
				state.view.graph.scrollCellToVisible(state.cell);
				state.view.graph.cellEditor.resize();
			}
			
			redraw.apply(this, arguments);
		};
		
		graph.model.beginUpdate();
		try
		{
			if (undoable)
			{
				var oldPages = this.ui.pages.slice();
				var currentPage = this.ui.currentPage;
				var pages = this.ui.applyPatches(this.ui.pages,
					patches, true, resolver, this.isModified());
				
				for (var i = 0; i < pages.length; i++)
				{
					var index = mxUtils.indexOf(this.ui.pages, pages[i]);

					if (index < 0)
					{
						this.ui.insertPage(pages[i], Math.min(
							i, this.ui.pages.length));
					}
					else
					{
						this.ui.movePage(index, i);
					}
				}

				for (var i = 0; i < oldPages.length; i++)
				{
					if (mxUtils.indexOf(pages, oldPages[i]) < 0)
					{
						this.ui.removePage(oldPages[i]);
					}
				}

				// Reselects the current page
				if (mxUtils.indexOf(this.ui.pages, currentPage) >= 0)
				{
					this.ui.selectPage(currentPage, true);
				}
			}
			else
			{
				this.ui.pages = this.ui.applyPatches(this.ui.pages,
					patches, true, resolver, this.isModified());
			}
			
			// Always needs at least one page
			if (this.ui.pages.length == 0)
			{
				this.ui.pages.push(this.ui.createPage());
			}

			// Checks if current page was removed
			if (mxUtils.indexOf(this.ui.pages, this.ui.currentPage) < 0)
			{
				this.ui.selectPage(this.ui.pages[0], true);
			}
		}
		finally
		{
			// Changes visibility before action states are updated via model event
			graph.container.style.visibility = '';
			graph.model.endUpdate();
		
			// Restores previous state
			graph.cellRenderer.redraw = redraw;
			this.changeListenerEnabled = prev;
		
			// Restores history state
			if (!undoable)
			{
				undoMgr.history = history;
				undoMgr.indexOfNextAdd = nextAdd;
				undoMgr.fireEvent(new mxEventObject(mxEvent.CLEAR));
			}
			
			if (this.ui.currentPage == null || this.ui.currentPage.needsUpdate)
			{
				// Updates the graph and background
				if (math != graph.mathEnabled)
				{
					this.ui.editor.updateGraphComponents();
					graph.refresh();
				}
				else
				{
					if (fold != graph.foldingEnabled)
					{
						graph.view.revalidate();
					}
					else
					{
						graph.view.validate();
					}
					
					graph.sizeDidChange();
				}
			}

			// Updates snapshot for finding local changes in sync
			if (this.sync != null && this.isRealtime() && !sendChanges)
			{
				this.sync.snapshot = this.ui.clonePages(this.ui.pages);
			}
			
			this.ui.editor.fireEvent(new mxEventObject('pagesPatched', 'patches', patches));
		}

		EditorUi.debug('DrawioFile.patch', [this],
			'patches', patches, 'resolver', resolver,
			'undoable', undoable);
	}

	return patches;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.save = function(revision, success, error, unloading, overwrite, manual)
{
	try
	{
		EditorUi.debug('DrawioFile.save', [this], 'revision', revision,
			'unloading', unloading, 'overwrite', overwrite, 'manual', manual,
			'saving', this.savingFile, 'editable', this.isEditable(),
			'invalidChecksum', this.invalidChecksum);

		if (!this.isEditable())
		{
			if (error != null)
			{
				error({message: mxResources.get('readOnly')});
			}
			else
			{
				throw new Error(mxResources.get('readOnly'));
			}
		}
		else if (!overwrite && this.invalidChecksum)
		{
			if (error != null)
			{
				error({message: mxResources.get('checksum')});
			}
			else
			{
				throw new Error(mxResources.get('checksum'));
			}
		}
		else
		{
			this.updateFileData();
			this.clearAutosave();
			
			if (success != null)
			{
				success();
			}
		}
	}
	catch (e)
	{
		if (error != null)
		{
			error(e);
		}
		else
		{
			throw e;
		}
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.createData = function()
{
	var actualPages = this.ui.pages;

	if (this.isRealtime())
	{
		// Uses ownPages for getting file data below
		this.ui.pages = this.ownPages;

		// Updates view state in own current page
		if (this.ui.currentPage != null)
		{
			var ownPage = this.ui.getPageById(
				this.ui.currentPage.getId(),
				this.ownPages);

			if (ownPage != null)
			{
				ownPage.viewState = this.ui.editor.graph.getViewState();
				ownPage.needsUpdate = true;
			}
		}
	}

	var result = this.ui.getFileData(null, null, null, null,
		null, null, null, null, this, !this.isCompressed());
	this.ui.pages = actualPages;

	return result;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.updateFileData = function()
{
	// Sends pending local changes and updates own pages
	if (this.sync != null)
	{
		this.sync.sendLocalChanges();
	}

	this.setData(this.createData());
	
	if (this.sync != null)
	{
		this.sync.fileDataUpdated();
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.isCompressedStorage = function()
{
	return Editor.defaultCompressed;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.isCompressed = function()
{
	var compressed = (this.ui.fileNode != null) ? this.ui.fileNode.getAttribute('compressed') : null;
	
	if (compressed != null)
	{
		return compressed != 'false';
	}
	else
	{
		return this.isCompressedStorage() && Editor.compressXml;
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.saveAs = function(filename, success, error) { };

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.saveFile = function(title, revision, success, error) { };

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
DrawioFile.prototype.getFileUrl = function()
{
	return null;
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
DrawioFile.prototype.getFolderUrl = function(fn)
{
	return null;
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
DrawioFile.prototype.getPublicUrl = function(fn)
{
	fn(null);
};

/**
 * Returns true if copy, export and print are not allowed for this file.
 */
DrawioFile.prototype.isRestricted = function()
{
	return DrawioFile.RESTRICT_EXPORT;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.isModified = function()
{
	return this.modified;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.getShadowModified = function()
{
	return this.shadowModified;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.setShadowModified = function(value)
{
	this.shadowModified = value;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.setModified = function(value)
{
	this.modified = value;
	this.shadowModified = value;
};

/**
 * Specifies if the autosave checkbox should be shown in the document
 * properties dialog. Default is false.
 */
DrawioFile.prototype.isAutosaveOptional = function()
{
	return false;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.isAutosave = function()
{
	return !this.inConflictState && this.ui.editor.autosave;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.isRenamable = function()
{
	return false;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.rename = function(title, success, error) { };

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.isMovable = function()
{
	return false;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.isTrashed = function()
{
	return false;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.move = function(folderId, success, error) { };

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.share = function()
{
	if (this.ui.drive != null)
	{
		this.ui.confirm(mxResources.get('saveItToGoogleDriveToCollaborate', [this.getTitle()]),
			mxUtils.bind(this, function()
		{
			this.ui.pickFolder(App.MODE_GOOGLE, mxUtils.bind(this, function(folderId)
			{
				var graph = this.ui.editor.graph;
				var selection = graph.getSelectionCells();
				var viewState = graph.getViewState();
				var page = this.ui.currentPage;
				
				this.ui.createFile(this.getTitle(), this.ui.getFileData(null, null, null, null, null,
					null, null, null, this), null, App.MODE_GOOGLE, null, true, folderId, null, null,
					mxUtils.bind(this, function()
					{
						this.ui.restoreViewState(page, viewState, selection);
						this.ui.actions.get('share').funct();
					}));
			}));
		}), null, mxResources.get('saveToGoogleDrive', null, 'Save to Google Drive'), mxResources.get('cancel'));
	}
	else
	{
		this.ui.alert(mxResources.get('sharingAvailable'), null, 380);
	}
};

/**
 * Returns the hash of the file which consists of a prefix for the storage
 * type and the ID of the file.
 */
DrawioFile.prototype.getHash = function()
{
	return '';
};

/**
 * Returns the ID of the file.
 */
DrawioFile.prototype.getId = function()
{
	return '';
};

/**
 * Returns true if the file is editable.
 */
DrawioFile.prototype.isEditable = function()
{
	return !this.ui.editor.isChromelessView() || this.ui.editor.editable;
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
DrawioFile.prototype.getUi = function()
{
	return this.ui;
};

/**
 * Returns the current title of the file.
 */
DrawioFile.prototype.getTitle = function()
{
	return '';
};

/**
 * Sets the current data of the file.
 */
DrawioFile.prototype.setData = function(data)
{
	this.data = data;

	EditorUi.debug('DrawioFile.setData',
		[this], 'data', [data]);
};

/**
 * Returns the current data of the file.
 */
DrawioFile.prototype.getData = function()
{
	return this.data;
};

/**
 * Removes external fonts.
 */
DrawioFile.prototype.removeExtFonts = function(elems)
{
	for (var i = 0; elems != null && i < elems.length; i++)
	{
		var e = elems[i];
		
		if (e.id != null && e.id.indexOf('extFont_') == 0)
		{
			e.parentNode.removeChild(e);
		}
	}
};

/**
 * Opens this file in the editor.
 */
DrawioFile.prototype.open = function()
{
	this.stats.opened++;
	var data = this.getData();
	
	if (data != null)
	{
		// Removes external fonts of previous file
		this.removeExtFonts(document.querySelectorAll('head > style[id]'));
		this.removeExtFonts(document.querySelectorAll('head > link[id]'));
		this.ui.setFileData(data);
		
		// Updates shadow in case any page IDs have been updated
		// only if the file has not been modified and reopened
		if (!this.isModified())
		{
			this.setShadowPages(this.ui.clonePages(this.ui.pages));
		}
	}

	this.installListeners();
	
	if (this.isSyncSupported())
	{
		this.startSync();
	}
};

/**
 * Hook for subclassers.
 */
DrawioFile.prototype.isSyncSupported = function()
{
	return false;
};

/**
 * Returns true if the realtime model was initialized.
 */
DrawioFile.prototype.isRealtime = function()
{
	return this.ownPages != null && this.ui.pages != null;
};

/**
 * Returns true if the file supportes realtime collaboration.
 */
DrawioFile.prototype.isRealtimeSupported = function()
{
	return false;
};

/**
 * Returns true if realtime collaboration is enabled for this file.
 */
DrawioFile.prototype.isRealtimeEnabled = function()
{
	return Editor.enableRealtime && urlParams['fast-sync'] != '0';
};

/**
 * Returns true if all changes should be sent out immediately.
 */
DrawioFile.prototype.setRealtimeEnabled = function()
{
	// do nothing
};

/**
 * Returns true if realtime can be enabled and disabled for this file.
 */
DrawioFile.prototype.isRealtimeOptional = function()
{
	return false;
};

/**
 * Returns the ready state of realtime collaboration websocket.
 * 
 * 0 - CONNECTING
 * 1 - OPEN
 * 2 - CLOSING
 * 3 - CLOSED
 */
DrawioFile.prototype.getRealtimeState = function()
{
	return (this.sync != null && this.sync.p2pCollab != null) ?
		this.sync.p2pCollab.getState() : 3 /* CLOSED */;
};

/**
 * Returns true if all changes should be sent out immediately.
 */
DrawioFile.prototype.getRealtimeError = function()
{
	return (this.sync != null && this.sync.p2pCollab != null) ?
		this.sync.p2pCollab.getLastError() : null;
};

/**
 * Returns true if the notification to update should be sent
 * together with the save request.
 */
DrawioFile.prototype.isOptimisticSync = function()
{
	return false;
};

/**
 * Hook for subclassers.
 */
DrawioFile.prototype.isRevisionHistorySupported = function()
{
	return false;
};

/**
 * Hook for subclassers.
 */
DrawioFile.prototype.getRevisions = function(success, error)
{
	success(null);
};

/**
 * Hook for subclassers to get the latest descriptor of this file
 * and return it in the success handler.
 */
DrawioFile.prototype.loadDescriptor = function(success, error)
{
	success(null);
};

/**
 * Hook for subclassers to get the latest etag of this file
 * and return it in the success handler.
 */
DrawioFile.prototype.loadPatchDescriptor = function(success, error)
{
	this.loadDescriptor(mxUtils.bind(this, function(desc)
	{
		success(desc);
	}), error);
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.patchDescriptor = function(desc, patch)
{
	this.setDescriptorEtag(desc, this.getDescriptorEtag(patch));
	this.descriptorChanged();
};

/**
 * Creates a starts the synchronization.
 */
DrawioFile.prototype.startSync = function()
{
	if (((DrawioFile.SYNC == 'auto' || DrawioFile.SYNC == 'fast')  &&
		urlParams['stealth'] != '1') && (urlParams['rt'] == '1' ||
		!this.ui.editor.chromeless || this.ui.editor.editable))
	{
		if (this.sync == null)
		{
			this.sync = new DrawioFileSync(this);
		}

		this.addListener('realtimeStateChanged', mxUtils.bind(this, function()
		{
			this.ui.fireEvent(new mxEventObject('realtimeStateChanged'));
		}));
		
		this.sync.start();
	}
};

/**
 * Hook for subclassers to check if an error is a conflict.
 */
DrawioFile.prototype.isConflict = function()
{
	return false;
};

/**
 * Gets the channel ID for sync messages.
 */
DrawioFile.prototype.getChannelId = function()
{
	// Slash, space and plus replaced with underscore
	return Graph.compress(this.getHash()).replace(/[\/ +]/g, '_');
};

/**
 * Gets the channel ID from the given descriptor.
 */
DrawioFile.prototype.getChannelKey = function(desc)
{
	return null;
};

/**
 * Returns the current etag.
 */
DrawioFile.prototype.getCurrentUser = function()
{
	return null;
};

/**
 * Hook for subclassers to get the latest version of this file
 * and return it in the success handler.
 */
DrawioFile.prototype.getLatestVersion = function(success, error)
{
	success(null);
};

/**
 * Hook for subclassers to get the latest version ID of this file
 * and return it in the success handler.
 */
 DrawioFile.prototype.getLatestVersionId = function(success, error)
 {
	 success(-1);
 };

/**
 * Returns the last modified date of this file.
 */
DrawioFile.prototype.getLastModifiedDate = function()
{
	return new Date();
};

/**
 * Sets the current revision ID.
 */
DrawioFile.prototype.setCurrentRevisionId = function(id)
{
	this.setDescriptorRevisionId(this.getDescriptor(), id);
};

/**
 * Returns the current revision ID.
 */
DrawioFile.prototype.getCurrentRevisionId = function()
{
	return this.getDescriptorRevisionId(this.getDescriptor());
};

DrawioFile.prototype.getPullingInterval = function()
{
	return 10000;
};

/**
 * Sets the current etag.
 */
DrawioFile.prototype.setCurrentEtag = function(etag)
{
	this.setDescriptorEtag(this.getDescriptor(), etag);
};

/**
 * Returns the current etag.
 */
DrawioFile.prototype.getCurrentEtag = function()
{
	return this.getDescriptorEtag(this.getDescriptor());
};

/**
 * Returns the descriptor from this file.
 */
DrawioFile.prototype.getDescriptor = function()
{
	return null;
};

/**
 * Sets the descriptor for this file.
 */
DrawioFile.prototype.setDescriptor = function() { };

/**
 * Updates the revision ID on the given descriptor.
 */
DrawioFile.prototype.setDescriptorRevisionId = function(desc, id)
{
	this.setDescriptorEtag(desc, id);
};

/**
 * Returns the revision ID from the given descriptor.
 */
DrawioFile.prototype.getDescriptorRevisionId = function(desc)
{
	return this.getDescriptorEtag(desc);
};

/**
 * Updates the etag on the given descriptor.
 */
DrawioFile.prototype.setDescriptorEtag = function(desc, etag) { };

/**
 * Returns the etag from the given descriptor.
 */
DrawioFile.prototype.getDescriptorEtag = function(desc)
{
	return null;
};

/**
 * Returns the secret from the given descriptor. This must be stored
 * in a custom property and generated by the saving client so that a
 * token can be obtained from the cache for writing the patch after
 * saving the file. If this cannot be saved in a custom property then
 * null must be returned so that no deltas are used for updating the
 * file (the file is reloaded every time instead). This is needed to
 * make sure nobody with read-only permissions can write a patch to
 * the cache before the saving client wrote the patch and inject
 * data into the file via other clients merging that data.
 */
DrawioFile.prototype.getDescriptorSecret = function(desc)
{
	return null;
};

/**
 * Returns the checksum from the given descriptor. This must be stored
 * in a custom property and generated by the saving client so that
 * the current state of the editor can be compared with the state.
 */
DrawioFile.prototype.getDescriptorChecksum = function(desc)
{
	return null;
};

/**
 * Installs the change listener.
 */
DrawioFile.prototype.installListeners = function()
{
	if (this.changeListener == null)
	{
		this.changeListener = mxUtils.bind(this, function(sender, eventObject)
		{
			var edit = (eventObject != null) ? eventObject.getProperty('edit') : null;
			
			if (this.changeListenerEnabled && this.isEditable() && (edit == null || !edit.ignoreEdit))
			{
				this.fileChanged();
			}
		});
		
		this.ui.editor.graph.model.addListener(mxEvent.CHANGE, this.changeListener);
	
		// Some options trigger autosave
		this.ui.editor.graph.addListener('gridSizeChanged', this.changeListener);
		this.ui.editor.graph.addListener('shadowVisibleChanged', this.changeListener);
		this.ui.addListener('pageFormatChanged', this.changeListener);
		this.ui.addListener('pageScaleChanged', this.changeListener);
		this.ui.addListener('backgroundColorChanged', this.changeListener);
		this.ui.addListener('backgroundImageChanged', this.changeListener);
		this.ui.addListener('foldingEnabledChanged', this.changeListener);
		this.ui.addListener('mathEnabledChanged', this.changeListener);
		this.ui.addListener('gridEnabledChanged', this.changeListener);
		this.ui.addListener('guidesEnabledChanged', this.changeListener);
		this.ui.addListener('tooltipsEnabledChanged', this.changeListener);
		this.ui.addListener('pageViewChanged', this.changeListener);
		this.ui.addListener('connectionPointsChanged', this.changeListener);
		this.ui.addListener('connectionArrowsChanged', this.changeListener);
	}
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
DrawioFile.prototype.addAllSavedStatus = function(status)
{
	if (this.ui.statusContainer != null && this.ui.getCurrentFile() == this)
	{
		status = (status != null) ? status : mxUtils.htmlEntities(mxResources.get(this.allChangesSavedKey));
		var rev = (this.isRevisionHistorySupported() && status != mxUtils.htmlEntities(
			mxResources.get(this.savingStatusKey)) + '...') ? 'data-action="revisionHistory" ' : '';
		this.ui.editor.setStatus('<div ' + rev + 'title="'+ status + '">' + status + '</div>');
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.saveDraft = function()
{
	try
	{
		if (this.draftId == null)
		{
			if (this.usedDraftId != null)
			{
				this.draftId = this.usedDraftId;
			}
			else
			{
				this.draftId = Editor.guid();
			}
		}
		
		var draft = {type: 'draft',
			created: this.created,
			modified: new Date().getTime(),
			data: this.ui.getFileData(),
			title: this.getTitle(),
			fileObject: this.fileObject,
			aliveCheck: this.ui.draftAliveCheck};
		this.ui.setDatabaseItem('.draft_' + this.draftId,
			JSON.stringify(draft));
		
		EditorUi.debug('DrawioFile.saveDraft', [this],
			'draftId', this.draftId, [draft]);
	}
	catch (e)
	{
		// Removes any stored draft
		this.removeDraft();
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.removeDraft = function()
{
	try
	{
		if (this.draftId != null)
		{
			EditorUi.debug('DrawioFile.removeDraft',
				[this], 'draftId', this.draftId);
			
			this.ui.removeDatabaseItem('.draft_' + this.draftId);
			this.usedDraftId = this.draftId;
			this.draftId = null;
		}
	}
	catch (e)
	{
		// ignore
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.addUnsavedStatus = function(err)
{
	if (!this.inConflictState && this.ui.statusContainer != null && this.ui.getCurrentFile() == this)
	{
		if (err instanceof Error && err.message != null && err.message != '')
		{
			var status = mxUtils.htmlEntities(mxResources.get('unsavedChanges'));
			this.ui.editor.setStatus('<div title="'+ status + '" data-title="' +
				mxUtils.htmlEntities(mxResources.get('unsavedChanges')) +
				'" data-message="' + mxUtils.htmlEntities(err.message) +
				'" class="geStatusAlert">' + status + ' (' +
				mxUtils.htmlEntities(err.message) + ')</div>');
		}
		else
		{
			var msg = this.getErrorMessage(err);

			if (msg == null && this.lastSaved != null)
			{
				var str = this.ui.timeSince(new Date(this.lastSaved));
				
				// Only show if more than a minute ago
				if (str != null)
				{
					msg = mxResources.get('lastSaved', [str]);
				}
			}
			
			if (msg != null && msg.length > 60)
			{
				msg = msg.substring(0, 60) + '...';
			}

			var status = mxUtils.htmlEntities(mxResources.get('unsavedChangesClickHereToSave')) +
				((msg != null && msg != '') ? ' (' + mxUtils.htmlEntities(msg) + ')' : '');
			var action = 'data-action="' + ((this.ui.mode == null || !this.isEditable()) ?
				'saveAs' : 'save') + '"';
			this.ui.editor.setStatus('<div ' + action + ' title="' +
				status + '" class="geStatusAlert">' + status +
				' <img class="geAdaptiveAsset" src="' + Editor.saveImage + '"/></div>');
			
			if (EditorUi.enableDrafts && (this.getMode() == null || EditorUi.isElectronApp))
			{
				this.lastDraftSave = this.lastDraftSave || Date.now();

				if (this.saveDraftThread != null)
				{
					window.clearTimeout(this.saveDraftThread);
					this.saveDraftThread = null;

					// Max delay without saving is double the delay for autosave or 30 sec
					if (Date.now() - this.lastDraftSave > Math.max(2 * EditorUi.draftSaveDelay, 30000))
					{
						this.lastDraftSave = Date.now();
						this.saveDraft();
					}
				}

				this.saveDraftThread = window.setTimeout(mxUtils.bind(this, function()
				{
					this.lastDraftSave = Date.now();
					this.saveDraftThread = null;
					this.saveDraft();
				}), EditorUi.draftSaveDelay || 0);
			}
		}
	}
};

/**
 * Halts all timers and shows a conflict status message. The optional error
 * handler is invoked first.
 */
DrawioFile.prototype.addConflictStatus = function(message, fn)
{
	if (this.invalidChecksum && message == null)
	{
		message = mxResources.get('checksum');
	}

	this.setConflictStatus(mxUtils.htmlEntities(mxResources.get('fileChangedSync')) +
		((message != null && message != '') ? ' (' +
		mxUtils.htmlEntities(message) + ')' : ''), fn);
	this.ui.spinner.stop();
	this.clearAutosave();
};

/**
 * Halts all timers and shows a conflict status message. The optional error
 * handler is invoked first.
 */
DrawioFile.prototype.setConflictStatus = function(message, fn)
{
	this.ui.editor.setStatus('<div title="'+ message + '" ' + ((fn != null) ?
		'data-action="statusFunction"' : '') + ' class="geStatusAlert">' + message +
		'<img data-link="https://www.drawio.com/doc/faq/synchronize" src="' +
		Editor.helpImage + '" style="cursor:help;"/></div>', fn);
};

/**
 * Shows a conflict dialog to the user.
 */
DrawioFile.prototype.showRefreshDialog = function(success, error, message)
{
	if (message == null)
	{
		message = mxResources.get('checksum');
	}
	
	if (this.ui.editor.isChromelessView() && !this.ui.editor.editable)
	{
		this.ui.alert(mxResources.get('fileChangedSync'), mxUtils.bind(this, function()
		{
			this.reloadFile(success, error);
		}));
	}
	else
	{
		// Allows for escape key to be pressed while dialog is showing
		this.addConflictStatus(message, mxUtils.bind(this, function()
		{
			this.showRefreshDialog(success, error);
		}));
		
		this.ui.showError(mxResources.get('warning') + ' (' + message + ')',
			mxResources.get('fileChangedSyncDialog'),
			mxResources.get('makeCopy'), mxUtils.bind(this, function()
		{
			this.copyFile(success, error);
		}), null, mxResources.get('merge'), mxUtils.bind(this, function()
		{
			this.reloadFile(success, error);
		}), mxResources.get('cancel'), mxUtils.bind(this, function()
		{
			this.ui.hideDialog();
		}), 380, 130);
	}
};

/**
 * Shows a dialog with no synchronize option.
 */
DrawioFile.prototype.showCopyDialog = function(success, error, overwrite)
{
	this.inConflictState = false;
	this.invalidChecksum = false;
	this.addUnsavedStatus();
	
	this.ui.showError(mxResources.get('externalChanges'),
		mxResources.get('fileChangedOverwriteDialog'),
		mxResources.get('makeCopy'), mxUtils.bind(this, function()
		{
			this.copyFile(success, error);
		}), null, mxResources.get('overwrite'), overwrite,
		mxResources.get('cancel'), mxUtils.bind(this, function()
	{
		this.ui.hideDialog();
	}), 380, 150);
};

/**
 * Shows a conflict dialog to the user.
 */
DrawioFile.prototype.showConflictDialog = function(overwrite, synchronize)
{
	this.ui.showError(mxResources.get('externalChanges'),
		mxResources.get('fileChangedSyncDialog'),
		mxResources.get('overwrite'), overwrite, null,
		mxResources.get('merge'), synchronize,
		mxResources.get('cancel'), mxUtils.bind(this, function()
	{
		this.ui.hideDialog();
		this.handleFileError(null, false);
	}), 380, 130);
};

/**
 * Checks if the client is authorized and calls the next step.
 */
DrawioFile.prototype.redirectToNewApp = function(error, details)
{
	this.ui.spinner.stop();
	
	if (!this.redirectDialogShowing)
	{
		this.redirectDialogShowing = true;
		
		var url = window.location.protocol + '//' + window.location.host + '/' + this.ui.getSearch(
			['create', 'title', 'mode', 'url', 'drive', 'splash', 'state']) + '#' + this.getHash();
		var msg = mxResources.get('redirectToNewApp');
		
		if (details != null)
		{
			msg += ' (' + details + ')';
		}
		
		var redirect = mxUtils.bind(this, function()
		{
			var fn = mxUtils.bind(this, function()
			{
				this.redirectDialogShowing = false;
				
				if (window.location.href == url)
				{
					window.location.reload();
				}
				else
				{
					window.location.href = url;
				}
			});
			
			if (error == null && this.isModified())
			{
				this.ui.confirm(mxResources.get('allChangesLost'), mxUtils.bind(this, function()
				{
					this.redirectDialogShowing = false;
				}), fn, mxResources.get('cancel'), mxResources.get('discardChanges'));
			}
			else
			{
				fn();
			}
		});
		
		if (error != null)
		{
			if (this.isModified())
			{
				this.ui.confirm(msg, mxUtils.bind(this, function()
				{
					this.redirectDialogShowing = false;
					error();
				}), redirect, mxResources.get('cancel'), mxResources.get('discardChanges'));
			}
			else
			{
				this.ui.confirm(msg, redirect, mxUtils.bind(this, function()
				{
					this.redirectDialogShowing = false;
					error();
				}));
			}
		}
		else
		{
			this.ui.alert(mxResources.get('redirectToNewApp'), redirect);
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.handleFileSuccess = function(saved)
{
	this.ui.spinner.stop();
	
	if (this.ui.getCurrentFile() == this)
	{
		EditorUi.debug('DrawioFile.handleFileSuccess', [this],
			'saved', saved, 'modified', this.isModified(),
			'remoteFileChanged', (this.sync == null) ?
			'n/a' : this.sync.remoteFileChanged);

		if (this.isModified())
		{
			this.fileChanged();
		}
		else if (saved)
		{
			if (this.isTrashed())
			{
				this.addAllSavedStatus(mxUtils.htmlEntities(mxResources.get(this.allChangesSavedKey)) + ' (' +
					mxUtils.htmlEntities(mxResources.get('fileMovedToTrash')) + ')');
			}
			else
			{
				this.addAllSavedStatus();
			}

			if (this.sync != null)
			{
				this.sync.resetUpdateStatusThread();
				
				if (this.sync.remoteFileChanged)
				{
					this.sync.remoteFileChanged = false;
					this.sync.fileChangedNotify();
				}
			}
		}
		else
		{
			this.ui.editor.setStatus('');
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.handleFileError = function(err, manual)
{
	this.ui.spinner.stop();
	
	if (this.ui.getCurrentFile() == this)
	{
		if (this.inConflictState)
		{
			this.handleConflictError(err, manual);
		}
		else
		{
			if (this.isModified())
			{
				this.addUnsavedStatus(err);
			}
			
			if (manual)
			{
				this.ui.handleError(err, (err != null) ? mxResources.get('errorSavingFile') : null);
			}
			else if (!this.isModified())
			{
				var msg = this.getErrorMessage(err);
				
				if (msg != null && msg.length > 60)
				{
					msg = msg.substring(0, 60) + '...';
				}
				
				this.ui.editor.setStatus('<div class="geStatusAlert">' +
					mxUtils.htmlEntities(mxResources.get('error')) + ((msg != null) ?
					' (' + mxUtils.htmlEntities(msg) + ')' : '') + '</div>');
			}
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.handleConflictError = function(err, manual)
{
	var success = mxUtils.bind(this, function()
	{
		this.handleFileSuccess(true);
	});
	
	var error = mxUtils.bind(this, function(err2)
	{
		this.handleFileError(err2, true);
	});
		
	var overwrite = mxUtils.bind(this, function()
	{
		if (this.ui.spinner.spin(document.body, mxResources.get(this.savingSpinnerKey)))
		{
			this.ui.editor.setStatus('');
			var isRepoFile = (this.constructor == GitHubFile) || (this.constructor == GitLabFile);
			this.save(true, success, error, null, true, (isRepoFile &&
				err != null) ? err.commitMessage : null);
		}
	});

	var synchronize = mxUtils.bind(this, function()
	{
		if (this.ui.spinner.spin(document.body, mxResources.get('updatingDocument')))
		{
			this.synchronizeFile(mxUtils.bind(this, function()
			{
				this.ui.spinner.stop();
				
				if (this.ui.spinner.spin(document.body, mxResources.get(this.savingSpinnerKey)))
				{
					var isRepoFile = (this.constructor == GitHubFile) || (this.constructor == GitLabFile);
					this.save(true, success, error, null, null, (isRepoFile &&
						err != null) ? err.commitMessage : null);
				}
			}), error);
		}
	})

	if (DrawioFile.SYNC == 'none')
	{
		this.showCopyDialog(success, error, overwrite);
	}
	else if (this.invalidChecksum)
	{
		this.showRefreshDialog(success, error, this.getErrorMessage(err));
	}
	else if (manual)
	{
		this.showConflictDialog(overwrite, synchronize);
	}
	else
	{
		this.addConflictStatus(this.getErrorMessage(err), mxUtils.bind(this, function()
		{
			this.ui.editor.setStatus(mxUtils.htmlEntities(
				mxResources.get('updatingDocument')));
			this.synchronizeFile(success, error);
		}));
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.getErrorMessage = function(err)
{
	var msg = (err != null) ? ((err.error != null) ? err.error.message : err.message) : null;
	
	if (msg == null && err != null && err.code == App.ERROR_TIMEOUT)
	{
		msg = mxResources.get('timeout');
	}
	// XHR blocked by CORS or response has no CORS headers
	else if (msg == '0')
	{
		msg = mxResources.get('noResponse');
	}
	
	return msg;
};

/**
 * Returns true if the oldest unsaved change is older than <EditorUi.warnInterval>.
 */
DrawioFile.prototype.isOverdue = function()
{
	return this.ageStart != null && (Date.now() - this.ageStart.getTime()) >= this.ui.warnInterval;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.fileChanged = function(sync)
{
	sync = (sync != null) ? sync : true;
	this.lastChanged = new Date();
	this.setModified(true);

	EditorUi.debug('DrawioFile.fileChanged', [this],
		'autosave', this.isAutosave(),
		'saving', this.savingFile);

	if (this.isAutosave())
	{
		if (this.savingStatusKey != null)
		{
			this.addAllSavedStatus(mxUtils.htmlEntities(mxResources.get(this.savingStatusKey)) + '...');
		}
		
		this.ui.scheduleSanityCheck();
		
		if (this.ageStart == null)
		{
			this.ageStart = new Date();
		}
		
		this.autosave(this.autosaveDelay, this.maxAutosaveDelay, mxUtils.bind(this, function(resp)
		{
			this.ui.stopSanityCheck();

			// Does not update status if another autosave was scheduled
			if (this.autosaveThread == null)
			{
				this.handleFileSuccess(true);
				this.ageStart = null;
			}
			else if (this.isModified())
			{
				this.ui.scheduleSanityCheck();
				this.ageStart = this.lastChanged;
			}
		}), mxUtils.bind(this, function(err)
		{
			this.handleFileError(err);
		}));
	}
	else
	{
		this.ageStart = null;
		
		if ((!this.isAutosaveOptional() || !this.ui.editor.autosave) &&
			!this.inConflictState)
		{
			this.addUnsavedStatus();
		}
	}

	if (this.sync != null && sync)
	{
		this.sync.localFileChanged();
	}
};

/**
 * Creates a secret and token pair for writing a patch to the cache.
 */
DrawioFile.prototype.createSecret = function(success)
{
	var secret = Editor.guid(32);
	
	if (Editor.enableRealtimeCache && this.sync != null &&
		!this.isOptimisticSync())
	{
		this.sync.createToken(secret,
			mxUtils.bind(this, function(token)
			{
				EditorUi.debug('DrawioFile.createSecret', [this],
					'secret', secret, 'token', token);

				success(secret, token);
			}), mxUtils.bind(this, function()
			{
				success(secret);
			}));
	}
	else
	{
		success(secret);
	}
};

/**
 * Invokes sync and updates shadow document.
 */
DrawioFile.prototype.fileSaving = function()
{
	if (this.sync != null)
	{
		this.sync.fileSaving();
	}
};

/**
 * Invokes sync and updates shadow document.
 */
DrawioFile.prototype.fileSaved = function(savedData, lastDesc, success, error, token, pages, checksum)
{
	this.lastSaved = new Date();
	this.ageStart = null;
	this.stats.saved++;

	try
	{
		this.inConflictState = false;
		this.invalidChecksum = false;
		pages = (pages != null) ? pages : this.ui.getPagesForXml(savedData);

		try
		{
			if (this.sync == null || this.isOptimisticSync())
			{
				this.setShadowPages(pages);
				
				if (this.sync != null)
				{
					this.sync.lastModified = this.getLastModifiedDate();
					this.sync.resetUpdateStatusThread();

					if (this.isRealtime())
					{
						this.sync.scheduleCleanup();
					}
				}
				
				if (success != null)
				{
					success();
				}
			}
			else
			{
				this.sync.fileSaved(pages, lastDesc,
					success, error, token, checksum);
			}
		}
		catch (e)
		{
			this.inConflictState = true;
			this.invalidChecksum = true;
			this.descriptorChanged();
			
			if (error != null)
			{
				error(e);
			}

			try
			{
				if (this.errorReportsEnabled)
				{
					this.sendErrorReport('Error in fileSaved', null, e);
				}
				else
				{
					var user = this.getCurrentUser();
					var uid = (user != null) ? user.id : 'unknown';
					
					EditorUi.logError('Error in fileSaved', null,
						this.getMode() + '.' + this.getId(),
						uid, e);
				}
			}
			catch (e2)
			{
				// ignore
			}
		}
		
		EditorUi.debug('DrawioFile.fileSaved', [this],
			'savedData', [savedData], 'desc', [lastDesc],
			'inConflictState', this.inConflictState,
			'invalidChecksum', this.invalidChecksum);
	}
	catch (e)
	{
		this.descriptorChanged();
		
		if (error != null)
		{
			error(e);
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.autosave = function(delay, maxDelay, success, error)
{
	if (this.lastAutosave == null)
	{
		this.lastAutosave = Date.now();
	}
	
	var tmp = (Date.now() - this.lastAutosave < maxDelay) ? delay : 0;
	this.clearAutosave();
	
	// Starts new timer or executes immediately if not unsaved for maxDelay
	var thread = window.setTimeout(mxUtils.bind(this, function()
	{
		try
		{
			this.lastAutosave = null;
			
			if (this.autosaveThread == thread)
			{
				this.autosaveThread = null;
			}

			EditorUi.debug('DrawioFile.autosave', [this], 'thread', thread,
				'modified', this.isModified(), 'now', this.isAutosaveNow(),
				'saving', this.savingFile);
			
			// Workaround for duplicate save if UI is blocking
			// after save while pending autosave triggers
			if (this.isModified() && this.isAutosaveNow())
			{
				var rev = this.isAutosaveRevision();
				
				if (rev)
				{
					this.lastAutosaveRevision = new Date().getTime();
				}
				
				this.save(rev, mxUtils.bind(this, function(resp)
				{
					this.autosaveCompleted();
					
					if (success != null)
					{
						success(resp);
					}
				}), mxUtils.bind(this, function(resp)
				{
					if (error != null)
					{
						error(resp);
					}
				}));
			}
			else
			{
				if (!this.isModified())
				{
					this.ui.editor.setStatus('');
				}
				
				if (success != null)
				{
					success(null);
				}
			}
		}
		catch (e)
		{
			if (error != null)
			{
				error(e);
			}
		}
	}), tmp);

	EditorUi.debug('DrawioFile.autosave', [this], 'thread', thread,
		'delay', tmp, 'saving', this.savingFile);

	this.autosaveThread = thread;
};

/**
 * Returns true if an autosave is required at the time of execution.
 * This implementation returns true.
 */
DrawioFile.prototype.isAutosaveNow = function()
{
	return true;
};

/**
 * Hooks for subclassers after the autosave has completed.
 */
DrawioFile.prototype.autosaveCompleted = function() { };

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFile.prototype.clearAutosave = function()
{
	if (this.autosaveThread != null)
	{
		window.clearTimeout(this.autosaveThread);
		this.autosaveThread = null;
	}
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
DrawioFile.prototype.isAutosaveRevision = function()
{
	var now = new Date().getTime();
	
	return (this.lastAutosaveRevision == null) || (now - this.lastAutosaveRevision) > this.maxAutosaveRevisionDelay;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.descriptorChanged = function()
{
	this.fireEvent(new mxEventObject('descriptorChanged'));
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
DrawioFile.prototype.contentChanged = function()
{
	this.fireEvent(new mxEventObject('contentChanged'));
};

/**
 * Returns the location as a new object.
 */
DrawioFile.prototype.close = function(unloading)
{
	this.updateFileData();
	this.stats.closed++;
	
	if (this.isAutosave() && this.isModified())
	{
		this.save(this.isAutosaveRevision(), null, null, unloading);
	}

	this.destroy();
};

/**
 * Returns the location as a new object.
 */
DrawioFile.prototype.hasSameExtension = function(title, newTitle)
{
	if (title != null && newTitle != null)
	{
		var dot = title.lastIndexOf('.');
		var ext = (dot > 0) ? title.substring(dot) : '';
		dot = newTitle.lastIndexOf('.');

		return ext === ((dot > 0) ? newTitle.substring(dot) : '');
	}
	
	return title == newTitle;
};

/**
 * Removes the change listener.
 */
DrawioFile.prototype.removeListeners = function()
{
	if (this.changeListener != null)
	{
		this.ui.editor.graph.model.removeListener(this.changeListener);
		this.ui.editor.graph.removeListener(this.changeListener);
		this.ui.removeListener(this.changeListener);
		this.changeListener = null;
	}
};

/**
 * Stops any pending autosaves and removes all listeners.
 */
DrawioFile.prototype.destroy = function()
{
	this.clearAutosave();
	this.removeListeners();
	this.stats.destroyed++;

	if (this.sync != null)
	{
		this.sync.destroy();
		this.sync = null;
	}
};

/**
 * Are comments supported
 */
DrawioFile.prototype.commentsSupported = function()
{
	return false; //The default is false and files that support it must explicitly state that
};

/**
 * Show refresh button?
 */
DrawioFile.prototype.commentsRefreshNeeded = function()
{
	return true;
};

/**
 * Show save button?
 */
DrawioFile.prototype.commentsSaveNeeded = function()
{
	return false;
};

/**
 * Get comments of the file
 */
DrawioFile.prototype.getComments = function(success, error)
{
	success([]); //placeholder
};

/**
 * Add a comment to the file
 */
DrawioFile.prototype.addComment = function(comment, success, error)
{
	success(Date.now()); //placeholder
};

/**
 * Can add a reply to a reply
 */
DrawioFile.prototype.canReplyToReplies = function()
{
	return true;
};

/**
 * Can add comments (The permission to comment to this file)
 */
DrawioFile.prototype.canComment = function()
{
	return true;
};

/**
 * Get a new comment object
 */
DrawioFile.prototype.newComment = function(content, user)
{
	return new DrawioComment(this, null, content, Date.now(), Date.now(), false, user);
};
