/**
 * Copyright (c) 2006-2018, JGraph Ltd
 * Copyright (c) 2006-2018, Gaudenz Alder
 * 
 * Realtime collaboration for any file.
 */
DrawioFileSync = function(file)
{
	mxEventSource.call(this);

	this.lastActivity = Date.now();
	this.clientId = Editor.guid();
	this.ui = file.ui;
	this.file = file;

    // Listens to online state changes
	this.onlineListener = mxUtils.bind(this, function()
	{
		this.updateOnlineState();

		if (this.isConnected() && !this.ui.isOffline(true))
		{
			this.fileChangedNotify();
		}
		else
		{
			this.updateStatus();
		}
	});
    
	mxEvent.addListener(window, 'offline', this.onlineListener);
	mxEvent.addListener(window, 'online', this.onlineListener);

    // Listens to realtime state changes
	this.realtimeListener = mxUtils.bind(this, function()
	{
		this.updateOnlineState();
	});

	this.file.addListener('realtimeStateChanged', this.realtimeListener);

	// Listens to autosave changes to update the realtime collab socket
	this.autosaveListener = mxUtils.bind(this, function()
	{
		this.updateRealtime();
	});

	this.ui.editor.addListener('autosaveChanged', this.autosaveListener);

    // Listens to visible state changes
	this.visibleListener = mxUtils.bind(this, function()
	{
		if (document.visibilityState == 'hidden')
		{
			if (this.isConnected())
			{
				this.stop();
			}
		}
		else
		{
			this.start();
		}
	});
    
	mxEvent.addListener(document, 'visibilitychange', this.visibleListener);
	
    // Listens to visible state changes
	this.activityListener = mxUtils.bind(this, function(evt)
	{
		this.lastActivity = Date.now();
		this.start();
	});

	mxEvent.addListener(document, (mxClient.IS_POINTER) ? 'pointermove' : 'mousemove', this.activityListener);
	mxEvent.addListener(document, 'keypress', this.activityListener);
	mxEvent.addListener(window, 'focus', this.activityListener);
	
	if (!mxClient.IS_POINTER && mxClient.IS_TOUCH)
	{
		mxEvent.addListener(document, 'touchstart', this.activityListener);
		mxEvent.addListener(document, 'touchmove', this.activityListener);	
	}

	// Listens to fast sync activitiy
	this.file.addListener('realtimeMessage', this.activityListener);

	// Listens to errors in the pusher API
	this.pusherErrorListener = mxUtils.bind(this, function(err)
	{
		if (err.error != null && err.error.data != null &&
			err.error.data.code === 4004)
		{
			EditorUi.logError('Error: Pusher Limit', null, this.file.getId());
		}
	});

    // Listens to connection state changes
	this.connectionListener = mxUtils.bind(this, function()
	{
		this.updateOnlineState();
		this.updateStatus();
		
		if (this.isConnected())
		{
			if (!this.announced && Editor.enableRealtimeCache &&
				!Editor.p2pSyncNotify)
			{
				this.sendJoinMessage();
			}
			else if (this.announced)
			{
				// Catchup on any lost edits
				this.fileChangedNotify(null, true);
			}
		}
	});
	
	// Listens to messages
	this.changeListener = mxUtils.bind(this, function(data)
	{
		this.file.stats.msgReceived++;
		this.lastActivity = Date.now();

		if (this.enabled && !this.file.inConflictState &&
			!this.file.redirectDialogShowing)
		{
			try
			{
				var msg = this.stringToObject(data);
				
				if (msg != null)
				{
					EditorUi.debug('DrawioFileSync.message', [this], msg, data.length, 'bytes');

					// Handles protocol mismatch
					if (msg.v > DrawioFileSync.PROTOCOL)
					{
						this.file.redirectToNewApp(mxUtils.bind(this, function()
						{
							// Callback adds cancel option
						}));
					}
					else if (msg.v === DrawioFileSync.PROTOCOL && msg.d != null)
					{
						this.handleMessageData(msg.d);
					}
				}
			}
			catch (e)
			{
				// Checks if file was changed
				if (this.isConnected())
				{
					this.fileChangedNotify();
				}
				
				// NOTE: Probably UTF16 in username for join/leave message causing this
//				var len = (data != null) ? data.length : 'null';
//				
//				EditorUi.logError('Protocol Error ' + e.message,
//					null, 'data_' + len + '_file_' + this.file.getHash() +
//					'_client_' + this.clientId);
//				
//				if (window.console != null)
//				{
//					console.log(e);
//				}
			}
		}
	});
};

/**
 * Protocol version to be added to all communcations and diffs to check
 * if a client is out of date and force a refresh. Note that this must
 * be incremented if new messages are added or the format is changed.
 * This must be numeric to compare older vs newer protocol versions.
 */
DrawioFileSync.PROTOCOL = 6;

/**
 * Enables socket connections.
 */
DrawioFileSync.ENABLE_SOCKETS = urlParams['sockets'] != '0';

//Extends mxEventSource
mxUtils.extend(DrawioFileSync, mxEventSource);

/**
 * Maximum size in bytes for cache values.
 */
DrawioFileSync.prototype.maxCacheEntrySize = 1000000;

/**
 * Maximum size in bytes for fast sync messages via Pusher.
 * Use 0 to disable message size check. Default is 9KB.
 */
DrawioFileSync.prototype.maxSyncMessageSize = 9000;

/**
 * Delay for fast sync message sending in ms. Larger
 * values help to group sending out changes, smaller
 * values reduce latency.
 */
DrawioFileSync.prototype.syncSendMessageDelay = 300;

/**
 * Delay for received sync message processing in ms.
 * Larger values help to sort and merge messages,
 * smaller values reduce latency.
 */
DrawioFileSync.prototype.syncReceiveMessageDelay = 50;

/**
 * Inactivity time to undo remote changes that have not been saved
 * to the file. Larger values give time to save, smaller values
 * require less inactivity time by the user. (Conflict handling
 * for a local and remote save takes around 15 seconds.)
 */
DrawioFileSync.prototype.cleanupDelay = 15000;

/**
 * Counter for local message IDs.
 */
DrawioFileSync.prototype.syncChangeCounter = 0;

/**
 * Specifies if notifications should be sent and received for changes.
 */
 DrawioFileSync.prototype.enabled = true;

/**
 * Holds the channel ID for sending and receiving change notifications.
 */
DrawioFileSync.prototype.channelId = null;

/**
 * Holds the channel ID for sending and receiving change notifications.
 */
DrawioFileSync.prototype.channel = null;

/**
 * Specifies if descriptor change events should be ignored.
 */
DrawioFileSync.prototype.catchupRetryCount = 0;

/**
 * Specifies if descriptor change events should be ignored.
 */
DrawioFileSync.prototype.maxCatchupRetries = 15;

/**
 * Specifies if descriptor change events should be ignored.
 */
DrawioFileSync.prototype.maxCacheReadyRetries = 1;

/**
 * Specifies if descriptor change events should be ignored.
 */
DrawioFileSync.prototype.cacheReadyDelay = 700;

/**
 * Specifies if descriptor change events should be ignored.
 */
DrawioFileSync.prototype.maxOptimisticRetries = 6;

/**
 * Inactivity timeout is 30 minutes.
 */
DrawioFileSync.prototype.inactivityTimeoutSeconds = 1800;

/**
 * Specifies if notifications should be sent and received for changes.
 */
DrawioFileSync.prototype.lastActivity = null;

