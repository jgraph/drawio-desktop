function P2PCollab(ui, sync, channelId)
{
	var graph = ui.editor.graph;
	var encrypted = true; // global flag to encrypt all messages
	var sessionCount = 0;
	var socket = null;
	var colors = [
		//White font
		'#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4', 
		'#f032e6', '#469990', '#9A6324', '#800000', '#808000',
		'#000075', '#a9a9a9',
		//Black font
		'#ffe119', '#42d4f4', '#bfef45', '#fabed4', '#dcbeff',
		'#fffac8', '#aaffc3', '#ffd8b1'
	];
	var connectedSessions = {}, messageId = 1, clientLastMsgId = {}, clientsToSessions = {}, 
		connectedClient = {}, sessionColors = {};
	var myClientId, newClients = {}, p2pClients = {}, useSocket = true, fileJoined = false, destroyed = false;
	var INACTIVE_TIMEOUT = 120000; //2 min
	var SELECTION_OPACITY = 70; //The default opacity of 30 is not visible enough with all colors
	var cursorDelay = 300;
	// TODO: Avoid negation, move to Editor.ENABLE_P2P and use p2p=1 URL parameter
	// add to Editor.configure
	var NO_P2P = urlParams['no-p2p'] != '0';
	var joinInProgress = false, joinId = 0;
	var lastError = null;
	
	var sendReply = mxUtils.bind(this, function(action, msg)
  	{
		if (destroyed) return;

		try
		{
			if (socket != null)
			{
				socket.send(JSON.stringify({action: action, msg: msg}));

				if (!NO_P2P)
				{
					EditorUi.debug('P2PCollab: sending to socket server', [action], [msg]);
				}
			}
			else
			{
				this.joinFile(true);
			}
		}
		catch (e)
		{
			lastError = e;
			sync.file.fireEvent(new mxEventObject('realtimeStateChanged'));
			EditorUi.debug('P2PCollab:', 'sendReply error', arguments, e);
		}
	});

	function createCursorImage(color)
	{
		return Graph.createSvgImage(8, 12, '<path d="M 4 0 L 8 12 L 4 10 L 0 12 Z" stroke="'+ color +'" fill="'+ color +'"/>').src;
	};

	function sendMessage(type, data)
	{
		try
		{
			if (destroyed) return;

			var user = sync.file.getCurrentUser();

			if (!fileJoined || user == null || user.displayName == null) return;
			
			//Converting to a string such that webRTC works also
			var msg = {from: myClientId, id: messageId,
				type: type, sessionId: sync.clientId, userId: user.id,
				username: user.displayName, data: data,
				protocol: DrawioFileSync.PROTOCOL,
				editor: EditorUi.VERSION};

			if (encrypted)
			{
				// data is needed for old server to not drop messages
				msg = {bytes: sync.objectToString(msg), data: 'aes'};
			}

			msg = JSON.stringify(msg);
			
			if (NO_P2P && type != 'cursor')
			{
				EditorUi.debug('P2PCollab: sending to socket server', [msg]);
			}

			messageId++;
			var p2pOnlyMsgs = !NO_P2P && (type == 'cursor' || type == 'selectionChange');

			if (useSocket && !p2pOnlyMsgs)
			{
				sendReply('message', msg);
			}
			
			//TODO Currently, we only send cursor & selection messages via P2P
			if (p2pOnlyMsgs)
			{
				for (p2pId in p2pClients)
				{
					p2pClients[p2pId].send(msg);
				}
			}
		}
		catch (e)
		{
			if (window.console != null)
			{
				console.error(e, type, data);
			}
		}
	};
	
	this.sendMessage = sendMessage;
	
	this.sendDiff = function(msg)
	{
		this.sendMessage('diff', (encrypted) ?
			{diff: msg} : {patch: encodeURIComponent(
				sync.objectToString(msg))});
	};

	this.sendNotification = function(msg)
	{
		this.sendMessage('notify', (encrypted) ?
			{msg: msg} : {data: encodeURIComponent(
				sync.objectToString(msg))});
	};

	this.getState = function()
	{
		return socket != null ? socket.readyState : 3 /* CLOSED */;
	};

	this.getLastError = function()
	{
		return lastError;
	};

	function debounce(func, wait) 
    {
        var timeout, lastInvocation = -1;

        return function() 
		{
            clearTimeout(timeout);
            var context = this, args = arguments;
			var later = function() 
			{
                timeout = null;
				lastInvocation = Date.now();
                func.apply(context, args);
            };

			if (Date.now() - lastInvocation > wait)
			{
				later();
			}
            else
			{
	            timeout = setTimeout(later, wait);
			}
        };
    };

	function sendCursor(me)
	{
		if (ui.shareCursorPosition && !graph.isMouseDown)
		{
			var offset = mxUtils.getOffset(graph.container);
			var tr = graph.view.translate;
			var s = graph.view.scale;

			var pageId = (ui.currentPage != null) ?
				ui.currentPage.getId() : null;
			sendMessage('cursor', {pageId: pageId,
				x: Math.round((me.getX() - offset.x +
					graph.container.scrollLeft) / s - tr.x),
				y: Math.round((me.getY() - offset.y +
					graph.container.scrollTop) / s - tr.y)});
		}
	};

	this.mouseListeners = {
		startX: 0,
		startY: 0,
		scrollLeft: 0,
		scrollTop: 0,
		mouseDown: function(sender, me) {},
		mouseMove: debounce(function(sender, me)
		{
			sendCursor(me);
		}, cursorDelay), // 5 frame/sec approx TODO with 100 milli (10 fps), the cursor is smoother
		mouseUp: function(sender, me)
		{
			sendCursor(me);
		}
	};

	graph.addMouseListener(this.mouseListeners);

	this.shareCursorPositionListener = function()
	{
		if (!ui.isShareCursorPosition())
		{
			sendMessage('cursor', {hide: true});
		}
	};

	ui.addListener('shareCursorPositionChanged', this.shareCursorPositionListener);

	// Clears remote selection state for large selections
	var selectionLimit = mxGraphHandler.prototype.maxCells;
	var updateThread = null;
	var lastSelection = {};
	
	this.selectionChangeListener = function(sender, evt)
	{
		var mapToIds = function(c)
		{
			return (c != null) ? c.id : null;
		};
		
		if (updateThread != null)
		{
			window.clearTimeout(updateThread);
		}

		updateThread = window.setTimeout(function()
		{
			var selection = (graph.getSelectionCount() > selectionLimit) ?
				[] : graph.getSelectionCells().map(mapToIds)
			var pageId = (ui.currentPage != null) ?
				ui.currentPage.getId() : null;

			// Computes diff between last and current selection
			var newSelection = {};
			var removed = [];
			var added = [];

			for (var i = 0; i < selection.length; i++)
			{
				var id = selection[i];

				if (id != null)
				{
					newSelection[id] = true;

					if (lastSelection[id] == null)
					{
						added.push(id);
					}
				}
			}

			for (var id in lastSelection)
			{
				if (!newSelection[id])
				{
					removed.push(id);
				}
			}
			
			lastSelection = newSelection;
			sendMessage('selectionChange', {pageId: pageId,
				removed: removed, added: added});
		}, 300);
	};

	graph.getSelectionModel().addListener(mxEvent.CHANGE, this.selectionChangeListener);

	function updateCursor(entry, transition)
	{
		var pageId = (ui.currentPage != null) ?
			ui.currentPage.getId() : null;
		
		if (entry != null && entry.cursor != null &&
			entry.lastCursor != null)
		{
			if (entry.lastCursor.hide != null ||
				!ui.isShowRemoteCursors() ||
				(entry.lastCursor.pageId != null &&
				entry.lastCursor.pageId != pageId))
			{
				entry.cursor.style.display = 'none';
			}
			else
			{
				var tr = graph.view.translate;
				var s = graph.view.scale;	
				var x = ((tr.x + entry.lastCursor.x) * s) + 8;
				var y = ((tr.y + entry.lastCursor.y) * s) - 12;
				var img = entry.cursor.getElementsByTagName('img')[0];

				function setPosition()
				{
					var cx = Math.max(graph.container.scrollLeft, Math.min(graph.container.scrollLeft +
						graph.container.clientWidth - entry.cursor.clientWidth, x));
					var cy = Math.max(graph.container.scrollTop - 22, Math.min(graph.container.scrollTop +
						graph.container.clientHeight - entry.cursor.clientHeight, y));
					img.style.opacity = (cx != x || cy != y) ? 0 : 1;
					entry.cursor.style.left = cx + 'px';
					entry.cursor.style.top = cy + 'px';
					entry.cursor.style.display = '';
				};

				if (transition)
				{
					mxUtils.setPrefixedStyle(entry.cursor.style, 'transition', 'all ' + (3 * cursorDelay) + 'ms ease-out');
					mxUtils.setPrefixedStyle(img.style, 'transition', 'all ' + (3 * cursorDelay) + 'ms ease-out');
					window.setTimeout(setPosition, 0);
				}
				else
				{
					mxUtils.setPrefixedStyle(entry.cursor.style, 'transition', null);
					mxUtils.setPrefixedStyle(img.style, 'transition', null);
					setPosition();
				}
			}
		}
	};

	this.cursorHandler = mxUtils.bind(this, function()
	{
		for (var key in connectedSessions)
		{
			updateCursor(connectedSessions[key]);
		}
	});

	mxEvent.addListener(graph.container, 'scroll', this.cursorHandler);
	graph.getView().addListener(mxEvent.SCALE, this.cursorHandler);
	graph.getView().addListener(mxEvent.TRANSLATE, this.cursorHandler);
	graph.getView().addListener(mxEvent.SCALE_AND_TRANSLATE, this.cursorHandler);
	ui.addListener('showRemoteCursorsChanged', this.cursorHandler);
	ui.editor.addListener('pageSelected', this.cursorHandler);

	function processMsg(msg, fromCId)
	{
		try
		{
			if (destroyed) return;

			msg = JSON.parse(msg);

			if (msg.bytes != null)
			{
				msg = sync.stringToObject(msg.bytes);
			}
			
			if (NO_P2P && msg.type != 'cursor')
			{
				EditorUi.debug('P2PCollab: msg received', [msg]);
			}

			//Exclude P2P messages from duplicate messages test since p2p can arrive before socket and interrupt delivery
			if (fromCId != null)
			{
				//Safeguard from duplicate messages or receiving my own messages
				if (msg.from == myClientId || clientLastMsgId[msg.from] >= msg.id)
				{
					EditorUi.debug('P2PCollab: Dropped Message', msg, myClientId, clientLastMsgId[msg.from])
					return;
				}
				
				clientLastMsgId[msg.from] = msg.id;
			}
			
			var username = msg.username? msg.username : 'Anonymous';
			var sessionId = msg.sessionId;
			var cursor, selection;

			function createCursor()
			{
				if (connectedSessions[sessionId] == null)
				{
					var clrIndex = sessionColors[sessionId];

					if (clrIndex == null)
					{
						clrIndex = sessionCount % colors.length;
						sessionColors[sessionId] = clrIndex;
						sessionCount++;
					}

					var clr = colors[clrIndex];
					var lblClr = clrIndex > 11? 'black' : 'white';

					connectedSessions[sessionId] = {
						cursor: document.createElement('div'),
						color: clr,
						selection: {}
					};
					
					clientsToSessions[fromCId] = sessionId;
					cursor = connectedSessions[sessionId].cursor;
					
					cursor.style.pointerEvents = 'none';
					cursor.style.position = 'absolute';
					cursor.style.display = 'none';
					cursor.style.opacity = '0.9';
					var img = document.createElement('img');
					mxUtils.setPrefixedStyle(img.style, 'transform', 'rotate(-45deg)translateX(-14px)');
					img.setAttribute('src', createCursorImage(clr));
					img.style.width = '10px';
					cursor.appendChild(img);
					
					var name = document.createElement('div');
					name.style.backgroundColor = clr;
					name.style.color = lblClr;
					name.style.fontSize = '9pt';
					name.style.padding = '3px 7px';
					name.style.marginTop = '8px';
					name.style.borderRadius = '10px';
					name.style.maxWidth = '100px';
					name.style.overflow = 'hidden';
					name.style.textOverflow = 'ellipsis';
					name.style.whiteSpace = 'nowrap';
					
					mxUtils.write(name, username);
					cursor.appendChild(name);

					ui.diagramContainer.appendChild(cursor);
					selection = connectedSessions[sessionId].selection;
				}
				else
				{
					cursor = connectedSessions[sessionId].cursor;
					selection = connectedSessions[sessionId].selection;
				}
			};

			if (connectedSessions[sessionId] != null)
			{
				clearTimeout(connectedSessions[sessionId].inactiveTO);
				connectedSessions[sessionId].inactiveTO = setTimeout(function()
				{
					clientLeft(null, sessionId);
				}, INACTIVE_TIMEOUT);
			}

			var msgData = msg.data;
			
			switch (msg.type)
			{
				case 'cursor':
					createCursor();
					connectedSessions[sessionId].lastCursor = msgData;
					updateCursor(connectedSessions[sessionId], true);
				break;
				case 'diff':
					try
					{
						if (msgData.patch != null)
						{
							msg = sync.stringToObject(decodeURIComponent(msgData.patch));
						}
						else
						{
							msg = msgData.diff;
						}

						sync.receiveRemoteChanges(msg.d);
					}
					catch (e)
					{
						EditorUi.debug('P2PCollab: Diff msg error', e);
					}
				break;
				case 'selectionChange':
					if (urlParams['remote-selection'] != '0')
					{
						var pageId = (ui.currentPage != null) ?
							ui.currentPage.getId() : null;
						
						if (pageId == null ||
							(msgData.pageId != null &&
							msgData.pageId == pageId))
						{
							createCursor();

							for (var i = 0; i < msgData.removed.length; i++)
							{
								var id = msgData.removed[i];

								if (id != null)
								{
									var handler = selection[id];
									delete selection[id];
									
									if (handler != null)
									{
										handler.destroy();
									}
								}
							}
							
							for (var i = 0; i < msgData.added.length; i++)
							{
								var id = msgData.added[i];

								if (id != null)
								{
									var cell = graph.model.getCell(id);

									if (cell != null)
									{	
										selection[id] = graph.highlightCell(cell,
											connectedSessions[sessionId].color, 60000,
											SELECTION_OPACITY, 3);
									}
								}
							}
						}
					}
				break;
				case 'notify':
					if (msgData.data != null)
					{
						msg = sync.stringToObject(decodeURIComponent(msgData.data));
					}
					else
					{
						msg = msgData.msg;
					}

					sync.handleMessageData(msg.d);
				break;
			}

			sync.file.fireEvent(new mxEventObject('realtimeMessage', 'message', msg));
		}
		catch (e)
		{
			if (window.console != null)
			{
				console.warn(e, msg, fromCId);
			}
		}
	};
	
	function createPeer(id, initiator)
	{
		if (NO_P2P || !SimplePeer.WEBRTC_SUPPORT)
		{
			return;	
		}
		
		// TODO: Move URL to Editor.STUN_SERVER_URL, add to Editor.configure
		var p = new SimplePeer({
	        initiator: initiator,
			config: { iceServers: [{ urls: 'stun:54.89.235.160:3478' }] }
	    });

		p.on('signal', function(data)
		{
			sendReply('sendSignal', {to: id, from: myClientId, signal: data});
        });

		p.on('error', function(err) 
		{
			delete newClients[id];
			EditorUi.debug('P2PCollab: p2p socket error', err);

			if (!destroyed && initiator && p.destroyed && connectedClient[id]) //If a client left, don't try to reconnect
			{
				EditorUi.debug('P2PCollab: p2p socket reconnecting', id);
				//Reconnect
				createPeer(id, true);
			}
		});
		
		p.on('connect', function()
		{
			delete newClients[id];

			if (p2pClients[id] == null || p2pClients[id].destroyed)
			{
				p2pClients[id] = p;
				connectedClient[id] = true;
				EditorUi.debug('P2PCollab: p2p socket connected', id);

				// if (mxUtils.isEmptyObject(newClients))
				// {
					//TODO Enable this when all messages can be routed via P2P
					//useSocket = false;
					//sendReply('movedToP2P', '');
				// }
			}
			else
			{
				p.noP2PMapDel = true;
				p.destroy();
				EditorUi.debug('P2PCollab: p2p socket duplicate', id);
			}
	    });
		
		p.on('close', function()
		{
			if (!p.noP2PMapDel)
			{
				EditorUi.debug('P2PCollab: p2p socket closed', id);
				//Remove cursor and selection
				removeConnectedUserUi(clientsToSessions[id]);
				delete p2pClients[id];
			}
		});
		
		p.on('data', processMsg);

		newClients[id] = p;
		
		return p;
	};
	
	function clientsList(data) 
	{
		myClientId = data.cId;
		fileJoined = true;

		for (var i = 0; i < data.list.length; i++)
		{
			createPeer(data.list[i], true);
		}
	};
	
	function signal(data) 
	{
		if (NO_P2P) return;

		var p;
		
		if (newClients[data.from])
		{
			p = newClients[data.from];	
		}
		else
		{
			p = createPeer(data.from, false);
			useSocket = true;
		}
		
		p.signal(data.signal);
	};
	
	function sendSignalFailed(data)
	{
		EditorUi.debug('P2PCollab: signal failed (socket not found on server)', data);
		delete newClients[data.to];
		connectedClient[data.to] = false; //TODO Should we call clientLeft?
	};

	function newClient(clientId) 
	{
		useSocket = true;
	};
	
	function clientLeft(clientId, sessionId)
	{
		removeConnectedUserUi(sessionId || clientsToSessions[clientId]);

		if (clientId != null)
		{
			delete clientsToSessions[clientId];
			connectedClient[clientId] = false;
		}
	};

	this.joinFile = function(check)
	{
		if (destroyed) return;

		try
		{
			if (joinInProgress)
			{
				EditorUi.debug('P2PCollab: joinInProgress on', joinInProgress);
				lastError = 'busy';
			}
			
			joinInProgress = ++joinId;
			
			try
			{
				if (socket != null && socket.readyState == 1)
				{
					EditorUi.debug('P2PCollab: force closing socket on', socket.joinId)
					socket.close(1000);
					socket = null;
				}
			}
			catch(e) 
			{
				EditorUi.debug('P2PCollab: closing socket error', e);
			} //Ignore
			
			var ws = new WebSocket(window.RT_WEBSOCKET_URL + '?id=' + channelId);

			if (socket == null)
			{
				socket = ws;
			}
			
			ws.addEventListener('open', function(event)
			{
				socket = ws;
				socket.joinId = joinInProgress;
				joinInProgress = false;
				sync.file.fireEvent(new mxEventObject('realtimeStateChanged'));
				EditorUi.debug('P2PCollab: open socket', socket.joinId);

				// Send join message
				if (!Editor.enableRealtimeCache)
				{
					window.setTimeout(function()
					{
						sync.sendJoinMessage();
					}, 0);
				}

				if (check)
				{
					sync.scheduleCleanup();
				}
			});

			function messageListener(event)
			{
				try
				{
					if (!NO_P2P)
					{
						EditorUi.debug('P2PCollab: msg received', [event]);
					}

					var data = JSON.parse(event.data);
					
					if (NO_P2P && data.action != 'message')
					{
						EditorUi.debug('P2PCollab: msg received', [event]);
					}

					switch (data.action)
					{
						case 'message':
							processMsg(data.msg, data.from);
						break;
						case 'clientsList':
							clientsList(data.msg);
						break;
						case 'signal':
							signal(data.msg);
						break;
						case 'newClient':
							newClient(data.msg);
						break;
						case 'clientLeft':
							clientLeft(data.msg);
						break;
						case 'sendSignalFailed':
							sendSignalFailed(data.msg);
						break;
					}
				}
				catch (e)
				{
					if (window.console != null)
					{
						console.warn(e, event);
					}
				}
			};
		
			ws.addEventListener('message', messageListener);

			var rejoinCalled = false;
				
			ws.addEventListener('close', mxUtils.bind(this, function(event)
			{
				EditorUi.debug('P2PCollab: WebSocket closed', ws.joinId, 'reconnecting', event.code, event.reason);
				EditorUi.debug('P2PCollab: closing socket on', ws.joinId);

				if (!destroyed && event.code != 1000 && joinId == ws.joinId) //Sometimes, a delayed even sometimes is received after another socket is established
				{
					if (joinInProgress == joinId)
					{
						EditorUi.debug('P2PCollab: joinInProgress in close on', ws.joinId);
						joinInProgress = false;	
					}
					
					if (!rejoinCalled)
					{
						EditorUi.debug('P2PCollab: calling rejoin on', ws.joinId);
						rejoinCalled = true;
						this.joinFile(true);
					}
				}

				sync.file.fireEvent(new mxEventObject('realtimeStateChanged'));
			}));

			ws.addEventListener('error', mxUtils.bind(this, function(event)
			{
				EditorUi.debug('P2PCollab: WebSocket error, reconnecting', event);
				EditorUi.debug('P2PCollab: error socket on', ws.joinId);

				if (!destroyed && joinId == ws.joinId) //Sometimes, a delayed even sometimes is received after another socket is established
				{
					if (joinInProgress == joinId)
					{
						EditorUi.debug('P2PCollab: joinInProgress in error on', ws.joinId);
						joinInProgress = false;	
					}
					
					if (!rejoinCalled)
					{
						EditorUi.debug('P2PCollab: calling rejoin on', ws.joinId);
						rejoinCalled = true;
						this.joinFile(true);
					}
				}

				sync.file.fireEvent(new mxEventObject('realtimeStateChanged'));
			}));

			sync.file.fireEvent(new mxEventObject('realtimeStateChanged'));
		}
		catch (e)
		{
			lastError = e;
			sync.file.fireEvent(new mxEventObject('realtimeStateChanged'));
		}
	};

	function removeConnectedUserUi(sessionId)
	{
		var user = connectedSessions[sessionId];

		if (user != null)
		{
			var selection = user.selection;

			for (var id in selection)
			{
				if (selection[id] != null)
				{
					selection[id].destroy();
				}
			}

			if (user.cursor != null && user.cursor.parentNode != null)
			{
				user.cursor.parentNode.removeChild(user.cursor);
			}

			clearTimeout(user.inactiveTO);
			delete connectedSessions[sessionId];
		}
	};

	this.destroy = function()
	{
		if (destroyed) return;

		EditorUi.debug('P2PCollab: destroyed');
		destroyed = true;
		//Remove selection and cursor
		for (sessionId in connectedSessions)
		{
			removeConnectedUserUi(sessionId);
		}

		//Remove event listeners
		if (this.mouseListeners != null)
		{
			graph.removeMouseListener(this.mouseListeners);
		}

		if (this.selectionChangeListener != null)
		{
			graph.getSelectionModel().removeListener(this.selectionChangeListener);
		}

		if (this.shareCursorPositionListener != null)
		{
			ui.removeListener(this.shareCursorPositionListener);
		}

		if (this.cursorHandler != null)
		{
			mxEvent.removeListener(graph.container, 'scroll', this.cursorHandler);
			graph.getView().removeListener(mxEvent.SCALE, this.cursorHandler);
			graph.getView().removeListener(mxEvent.TRANSLATE, this.cursorHandler);
			graph.getView().removeListener(mxEvent.SCALE_AND_TRANSLATE, this.cursorHandler);
			ui.editor.removeListener('pageSelected', this.cursorHandler);
			ui.removeListener(this.cursorHandler);
		}

		// Close the socket
		if (socket != null && socket.readyState >= 1)
		{
			socket.close(1000);
			socket = null;
		}

		//Close P2P sockets
		for (var id in p2pClients)
		{
			if (p2pClients[id] != null)
			{
				p2pClients[id].destroy();
			}
		}

		sync.file.fireEvent(new mxEventObject('realtimeStateChanged'));
	};
};