/**
 * Adds all listeners.
 */
DrawioFileSync.prototype.start = function()
{
	if (this.channelId == null)
	{
		this.channelId = this.file.getChannelId();
	}
	
	if (this.key == null)
	{
		this.key = this.file.getChannelKey();
	}
	
	var updateStatus = false;

	if (DrawioFileSync.PULLING_MODE && this.puller == null &&
		document.visibilityState != 'hidden') 
	{
		if (this.puller == null)
		{
			this.puller = new DrawioFilePuller(this.file, this);
		}

		this.puller.start(this.file.getPullingInterval());
		EditorUi.debug('DrawioFileSync.start (Pulling)', [this],
			'version', DrawioFileSync.PROTOCOL,
			'rev', this.file.getCurrentRevisionId());
		updateStatus = true;
	}
	else if (!DrawioFileSync.PULLING_MODE && this.pusher == null &&
		this.channelId != null && document.visibilityState != 'hidden') 
	{
		this.pusher = this.ui.getPusher();
		
		if (this.pusher != null)
		{
			try
			{
				// Error listener must be installed before trying to create channel
				if (this.pusher.connection != null)
				{
					this.pusher.connection.bind('error', this.pusherErrorListener);
				}
			}
			catch (e)
			{
				// ignore
			}
			
			try
			{
				this.pusher.connect();
				this.channel = this.pusher.subscribe(this.channelId);
				EditorUi.debug('DrawioFileSync.start', [this],
					'version', DrawioFileSync.PROTOCOL,
					'rev', this.file.getCurrentRevisionId());
			}
			catch (e)
			{
				// ignore
			}

			this.installListeners();
		}

		updateStatus = true;
	}

	if (updateStatus)
	{
		window.setTimeout(mxUtils.bind(this, function()
		{
			this.lastModified = this.file.getLastModifiedDate();
			this.lastActivity = Date.now();
			this.resetUpdateStatusThread();
			this.updateOnlineState();
			this.updateStatus();
		}, 0));
	}

	this.updateRealtime();
};

/**
 * Draw function for the collaborator list.
 */
DrawioFileSync.prototype.updateRealtime = function()
{
	if (this.isValidState())
	{
		if (this.file.isRealtimeEnabled() &&
			this.file.isRealtimeSupported() &&
			this.isRealtimeActive())
		{
			if (!this.file.isRealtime())
			{
				this.initRealtime();
			}
		}
		else if (this.file.isRealtime())
		{
			this.resetRealtime();
		}

		if (DrawioFileSync.ENABLE_SOCKETS && this.file.isRealtime() &&
			this.p2pCollab == null && this.channelId != null)
		{
			this.p2pCollab = new P2PCollab(this.ui, this, this.channelId);
			this.p2pCollab.joinFile();
		}
		else if (!this.file.isRealtime() && this.p2pCollab != null)
		{
			this.p2pCollab.destroy();
			this.p2pCollab = null;
		}
	}
};

/**
 * Initializes the realtime model.
 */
DrawioFileSync.prototype.initRealtime = function()
{
	this.file.theirPages = this.ui.clonePages(
		this.ui.pages);
	this.file.ownPages = this.ui.clonePages(
		this.ui.pages);
	this.snapshot = this.file.ownPages;
};

/**
 * Resets the realtime model.
 */
DrawioFileSync.prototype.resetRealtime = function()
{
	var shadow = this.file.getShadowPages();

	if (shadow != null)
	{
		var patch = this.ui.diffPages(
			shadow, this.file.ownPages);
		this.file.patch([patch]);
	}
	
	this.sendLocalChanges();
	this.cleanup();

	this.file.theirPages = null;
	this.file.ownPages = null;
	this.snapshot = null;
};

/**
 * Draw function for the collaborator list.
 */
DrawioFileSync.prototype.isConnected = function()
{
	if (this.pusher != null && this.pusher.connection != null)
	{
		return this.pusher.connection.state == 'connected';
	}
	else if (this.puller != null)
	{
		return this.puller.isConnected();
	}
	else
	{
		return false;
	}
};

/**
 * Draw function for the collaborator list.
 */
DrawioFileSync.prototype.updateOnlineState = function()
{
	//For RT in embeded mode, we don't need this icon
	if (urlParams['embedRT'] == '1')
	{
		return;
	}

	if (this.ui.toolbarContainer != null && this.collaboratorsElement == null)
	{
		this.collaboratorsElement = this.createCollaboratorsElement();
		this.ui.toolbarContainer.appendChild(this.collaboratorsElement);
	}

	this.updateCollaboratorsElement();
};

/**
 * Updates the status bar with the latest change.
 */
DrawioFileSync.prototype.updateCollaboratorsElement = function()
{
	if (this.collaboratorsElement != null)
	{
		var status = this.ui.getNetworkStatus();

		if (status != null)
		{
			this.collaboratorsElement.style.backgroundImage = 'url(' +
				Editor.syncProblemImage + ')';
			this.collaboratorsElement.style.display = 'inline-block';
			this.collaboratorsElement.setAttribute('title', status);
		}
		else
		{
			this.collaboratorsElement.style.display = 'none';
		}
	}
};

/**
 * Updates the status bar with the latest change.
 */
DrawioFileSync.prototype.createCollaboratorsElement = function()
{
	var elt = document.createElement('a');
	elt.className = 'geButton geAdaptiveAsset';
	elt.style.position = 'absolute';
	elt.style.display = 'inline-block';
	elt.style.verticalAlign = 'bottom';
	elt.style.color = '#666';
	elt.style.top = '6px';
	elt.style.right = (Editor.currentTheme != 'atlas') ? '70px' : '50px';
	elt.style.padding = '2px';
	elt.style.fontSize = '8pt';
	elt.style.verticalAlign = 'middle';
	elt.style.textDecoration = 'none';
	elt.style.backgroundPosition = 'center center';
	elt.style.backgroundRepeat = 'no-repeat';
	elt.style.backgroundSize = '16px 16px';
	elt.style.width = '16px';
	elt.style.height = '16px';
	elt.style.opacity = '0.6';
	
	// Prevents focus
	mxEvent.addListener(elt, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
		mxUtils.bind(this, function(evt)
	{
		evt.preventDefault();
	}));

	mxEvent.addListener(elt, 'click', mxUtils.bind(this, function(evt)
	{
		if (this.file.isRealtimeEnabled() && this.file.isRealtimeSupported())
		{
			var status = this.ui.getNetworkStatus();
			this.ui.showError(mxResources.get('realtimeCollaboration'),
				mxUtils.htmlEntities((status != null) ? status :
				mxResources.get('online')));
		}
		else
		{
			this.enabled = !this.enabled;
			this.ui.updateButtonContainer();
			this.resetUpdateStatusThread();
			this.updateOnlineState();
			this.updateStatus();
			
			if (!this.file.inConflictState && this.enabled)
			{
				this.fileChangedNotify();
			}
		}
	}));

	return elt;
};

/**
 * Updates the status bar with the latest change.
 */
DrawioFileSync.prototype.updateStatus = function()
{
	if (this.isConnected() && this.lastActivity != null &&
		(Date.now() - this.lastActivity) / 1000 >
		this.inactivityTimeoutSeconds)
	{
		this.stop();
	}

	if (!this.file.isModified() && !this.file.inConflictState &&
		this.file.autosaveThread == null && !this.file.savingFile &&
		!this.file.redirectDialogShowing)
	{
		if (this.enabled && this.ui.statusContainer != null)
		{
			// LATER: Write out modified date for more than 2 weeks ago
			var str = this.ui.timeSince(new Date(this.lastModified));
			
			if (str == null)
			{
				str = mxResources.get('lessThanAMinute');
			}
			
			// Consumes and displays last message
			var msg = this.lastMessage;
			this.lastMessage = null;
			
			if (msg != null && msg.length > 40)
			{
				msg = msg.substring(0, 40) + '...';
			}

			var status = this.ui.getNetworkStatus();
			var label = mxResources.get('lastChange', [str]);
			var rev = (this.file.isRevisionHistorySupported()) ? 'data-action="revisionHistory" ' : '';
			
			this.ui.editor.setStatus('<div ' + rev + 'title="'+ mxUtils.htmlEntities(label) + '">' + mxUtils.htmlEntities(label) + '</div>' +
				(!this.file.isEditable() ? '<div class="geStatusBox" title="' +
					mxUtils.htmlEntities(mxResources.get('readOnly')) + '">' +
					mxUtils.htmlEntities(mxResources.get('readOnly')) + '</div>' : '') +
				(status != null ? '<div class="geStatusBox" title="' + mxUtils.htmlEntities(status) + '">' +
					mxUtils.htmlEntities(status) + '</div>' : '') +
				((msg != null) ? ' <div class="geStatusBox" data-effect="fade" title="' + mxUtils.htmlEntities(msg) + '">' +
					mxUtils.htmlEntities(msg) + '</div>' : ''));

			this.resetUpdateStatusThread();
		}
		else
		{
			this.file.addAllSavedStatus();
		}
	}
};

/**
 * Resets the thread to update the status.
 */
DrawioFileSync.prototype.resetUpdateStatusThread = function()
{
	if (this.updateStatusThread != null)
	{
		window.clearInterval(this.updateStatusThread);
	}
	
	if (this.channel != null)
	{
		this.updateStatusThread = window.setInterval(mxUtils.bind(this, function()
		{
			this.updateStatus();
		}), Editor.updateStatusInterval);
	}
};

/**
 * Installs all required listeners for syncing the current file.
 */
DrawioFileSync.prototype.installListeners = function()
{
	if (this.pusher != null && this.pusher.connection != null)
	{
		this.pusher.connection.bind('state_change', this.connectionListener);
	}
    
	if (this.channel != null)
    {
    	this.channel.bind('changed', this.changeListener);
    }
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFileSync.prototype.notify = function(msg)
{
	this.file.stats.msgSent++;

	if (Editor.enableRealtimeCache && !Editor.p2pSyncNotify)
	{
		mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() +
			'&msg=' + encodeURIComponent(this.objectToString(msg)));
	}
	else if (this.p2pCollab != null)
	{
		this.p2pCollab.sendNotification(msg);
	}

	EditorUi.debug('DrawioFileSync.notify', [this],
		'enableRealtimeCache', Editor.enableRealtimeCache,
		'p2pSyncNotify', Editor.p2pSyncNotify,
		'msg', msg);
};

/**
 * 
 */
DrawioFileSync.prototype.sendJoinMessage = function()
{
	if (!this.announced)
	{
		var user = this.file.getCurrentUser();
		var join = {a: 'join'};
		
		if (user != null)
		{
			join.name = encodeURIComponent(user.displayName);
			join.uid = user.id;
		}

		this.notify(this.createMessage(join));
		this.announced = true;
	}
}

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFileSync.prototype.handleMessageData = function(data)
{
	if (data.a == 'desc')
	{
		if (!this.file.savingFile)
		{
			this.reloadDescriptor();
		}
	}
	else if (data.a == 'join' || data.a == 'leave')
	{
		if (data.a == 'join')
		{
			this.file.stats.joined++;
		}
		
		if (data.name != null)
		{
			this.lastMessage = mxResources.get((data.a == 'join') ?
				'userJoined' : 'userLeft', [decodeURIComponent(data.name)]);
			this.resetUpdateStatusThread();
			this.updateStatus();
		}
	}
	else if (data.a == 'change')
	{
		this.receiveRemoteChanges(data);
	}
	else if (data.m != null)
	{
		var mod = new Date(data.m);
		
		// Ignores obsolete messages
		if (this.lastMessageModified == null ||
			this.lastMessageModified < mod)
		{
			this.lastMessageModified = mod;
			this.fileChangedNotify();
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFileSync.prototype.isValidState = function()
{
	return this.ui.getCurrentFile() == this.file &&
		this.file.sync == this && !this.file.invalidChecksum &&
		!this.file.redirectDialogShowing;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFileSync.prototype.optimisticSync = function(count)
{
	if (this.reloadThread == null)
	{
		count = (count != null) ? count : 0;
		
		if (count < this.maxOptimisticRetries)
		{
			this.reloadThread = window.setTimeout(mxUtils.bind(this, function()
			{
				EditorUi.debug('DrawioFileSync.optimisticSync', [this],
					'attempt', count, 'of', this.maxOptimisticRetries,
					'remoteFileChanged', this.remoteFileChanged);

				this.remoteFileChanged = false;

				this.file.getLatestVersion(mxUtils.bind(this, function(latestFile)
				{
					this.reloadThread = null;
				
					if (latestFile != null)
					{
						var source = this.file.getCurrentRevisionId();
						var target = latestFile.getCurrentRevisionId();
						
						// Retries if the file has not changed
						if (source == target)
						{
							this.optimisticSync(count + 1);
						}
						else
						{
							this.file.mergeFile(latestFile, mxUtils.bind(this, function()
							{
								this.lastModified = this.file.getLastModifiedDate();
								this.updateStatus();
							}));
						}
					}
				}), mxUtils.bind(this, function()
				{
					this.reloadThread = null;
				}));
			}), (count + 1) * this.file.optimisticSyncDelay);
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 * Immediate is passed through to scheduleCleanup.
 */
DrawioFileSync.prototype.fileChangedNotify = function(data, immediate)
{
	if (this.isValidState())
	{
		EditorUi.debug('DrawioFileSync.fileChangedNotify', [this],
			'data', [data], 'immediate', immediate,
			'saving', this.file.savingFile);

		if (this.file.savingFile)
		{
			this.remoteFileChanged = true;
		}
		else
		{
			if (data != null && data.type == 'optimistic')
			{
				this.optimisticSync();
			}
			else
			{
				// It's possible that a request never returns so override
				// existing requests and abort them when they are active
				var thread = this.fileChanged(mxUtils.bind(this, function(err)
				{
					this.updateStatus();
				}), mxUtils.bind(this, function(err)
				{
					this.file.handleFileError(err);
				}), mxUtils.bind(this, function()
				{
					return !this.file.savingFile && this.notifyThread != thread;
				}), true, immediate);
			}
		}
	}
};

/**
 * Called after the file was changed locally to mark the file as changed.
 */
DrawioFileSync.prototype.localFileChanged = function()
{
	if (this.file.isRealtime())
	{
		window.clearTimeout(this.triggerSendThread);
		this.localFileWasChanged = true;
		this.scheduleCleanup(true);

		this.triggerSendThread = window.setTimeout(mxUtils.bind(this, function()
		{
			this.sendLocalChanges();
		}), Math.min(this.file.autosaveDelay, this.syncSendMessageDelay - 20));
	}
};

/**
 * Sends the given changes too all collaborators.
 */
DrawioFileSync.prototype.doSendLocalChanges = function(changes)
{
	if (!this.file.ignorePatches(changes))
	{
		var changeId = this.clientId + '.' + (this.syncChangeCounter++);
		var msg = this.createMessage({a: 'change', c: changes,
			id: changeId, t: Date.now()});
		var skipped = false;
		
		if (this.p2pCollab != null)
		{
			this.p2pCollab.sendDiff(msg);
		}
		else if (urlParams['dev'] == '1')
		{
			var data = encodeURIComponent(this.objectToString(msg));

			if (this.maxSyncMessageSize == 0 ||
				data.length < this.maxSyncMessageSize)
			{
				mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() + '&msg=' + data);
			}
			else
			{
				skipped = true;
			}
		}
		else
		{
			skipped = true;
		}

		EditorUi.debug('DrawioFileSync.doSendLocalChanges', [this],
			'changes', changes, skipped ? '(skipped)' : '');
	}
};

/**
 * Handles the given remote changes.
 */
DrawioFileSync.prototype.receiveRemoteChanges = function(data)
{
	var changes = data.c;

	if (!this.file.ignorePatches(changes))
	{
		if (this.receivedData == null)
		{
			this.receivedData = [data];

			window.setTimeout(mxUtils.bind(this, function()
			{
				if (this.ui.getCurrentFile() == this.file)
				{
					// Skips additional processing for single change
					if (this.receivedData.length == 1)
					{
						this.doReceiveRemoteChanges(this.receivedData[0].c);
					}
					else
					{
						// Sorts by sender and remote counter
						this.receivedData.sort(function(a, b)
						{
							if (a.id < b.id)
							{
								return -1;
							}
							else if (a.id > b.id)
							{
								return 1;
							}
							else
							{
								return 0;
							}
						});

						var lastDiff = null;

						// Processes changes
						for (var i = 0; i < this.receivedData.length; i++)
						{
							// Ignores consecutive duplicates
							var currentDiff = JSON.stringify(this.receivedData[i].c);

							if (currentDiff != lastDiff)
							{
								this.doReceiveRemoteChanges(this.receivedData[i].c);
							}

							lastDiff = currentDiff;
						}
					}
				}

				this.receivedData = null;
			}), this.syncReceiveMessageDelay);
		}
		else
		{
			this.receivedData.push(data);
		}
	}
};

/**
 * Schedules a new cleanup if not lazy or one is pending
 */
DrawioFileSync.prototype.scheduleCleanup = function(lazy)
{
	var delay = (lazy == false) ? 0 : this.cleanupDelay;
	var prev = this.cleanupThread;
	
	if (lazy != true || this.cleanupThread != null)
	{
		window.clearTimeout(this.cleanupThread);

		this.cleanupThread = window.setTimeout(mxUtils.bind(this, function()
		{
			this.cleanup(null, mxUtils.bind(this, function(err)
			{
				this.file.handleFileError(err);
			}));
		}), delay);
	}

	EditorUi.debug('DrawioFileSync.scheduleCleanup', [this],
		'lazy', lazy, 'delay', delay, 'prev', prev,
		'thread', this.cleanupThread);
};

/**
 * Removes remote changes that have not been saved and merges
 * the latest version of the file if checkFile is true.
 */
DrawioFileSync.prototype.cleanup = function(success, error, checkFile)
{
	var thread = this.cleanupThread;
	window.clearTimeout(this.cleanupThread);
	this.cleanupThread = null;

	if (this.isValidState() && !this.file.inConflictState &&
		this.file.isRealtime() && !this.file.isModified())
	{
		var patches = [this.ui.diffPages(this.ui.pages,
			this.file.ownPages)];
		this.file.theirPages = this.ui.clonePages(
			this.file.ownPages);
		
		if (urlParams['test'] == '1')
		{
			EditorUi.debug('DrawioFileSync.cleanup',
				[this], 'thread', thread, 'patches', patches,
				'checkFile', checkFile, 'checksum',
				this.ui.getHashValueForPages(this.ui.pages));
		}
		
		if (!this.file.ignorePatches(patches))
		{
			this.file.patch(patches);
		}
		
		if (!checkFile)
		{
			if (!document.hidden && urlParams['test'] == '1' &&
				urlParams['checksum'] == '1')
			{
				this.testChecksum();
			}

			if (success != null)
			{
				success();
			}
		}
		else
		{
			this.file.getLatestVersion(mxUtils.bind(this, function(newFile)
			{
				try
				{
					if (this.isValidState() && !this.file.inConflictState &&
						this.file.isRealtime())
					{
						var pages = newFile.getShadowPages();
						patches = [this.ui.diffPages(this.ui.pages, pages),
							this.ui.diffPages(pages, this.file.ownPages)];
						
						if (!this.file.ignorePatches(patches))
						{
							this.file.patch(patches);
						}

						EditorUi.debug('DrawioFileSync.cleanup',
							[this], 'newFile', newFile,
							'patches', patches);
					}

					if (success != null)
					{
						success();
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
	else if (success != null)
	{
		success();

		EditorUi.debug('DrawioFileSync.cleanup',
			[this], 'checkFile', checkFile,
			'modified', this.file.isModified());
	}
};

/**
 * Extracts local changes by diffing remote pages and patched remote pages.
 */
DrawioFileSync.prototype.testChecksum = function()
{
	var localChecksum = this.ui.getHashValueForPages(this.ui.pages);
	var localRev = this.file.getCurrentRevisionId();

	this.file.getLatestVersion(mxUtils.bind(this, function(latestFile)
	{
		if (!document.hidden)
		{
			var remoteChecksum = this.ui.getHashValueForPages(
				latestFile.getShadowPages());
			var descChecksum = latestFile.getDescriptorChecksum(
				latestFile.getDescriptor());
			var remoteRev = latestFile.getCurrentRevisionId();
			
			EditorUi.debug('DrawioFileSync.testChecksum',
				'local', [this.file], 'modified', this.file.isModified(),
				'inConflictState', this.file.inConflictState,
				'autosaveThread', this.file.autosaveThread,
				'savingFile', this.file.savingFile,
				'localFileWasChanged', this.localFileWasChanged,
				'remoteFileChanged', this.remoteFileChanged,
				'cleanup', this.cleanupThread,
				'checksum', localChecksum);
			
			EditorUi.debug('DrawioFileSync.testChecksum',
				'remote', [latestFile],
				'rev', remoteRev == localRev,
				'desc', descChecksum == remoteChecksum,
				'checksum', remoteChecksum);

			if (remoteChecksum != localChecksum)
			{
				EditorUi.debug('DrawioFileSync.testChecksum',
					[this], 'checksums do not match');
				this.ui.alert('Checksums do not match');
			}
			else
			{
				EditorUi.debug('DrawioFileSync.testChecksum',
					[this], 'checksums match');
			}
		}
	}), mxUtils.bind(this, function(err)
	{
		EditorUi.debug('DrawioFileSync.testChecksum',
			[this], 'checksum test error', err);
	}));
};

/**
 * Extracts local changes by diffing remote pages and patched remote pages.
 */
DrawioFileSync.prototype.extractLocal = function(patch)
{
	return (mxUtils.isEmptyObject(patch)) ? {} : this.ui.diffPages(
		this.file.theirPages, this.ui.patchPages(this.ui.clonePages(
			this.file.theirPages), patch));
};

/**
 * Extracts remove operations for pages and cells from the given patch.
 */
DrawioFileSync.prototype.extractRemove = function(patch)
{
	var result = {};
	
	if (patch[EditorUi.DIFF_REMOVE] != null)
	{
		result[EditorUi.DIFF_REMOVE] =
			patch[EditorUi.DIFF_REMOVE];
	}

	if (patch[EditorUi.DIFF_UPDATE] != null)
	{
		for (var id in patch[EditorUi.DIFF_UPDATE])
		{
			var diff = patch[EditorUi.DIFF_UPDATE][id];

			if (diff.cells != null && diff.cells
				[EditorUi.DIFF_REMOVE] != null)
			{
				if (result[EditorUi.DIFF_UPDATE] == null)
				{
					result[EditorUi.DIFF_UPDATE] = {};
				}

				result[EditorUi.DIFF_UPDATE][id] = {};
				var temp = result[EditorUi.DIFF_UPDATE][id];
				temp.cells = {};
				temp.cells[EditorUi.DIFF_REMOVE] =
					diff.cells[EditorUi.DIFF_REMOVE];
			}
		}
	}

	return result;
};

/**
 * Updates the realtime models and saves pending local changes.
 * Immediate is passed through to scheduleCleanup.
 */
DrawioFileSync.prototype.patchRealtime = function(patches, backup, own, immediate)
{
	var all = null;

	if (this.file.isRealtime())
	{
		// Gets pending changes that must be saved after remote
		// changes are applied, ie. local remove of remote shape.
		// TODO: Currently only implemented for pending removes as
		// remote changes are not received in the order in which
		// they are finally saved in the file.
		all = this.extractRemove(this.ui.diffPages(
			this.file.getShadowPages(), this.ui.pages));
		var local = this.extractRemove(this.extractLocal(all));
		
		// Applies incoming, own and local changes to own pages
		var applied = ((own == null) ? patches :
			patches.concat(own)).concat([local]);
		this.file.ownPages = this.ui.applyPatches(
			this.file.ownPages, applied, true,
				backup);
		
		// Triggers a file change to save pending local
		// changes or updates the UI and schedules a
		// cleanup with no pending local changes.
		if (!mxUtils.isEmptyObject(local))
		{
			this.file.fileChanged(false);
		}
		else
		{
			this.scheduleCleanup((immediate != null) ?
				false : null);
		}
		
		EditorUi.debug('DrawioFileSync.patchRealtime', [this],
			'patches', patches, 'backup', backup, 'own', own,
			'all', all, 'local', local, 'applied', applied,
			'immediate', immediate);
	}

	return all;
};

/**
 * Computes and sends the local changes if the file was changed.
 */
DrawioFileSync.prototype.isRealtimeActive = function()
{
	return this.ui.editor.autosave;
};

/**
 * Computes and sends the local changes if the file was changed.
 */
DrawioFileSync.prototype.sendLocalChanges = function()
{
	try
	{
		if (this.file.isRealtime() && this.localFileWasChanged)
		{
			var snapshot = this.ui.clonePages(this.ui.pages);
			var patch = this.ui.diffPages(this.snapshot, snapshot);
			this.file.ownPages = this.ui.patchPages(
				this.file.ownPages, patch, true);
			this.snapshot = snapshot;
			
			// Creates patch for cross references
			var resolve = this.ui.resolveCrossReferences(
				patch, this.ui.diffPages(this.file.ownPages,
					this.ui.pages));
			
			// Patches own pages to resolve cross references
			this.file.ownPages = this.ui.patchPages(
				this.file.ownPages, resolve, true);
			
			if (this.isRealtimeActive())
			{
				this.doSendLocalChanges([resolve, patch]);
			}
		}

		this.localFileWasChanged = false;
	}
	catch (e)
	{
		var user = this.file.getCurrentUser();
		var uid = (user != null) ? user.id : 'unknown';

		EditorUi.logError('Error in sendLocalChanges', null,
			this.file.getMode() + '.' +
			this.file.getId(), uid, e);
	}
};

/**
 * Sends the given changes too all collaborators.
 */
DrawioFileSync.prototype.doReceiveRemoteChanges = function(changes)
{
	if (this.file.isRealtime() && this.isRealtimeActive())
	{
		this.sendLocalChanges();
		this.file.patch(changes);
		this.file.theirPages = this.ui.applyPatches(
			this.file.theirPages, changes);
		this.scheduleCleanup();
		
		EditorUi.debug('DrawioFileSync.doReceiveRemoteChanges',
			[this], 'changes', changes);
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 * Immediate is passed through to scheduleCleanup.
 */
DrawioFileSync.prototype.merge = function(patches, checksum, desc, success, error, abort, immediate)
{
	try
	{
		this.file.stats.merged++;
		this.lastModified = new Date();
		var target = this.file.getDescriptorRevisionId(desc);
		var ignored = this.file.ignorePatches(patches);
		
		if (!ignored)
		{
			this.sendLocalChanges();

			// Creates a patch for backup if the checksum fails
			var shadow = this.ui.clonePages(this.file.getShadowPages());
			this.file.backupPatch = (this.file.isModified() &&
				!this.file.isRealtime()) ? this.ui.diffPages(
					shadow, this.ui.pages) : null;
			var pending = (!this.file.isRealtime()) ? null :
				this.ui.diffPages(shadow, this.file.ownPages);
			shadow = this.ui.applyPatches(shadow, patches);
			var current = (checksum == null) ? null :
				this.ui.getHashValueForPages(shadow);
			
			EditorUi.debug('DrawioFileSync.merge', [this], 'patches', patches,
				'backup', this.file.backupPatch, 'pending', pending, 'checksum',
				checksum, 'current', current, 'valid', checksum == current,
				'attempt', this.catchupRetryCount, 'of', this.maxCatchupRetries,
				'from', this.file.getCurrentRevisionId(), 'to', target,
				'etag', this.file.getDescriptorEtag(desc),
				'immediate', immediate);
		
			// Compares the checksum
			if (checksum != null && checksum != current)
			{
				// Logs checksum error
				var logError = mxUtils.bind(this, function(failed)
				{
					try
					{
						var user = this.file.getCurrentUser();
						var uid = (user != null) ? user.id : 'unknown';
						var id = (this.file.getId() != '') ? this.file.getId() :
							('(' + this.ui.hashValue(this.file.getTitle()) + ')');
						var bytes = JSON.stringify(patches).length;
	
						EditorUi.logError('Merge checksum fallback ' + (failed ?
							'failed' : 'success') + ' ' + id, null,
							this.file.getMode() + '.' + this.file.getId(),
							'user_' + uid + '-client_' + this.clientId +
							'-bytes_' + bytes + '-patches_' + patches.length +
							'-size_' + this.file.getSize() +
							((checksum != null) ? ('-expected_' + checksum) : '') +
							((current != null) ? ('-current_' + current) : '') +
							'-from_' + this.ui.hashValue(this.file.getCurrentRevisionId()) +
							'-to_' + this.ui.hashValue(target));
					}
					catch (e)
					{
						// ignore
					}
				});

				// Fallback to full reload with logging
				this.reload(mxUtils.bind(this, function()
				{
					if (success != null)
					{
						success();
					}
				}), mxUtils.bind(this, function()
				{
					if (error != null)
					{
						error();
					}
				}), abort, null, immediate);

				// Abnormal termination
				return;
			}
			else
			{	
				this.file.setShadowPages(shadow);

				// Patches the current document and own pages
				if (this.patchRealtime(patches, null, pending, immediate) == null)
				{
					this.file.patch(patches,
						(DrawioFile.LAST_WRITE_WINS) ?
							this.file.backupPatch : null);
				}
				
				// Logs successull patch
//				try
//				{
//					var user = this.file.getCurrentUser();
//					var uid = (user != null) ? user.id : 'unknown';
//
//					EditorUi.logEvent({category: 'PATCH-SYNC-FILE-' + this.file.getHash(),
//						action: uid + '-patches-' + patches.length + '-recvd-' +
//						this.file.stats.bytesReceived + '-msgs-' + this.file.stats.msgReceived,
//						label: this.clientId});
//				}
//				catch (e)
//				{
//					// ignore
//				}
			}
		}

		this.file.invalidChecksum = false;
		this.file.inConflictState = false;
		this.file.patchDescriptor(this.file.getDescriptor(), desc);
		this.file.backupPatch = null;
		
		if (success != null)
		{
			success(true);
		}
	}
	catch (e)
	{
		this.file.inConflictState = true;
		this.file.invalidChecksum = true;
		this.file.descriptorChanged();
		
		if (error != null)
		{
			error(e);
		}
		
		try
		{
			if (this.file.errorReportsEnabled)
			{
				var from = this.ui.hashValue(this.file.getCurrentRevisionId());
				var to = this.ui.hashValue(target);
				
				this.file.sendErrorReport('Error in merge',
					'From: ' + from + '\nTo: ' + to +
					'\nChecksum: ' + checksum +
					'\nPatches:\n' + this.file.compressReportData(
						JSON.stringify(patches, null, 2)), e);
			}
			else
			{
				var user = this.file.getCurrentUser();
				var uid = (user != null) ? user.id : 'unknown';
				
				EditorUi.logError('Error in merge', null,
					this.file.getMode() + '.' +
					this.file.getId(), uid, e);
			}
		}
		catch (e2)
		{
			// ignore
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 * Immediate is passed through to scheduleCleanup.
 */
DrawioFileSync.prototype.fileChanged = function(success, error, abort, lazy, immediate)
{
	var thread = window.setTimeout(mxUtils.bind(this, function()
	{
		if (abort == null || !abort())
		{
			EditorUi.debug('DrawioFileSync.fileChanged', [this],
				'lazy', lazy, 'immediate', immediate,
				'remoteFileChanged', this.remoteFileChanged,
				'valid', this.isValidState());

			if (!this.isValidState())
			{
				if (error != null)
				{
					error();
				}
			}
			else
			{
				this.remoteFileChanged = false;

				this.file.loadPatchDescriptor(mxUtils.bind(this, function(desc)
				{
					if (abort == null || !abort())
					{
						if (!this.isValidState())
						{
							if (error != null)
							{
								error();
							}
						}
						else
						{
							this.catchup(desc, success, error, abort, immediate);
						}
					}
				}), error);
			}
		}
	}), (lazy) ? this.cacheReadyDelay : 0);
	
	this.notifyThread = thread;
	
	return thread;
};

/**
 * Fast-forward to the current editor state.
 */
DrawioFileSync.prototype.fastForward = function(desc)
{
	this.file.patchDescriptor(this.file.getDescriptor(), desc);
	this.file.setShadowPages(this.ui.clonePages(this.ui.pages));
	this.file.theirPages = this.ui.clonePages(this.ui.pages);
	this.file.ownPages = this.ui.clonePages(this.ui.pages);

	var thread = this.cleanupThread;
	window.clearTimeout(this.cleanupThread);
	this.cleanupThread = null;

	if (urlParams['test'] == '1')
	{
		EditorUi.debug('DrawioFileSync.fastForward',
			[this], 'desc', [desc], 'cleanup', thread, 'checksum',
			this.ui.getHashValueForPages(this.ui.pages));
	}
	
	if (!document.hidden && urlParams['test'] == '1' &&
		urlParams['checksum'] == '1' &&
		this.cleanupThread == null)
	{
		this.testChecksum();
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFileSync.prototype.reloadDescriptor = function()
{
	this.file.loadDescriptor(mxUtils.bind(this, function(desc)
	{
		if (desc != null)
		{
			// Forces data to be updated
			this.file.setDescriptorRevisionId(desc,
				this.file.getCurrentRevisionId());
			this.updateDescriptor(desc);
			this.fileChangedNotify();
		}
		else
		{
			this.file.inConflictState = true;
			this.file.handleFileError();
		}
	}), mxUtils.bind(this, function(err)
	{
		this.file.inConflictState = true;
		this.file.handleFileError(err);
	}));
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFileSync.prototype.updateDescriptor = function(desc)
{
	this.file.setDescriptor(desc);
	this.file.descriptorChanged();
	this.start();
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 * Immediate is passed through to scheduleCleanup.
 */
DrawioFileSync.prototype.catchup = function(desc, success, error, abort, immediate)
{
	if (desc != null && (abort == null || !abort()))
	{
		var source = this.file.getCurrentRevisionId();
		var target = this.file.getDescriptorRevisionId(desc);
		
		EditorUi.debug('DrawioFileSync.catchup', [this],
			'desc', [desc], 'from', source, 'to', target,
			'immediate', immediate, 'valid',
			this.isValidState());

		if (source == target)
		{
			this.file.patchDescriptor(this.file.getDescriptor(), desc);

			if (urlParams['test'] == '1')
			{
				EditorUi.debug('DrawioFileSync.catchup', [this],
					'up to date', 'cleanup', this.cleanupThread,
					'checksum', this.ui.getHashValueForPages(this.ui.pages));
			}

			if (!document.hidden && urlParams['test'] == '1' &&
				urlParams['checksum'] == '1' &&
				this.cleanupThread == null)
			{
				this.testChecksum();
			}
			
			if (success != null)
			{
				success(true);
			}
		}
		else if (!this.isValidState())
		{
			if (error != null)
			{
				error();
			}
		}
		else
		{
			var checksum = this.file.getDescriptorChecksum(desc)
			var secret = this.file.getDescriptorSecret(desc);
			
			if (checksum != null &&
				checksum == this.ui.getHashValueForPages(this.ui.pages))
			{
				// Fast-forward to current state if checksum matches
				this.fastForward(desc);

				if (success != null)
				{
					success(true);
				}
			}
			else if (!Editor.enableRealtimeCache || secret == null ||
				urlParams['lockdown'] == '1')
			{
				this.reload(success, error, abort, null, immediate);
			}
			else
			{
				// Cache entry may not have been uploaded to cache before new
				// file is visible to client so retry once after cache miss
				var cacheReadyRetryCount = 0;
				var failed = false;
				
				var doCatchup = mxUtils.bind(this, function()
				{
					if (abort == null || !abort())
					{
						// Ignores patch if shadow has changed
						if (source != this.file.getCurrentRevisionId())
						{
							if (success != null)
							{
								success(true);
							}
						}
						else if (!this.isValidState())
						{
							if (error != null)
							{
								error();
							}
						}
						else
						{
							this.scheduleCleanup(true);
							var acceptResponse = true;
							
							var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
							{
								acceptResponse = false;
								this.reload(success, error, abort, null, immediate);
							}), this.ui.timeout);
	
							mxUtils.get(EditorUi.cacheUrl + '?id=' + encodeURIComponent(this.channelId) +
								'&from=' + encodeURIComponent(source) + '&to=' + encodeURIComponent(target) +
								((secret != null) ? '&secret=' + encodeURIComponent(secret) : ''),
								mxUtils.bind(this, function(req)
							{
								this.file.stats.bytesReceived += req.getText().length;	
								window.clearTimeout(timeoutThread);
								
								if (acceptResponse && (abort == null || !abort()))
								{
									// Ignores patch if shadow has changed
									if (source != this.file.getCurrentRevisionId())
									{
										if (success != null)
										{
											success(true);
										}
									}
									else if (!this.isValidState())
									{
										if (error != null)
										{
											error();
										}
									}
									else
									{
										var checksum = null;
										var temp = [];

										EditorUi.debug('DrawioFileSync.doCatchup',
											[this], 'request', [req], 'status', req.getStatus(),
											'cacheReadyRetryCount', cacheReadyRetryCount,
											'maxCacheReadyRetries', this.maxCacheReadyRetries);
										
										if (req.getStatus() >= 200 && req.getStatus() <= 299 &&
											req.getText().length > 0)
										{
											try
											{
												var result = JSON.parse(req.getText());
												
												if (result != null && result.length > 0)
												{
													for (var i = 0; i < result.length; i++)
													{
														var value = this.stringToObject(result[i]);
														
														if (value.v > DrawioFileSync.PROTOCOL)
														{
															failed = true;
															temp = [];
															break;
														}
														else if (value.v === DrawioFileSync.PROTOCOL &&
															value.d != null)
														{
															checksum = value.d.checksum;
															temp.push(value.d.patch);
														}
														else
														{
															failed = true;
															temp = [];
															break;
														}
													}
												}

												EditorUi.debug('DrawioFileSync.doCatchup', [this], 
													'response', [result], 'status',
													(failed ? 'failed' : 'ok'),
													'temp', temp, 'checksum', checksum);
											}
											catch (e)
											{
												temp = [];
												
												if (window.console != null && urlParams['test'] == '1')
												{
													console.log(e);
												}
											}
										}
										
										try
										{
											if (temp.length > 0)
											{
												this.file.stats.cacheHits++;
												this.merge(temp, checksum, desc,
													success, error, abort, immediate);
											}
											// Retries if cache entry was not yet there
											else if (cacheReadyRetryCount <= this.maxCacheReadyRetries - 1 &&
												!failed && req.getStatus() != 401 && req.getStatus() != 503 &&
												req.getStatus() != 410)
											{
												cacheReadyRetryCount++;
												this.file.stats.cacheMiss++;
												window.setTimeout(doCatchup, (cacheReadyRetryCount + 1) *
													this.cacheReadyDelay);
											}
											else
											{
												this.file.stats.cacheFail++;
												this.reload(success, error, abort, null, immediate);
											}
										}
										catch (e)
										{
											if (error != null)
											{
												error(e);
											}
										}
									}
								}
							}), error);
						}
					}
				});
				
				window.setTimeout(doCatchup, this.cacheReadyDelay);
			}
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 * Immediate is passed through to scheduleCleanup.
 */
DrawioFileSync.prototype.reload = function(success, error, abort, shadow, immediate)
{
	EditorUi.debug('DrawioFileSync.reload',
		[this], 'immediate', immediate);
	
	this.file.updateFile(mxUtils.bind(this, function()
	{
		this.lastModified = this.file.getLastModifiedDate();
		this.updateStatus();
		this.start();
		
		if (success != null)
		{
			success();
		}
	}), mxUtils.bind(this, function(err)
	{
		if (error != null)
		{
			error(err);
		}
	}), abort, shadow, immediate);
};

/**
 * Invokes when the file descriptor was changed.
 */
DrawioFileSync.prototype.descriptorChanged = function(source)
{
	this.lastModified = this.file.getLastModifiedDate();
	
	if (this.channelId != null)
	{
		var msg = this.objectToString(this.createMessage({a: 'desc',
			m: this.lastModified.getTime()}));
		var target = this.file.getCurrentRevisionId();
		var data = this.objectToString({});

		mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() +
			'&from=' + encodeURIComponent(source) + '&to=' + encodeURIComponent(target) +
			'&msg=' + encodeURIComponent(msg) + '&data=' + encodeURIComponent(data));
		this.file.stats.bytesSent += data.length;
		this.file.stats.msgSent++;

		EditorUi.debug('DrawioFileSync.descriptorChanged',
			[this], 'from', source, 'to', target);
	}
	
	this.updateStatus();
};

/**
 * Converts the given object to an encrypted string.
 */
DrawioFileSync.prototype.objectToString = function(obj)
{
	var data = Graph.compress(JSON.stringify(obj));
	
	if (this.key != null && typeof CryptoJS !== 'undefined')
	{
		data = CryptoJS.AES.encrypt(data, this.key).toString();
	}
	
	return data;
};

/**
 * Converts the given encrypted string to an object.
 */
DrawioFileSync.prototype.stringToObject = function(data)
{
	if (this.key != null && typeof CryptoJS !== 'undefined')
	{
		data = CryptoJS.AES.decrypt(data, this.key).toString(CryptoJS.enc.Utf8);
	}
	
	return JSON.parse(Graph.decompress(data));
};

/**
 * Requests a token for the given sec
 */
DrawioFileSync.prototype.createToken = function(secret, success, error)
{
	var acceptResponse = true;
				
	var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
	{
		acceptResponse = false;
		error({code: App.ERROR_TIMEOUT, message: mxResources.get('timeout')});
	}), this.ui.timeout);
	
	mxUtils.get(EditorUi.cacheUrl + '?id=' + encodeURIComponent(this.channelId) +
		'&secret=' + encodeURIComponent(secret), mxUtils.bind(this, function(req)
	{
		window.clearTimeout(timeoutThread);
		
		if (acceptResponse)
		{
			if (req.getStatus() >= 200 && req.getStatus() <= 299)
			{
				success(req.getText());
			}
			else
			{
				error({code: req.getStatus(), message: 'Token Error ' + req.getStatus()});
			}
		}
	}), error);
};

/**
 * Invoked when a save request for a file was sent regardless of the response.
 */
DrawioFileSync.prototype.fileSaving = function()
{
	if (this.file.isOptimisticSync())
	{
		this.notify(this.createMessage({
			m: Date.now(), type: 'optimistic'}));
	}

	EditorUi.debug('DrawioFileSync.fileSaving', [this],
		'optimistic', this.file.isOptimisticSync());
};

/**
 * Invoked when the file data was updated for saving.
 */
DrawioFileSync.prototype.fileDataUpdated = function()
{
	this.scheduleCleanup(true);
	EditorUi.debug('DrawioFileSync.fileDataUpdated', [this]);
};

/**
 * Invoked after a file was saved to add cache entry (which in turn notifies
 * collaborators).
 */
DrawioFileSync.prototype.fileSaved = function(pages, lastDesc, success, error, token, checksum)
{
	this.lastModified = this.file.getLastModifiedDate();
	this.resetUpdateStatusThread();
	this.catchupRetryCount = 0;
	
	if (!this.ui.isOffline(true) && !this.file.inConflictState &&
		!this.file.redirectDialogShowing)
	{
		this.start();

		if (this.channelId != null)
		{
			// Computes diff and checksum
			var secret = this.file.getDescriptorSecret(this.file.getDescriptor());
			var msg = this.createMessage({m: this.lastModified.getTime()});
			var source = this.file.getDescriptorRevisionId(lastDesc);
			var target = this.file.getCurrentRevisionId();
			
			if (secret == null || token == null ||
				urlParams['lockdown'] == '1' ||
				!Editor.enableRealtimeCache)
			{
				this.notify(msg);
				
				if (success != null)
				{
					success();
				}
				
				EditorUi.debug('DrawioFileSync.fileSaved', [this],
					'from', source, 'to', target, 'etag',
					this.file.getCurrentEtag());
			}
			else
			{
				var diff = this.ui.diffPages(this.file.getShadowPages(), pages);
				var lastSecret = this.file.getDescriptorSecret(lastDesc);
				checksum = (checksum != null) ? checksum : this.ui.getHashValueForPages(pages);
				
				// Data is stored in cache and message is sent to all listeners
				var data = this.objectToString(this.createMessage(
					{patch: diff, checksum: checksum}));
				this.file.stats.bytesSent += data.length;
				this.file.stats.msgSent++;
				
				var acceptResponse = true;
							
				var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
				{
					acceptResponse = false;
					error({code: App.ERROR_TIMEOUT, message: mxResources.get('timeout')});
				}), this.ui.timeout);

				mxUtils.post(EditorUi.cacheUrl, this.getIdParameters() +
					'&from=' + encodeURIComponent(source) + '&to=' + encodeURIComponent(target) +
					(!Editor.p2pSyncNotify ? '&msg=' + encodeURIComponent(this.objectToString(msg)) : '') +
					((secret != null) ? '&secret=' + encodeURIComponent(secret) : '') +
					((lastSecret != null) ? '&last-secret=' + encodeURIComponent(lastSecret) : '') +
					((data.length < this.maxCacheEntrySize) ? '&data=' + encodeURIComponent(data) : '') +
					((token != null) ? '&token=' + encodeURIComponent(token) : ''),
					mxUtils.bind(this, function(req)
				{
					window.clearTimeout(timeoutThread);
					
					if (acceptResponse)
					{
						if (req.getStatus() >= 200 && req.getStatus() <= 299)
						{
							if (Editor.p2pSyncNotify)
							{
								this.notify(msg);
							}

							if (success != null)
							{
								success();
							}
						}
						else
						{
							error({message: mxResources.get('realtimeCollaboration') +
								((req.getStatus() != 0) ? ': ' + req.getStatus() : '')});
						}
					}
				}));
				
				EditorUi.debug('DrawioFileSync.fileSaved', [this],
					'from', source, 'to', target, 'etag',
					this.file.getCurrentEtag(), 'diff',
					diff, data.length, 'bytes',
					'checksum', checksum);
			}
			
			// Logs successull diff
//			try
//			{
//				var user = this.file.getCurrentUser();
//				var uid = (user != null) ? user.id : 'unknown';
//				
//				EditorUi.logEvent({category: 'DIFF-SYNC-FILE-' + this.file.getHash(),
//					action: uid + '-diff-' + data.length + '-sent-' +
//					this.file.stats.bytesSent + '-msgs-' +
//					this.file.stats.msgSent, label: this.clientId});
//			}
//			catch (e)
//			{
//				// ignore
//			}
		}
	}
	
	// Ignores cache response as clients
	// load file if cache entry failed
	this.file.setShadowPages(pages);
	this.scheduleCleanup();
};

/**
 * Creates the properties for the file descriptor.
 */
DrawioFileSync.prototype.getIdParameters = function()
{
	var result = 'id=' + this.channelId;
	
	if (this.pusher != null && this.pusher.connection != null &&
		this.pusher.connection.socket_id != null)
	{
		result += '&sid=' + this.pusher.connection.socket_id;
	}
	
	return result;
};

/**
 * Creates the properties for the file descriptor.
 */
DrawioFileSync.prototype.createMessage = function(data)
{
	return {v: DrawioFileSync.PROTOCOL, d: data, c: this.clientId};
};

/**
 * Creates the properties for the file descriptor.
 */
DrawioFileSync.prototype.fileConflict = function(desc, success, error)
{
	this.catchupRetryCount++;

	EditorUi.debug('DrawioFileSync.fileConflict', [this], 'desc', [desc],
		'catchupRetryCount', this.catchupRetryCount,
		'maxCatchupRetries', this.maxCatchupRetries);
	
	if (this.catchupRetryCount < this.maxCatchupRetries)
	{
		this.file.stats.conflicts++;
		
		if (desc != null)
		{
			this.catchup(desc, success, error);
		}
		else
		{
			this.fileChanged(success, error);
		}
	}
	else
	{
		this.file.stats.timeouts++;
		this.catchupRetryCount = 0;
		
		if (error != null)
		{
			error({code: App.ERROR_TIMEOUT, message: mxResources.get('timeout')});
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFileSync.prototype.stop = function()
{
	if (this.pusher != null)
	{
		EditorUi.debug('DrawioFileSync.stop', [this]);
	
		if (this.pusher.connection != null)
		{
			this.pusher.connection.unbind('state_change', this.connectionListener);
			this.pusher.connection.unbind('error', this.pusherErrorListener);
		}
	
		if (this.channel != null) 
		{
			this.channel.unbind('changed', this.changeListener);
			
			// See https://github.com/pusher/pusher-js/issues/75
			// this.pusher.unsubscribe(this.channelId);
			this.channel = null;
		}
		
		this.pusher.disconnect();
		this.pusher = null;

		if (this.p2pCollab != null)
		{
			this.p2pCollab.destroy();
			this.p2pCollab = null;
		}
	}
	else if (this.puller != null)
	{
		EditorUi.debug('DrawioFileSync.stop (Pulling)', [this]);
		this.puller.stop();
		this.puller = null;
	}
	
	this.updateOnlineState();
	this.updateStatus();
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
DrawioFileSync.prototype.destroy = function()
{
	if (this.channelId != null)
	{
		var user = this.file.getCurrentUser();
		var leave = {a: 'leave'};
		
		if (user != null)
		{
			leave.name = encodeURIComponent(user.displayName);
			leave.uid = user.id;
		}

		this.notify(this.createMessage(leave));
	}
	
	this.stop();

	if (this.onlineListener != null)
	{
		mxEvent.removeListener(window, 'offline', this.onlineListener);
		mxEvent.removeListener(window, 'online', this.onlineListener);
		this.onlineListener = null;
	}

	if (this.autosaveListener != null)
	{
		this.ui.editor.addListener('autosaveChanged', this.autosaveListener);
		this.autosaveListener = null;
	}

	if (this.visibleListener != null)
	{
		mxEvent.removeListener(document, 'visibilitychange', this.visibleListener);
		this.visibleListener = null;
	}
	
	if (this.activityListener != null)
	{
		mxEvent.removeListener(document, (mxClient.IS_POINTER) ? 'pointermove' : 'mousemove', this.activityListener);
		mxEvent.removeListener(document, 'keypress', this.activityListener);
		mxEvent.removeListener(window, 'focus', this.activityListener);
		
		if (!mxClient.IS_POINTER && mxClient.IS_TOUCH)
		{
			mxEvent.removeListener(document, 'touchstart', this.activityListener);
			mxEvent.removeListener(document, 'touchmove', this.activityListener);	
		}
		
		this.activityListener = null;
	}
	
	if (this.collaboratorsElement != null)
	{
		this.collaboratorsElement.parentNode.removeChild(this.collaboratorsElement);
		this.collaboratorsElement = null;
	}

	// This is not needed now as stop already destroyed it
	if (this.p2pCollab != null)
	{
		this.p2pCollab.destroy();
	}
};
